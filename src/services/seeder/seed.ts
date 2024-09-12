import { formatDateTime } from '@/utils/format-date';
import { generateSlug } from '@/utils/generate-slug';
import { faker } from '@faker-js/faker';
import { PrismaClient, Product } from '@prisma/client';
import { hash } from 'argon2';
import { v4 as uuidv4 } from 'uuid';
import { admin } from './adminData';
import { IMockProd, products } from './productsData';
import { IMockUser, users } from './usersData';

export const prisma = new PrismaClient();

const prodData: IMockProd[] = products;
const userData: IMockUser[] = users;

// Функция для поиска или создания категории
const findOrCreateCategory = async (categoryName: string) => {
	const searchCategoryName = categoryName.toLowerCase();

	const existingCategory = await prisma.category.findUnique({
		where: {
			name: categoryName
		}
	});

	if (existingCategory) {
		return existingCategory;
	}

	const historyArray = [
		{ id: 1, email: 'admin@test.com', time: formatDateTime() }
	];

	const newCategory = await prisma.category.create({
		data: {
			name: categoryName,
			nameS: searchCategoryName,
			slug: generateSlug(categoryName),
			history: JSON.stringify(historyArray)
		}
	});

	let updateCategory;

	if (newCategory.id <= 20) {
		let priorityNum;
		if (newCategory.id <= 12) {
			priorityNum = newCategory.id;
		} else {
			priorityNum = 0;
		}

		updateCategory = await prisma.category.update({
			where: {
				id: newCategory.id
			},
			data: {
				cover: `/seed/categories/${newCategory.id}.webp`,
				priority: priorityNum
			}
		});
	} else {
		updateCategory = await prisma.category.update({
			where: {
				id: newCategory.id
			},
			data: {
				cover: `/seed/categories/${faker.number.int({
					min: 1,
					max: 20
				})}.webp`
			}
		});
	}

	return newCategory;
};

// Функция для поиска или создания бренда
const findOrCreateBrand = async (brandName: string) => {
	const searchBrandName = brandName.toLowerCase();

	const existingBrand = await prisma.brand.findUnique({
		where: {
			name: brandName
		}
	});

	if (existingBrand) {
		return existingBrand;
	}

	const historyArray = [
		{ id: 1, email: 'admin@test.com', time: formatDateTime() }
	];

	return prisma.brand.create({
		data: {
			name: brandName,
			nameS: searchBrandName,
			slug: generateSlug(brandName),
			history: JSON.stringify(historyArray)
		}
	});
};

// Функция генерации товаров для магазина в БД
export const createProducts = async (start: number, quantity: number) => {
	const products: Product[] = [];

	for (let i = start - 1; i < start + quantity - 1; i++) {
		const productName = prodData[i].name;
		const searchProductName = productName.toLowerCase();
		const categoryName = prodData[i].category;
		const brandName = prodData[i].brand;
		const description = prodData[i].description;
		const searchDescription = description.toLowerCase();

		const category = await findOrCreateCategory(categoryName);
		const brand = await findOrCreateBrand(brandName);

		const optionsArray = prodData[i].options;

		const productPrice = +faker.number.int({ min: 750, max: 15000 });
		const productPriceOld = +faker.number.int({
			max: productPrice + (productPrice * 20) / 100,
			min: productPrice + (productPrice * 5) / 100
		});

		let reviewsArray = [];
		if (prodData[i].reviews.length > 0) {
			for (let j = 0; j < prodData[i].reviews.length; j++) {
				const review = {
					rating: faker.number.int({ min: 1, max: 5 }),
					text: prodData[i].reviews[j],
					user: {
						connect: {
							id: faker.number.int({ min: 2, max: 6 })
						}
					}
				};
				reviewsArray.push(review);
			}
		}

		const reviewsRating =
			reviewsArray.reduce(
				(accumulator, review) => accumulator + +review.rating,
				0
			) / reviewsArray.length;

		const historyArray = [
			{ id: 1, email: 'admin@test.com', time: formatDateTime() }
		];

		const product = await prisma.product.create({
			data: {
				name: productName,
				nameS: searchProductName,
				slug: generateSlug(productName),
				description: description,
				descriptionS: searchDescription,
				price: productPrice,
				oldPrice:
					+faker.number.int({ min: 0, max: 2 }) === 0
						? productPriceOld
						: productPrice,
				options: JSON.stringify(optionsArray),
				rating: Math.round(+reviewsRating * 10) / 10,
				images: JSON.stringify(
					Array.from({
						length: faker.number.int({ min: 2, max: 6 })
					}).map(
						() =>
							`/seed/${faker.number.int({
								min: 1,
								max: 60
							})}.webp`
					)
				),
				category: {
					connect: {
						id: category.id
					}
				},
				brand: {
					connect: {
						id: brand.id
					}
				},
				reviews: {
					create: reviewsArray
				},
				history: JSON.stringify(historyArray)
			}
		});

		products.push(product);
	}

	console.log(`Created ${products.length} products`);
};

//Функция добавления пользователей
export const addUsers = async () => {
	for (let i = 0; i < userData.length; i++) {
		const activationLink = uuidv4();

		const user = await prisma.user.create({
			data: {
				email: userData[i].email,
				firstName: userData[i].firstName,
				lastName: userData[i].lastName,
				phone: userData[i].phone,
				deliveryAdress: userData[i].adress,
				password: await hash(userData[i].password),
				activateLink: activationLink,
				policy: true
			}
		});

		if (user) {
			console.log(`Пользователь №${i + 1} создан успешно!`);
		} else {
			console.log('Что-то пошло не так!');
		}
	}
};

export const addAdminUser = async () => {
	const users = await prisma.user.findMany({
		select: {
			id: true
		}
	});

	if (users.length === 0 || !users) {
		const activationLink = uuidv4();

		const user = await prisma.user.create({
			data: {
				email: admin.email,
				firstName: admin.firstName,
				lastName: admin.lastName,
				phone: admin.phone,
				deliveryAdress: admin.adress,
				password: await hash(admin.password),
				activateLink: activationLink,
				isAdmin: true,
				policy: true
			}
		});

		if (user) {
			console.log(`Администратор создан успешно!`);
			return true;
		} else {
			console.log('Что-то пошло не так!');
			return false;
		}
	} else {
		console.log('Ошибка создания. В системе уже есть пользователи!');
		return false;
	}
};
