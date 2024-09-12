import prisma from '@/libs/prismadb';
import { IHistory } from '@/types/history.interface';
import {
	AllProductData,
	PaginationData,
	ProductData
} from '@/types/product.interface';
import { TypeProductData } from '@/types/product.types';
import { convertToNumber } from '@/utils/convert-to-number';
import { formatDateTime } from '@/utils/format-date';
import { generateSlug } from '@/utils/generate-slug';
import { notFoundProduct } from '@/utils/not-found-objects';
import { Prisma } from '@prisma/client';
import { getBrandById } from './brand.services';
import { getCategoryById } from './category.services';

//Получение продукта по ID
export async function getbyProductId(id: number) {
	const product = await prisma.product.findUnique({
		where: {
			id
		},
		select: {
			images: true,
			description: true,
			id: true,
			name: true,
			price: true,
			createAt: true,
			availability: true,
			oldPrice: true,
			options: true,
			slug: true,
			rating: true,
			history: true,
			category: {
				select: {
					id: true,
					name: true,
					slug: true,
					cover: true,
					priority: true,
					history: true
				}
			},
			brand: {
				select: {
					id: true,
					name: true,
					slug: true,
					history: true
				}
			},
			reviews: {
				select: {
					user: {
						select: {
							id: true,
							email: true,
							firstName: true,
							lastName: true,
							password: false,
							phone: true,
							deliveryAdress: true
						}
					},
					createAt: true,
					text: true,
					rating: true,
					id: true
				},
				orderBy: {
					createAt: 'desc'
				}
			}
		}
	});

	if (!product) return notFoundProduct;

	return product;
}

//Получение продукта по слагу
export async function getbyProductSlug(slug: string) {
	const product = await prisma.product.findUnique({
		where: {
			slug
		},
		select: {
			images: true,
			description: true,
			id: true,
			name: true,
			price: true,
			createAt: true,
			availability: true,
			oldPrice: true,
			options: true,
			slug: true,
			rating: true,
			history: true,
			category: {
				select: {
					id: true,
					name: true,
					slug: true,
					cover: true,
					priority: true,
					history: true
				}
			},
			brand: {
				select: {
					id: true,
					name: true,
					slug: true,
					history: true
				}
			},
			reviews: {
				select: {
					user: {
						select: {
							id: true,
							email: true,
							firstName: true,
							lastName: true,
							password: false,
							phone: true,
							deliveryAdress: true,
							isAdmin: true
						}
					},
					createAt: true,
					text: true,
					rating: true,
					id: true
				},
				orderBy: {
					createAt: 'desc'
				}
			}
		}
	});

	if (!product) return notFoundProduct;

	return product;
}

//Получение продукта по Категории
export async function getbyProductCategory(categorySlug: string) {
	const products = await prisma.product.findMany({
		where: {
			category: {
				slug: categorySlug
			}
		},
		select: {
			images: true,
			description: true,
			id: true,
			name: true,
			price: true,
			createAt: true,
			availability: true,
			oldPrice: true,
			options: true,
			slug: true,
			rating: true,
			history: true,
			category: {
				select: {
					id: true,
					name: true,
					slug: true,
					cover: true,
					priority: true,
					history: true
				}
			},
			brand: {
				select: {
					id: true,
					name: true,
					slug: true,
					history: true
				}
			},
			reviews: {
				select: {
					user: {
						select: {
							id: true,
							email: true,
							firstName: true,
							lastName: true,
							password: false,
							phone: true,
							deliveryAdress: true,
							isAdmin: true
						}
					},
					createAt: true,
					text: true,
					rating: true,
					id: true
				},
				orderBy: {
					createAt: 'desc'
				}
			}
		}
	});

	if (!products) return [notFoundProduct];

	return products;
}

//Получение продукта по Бренду
export async function getbyProductBrand(brandSlug: string) {
	const products = await prisma.product.findMany({
		where: {
			brand: {
				slug: brandSlug
			}
		},
		select: {
			images: true,
			description: true,
			id: true,
			name: true,
			price: true,
			createAt: true,
			availability: true,
			oldPrice: true,
			options: true,
			slug: true,
			rating: true,
			history: true,
			category: {
				select: {
					id: true,
					name: true,
					slug: true,
					cover: true,
					priority: true,
					history: true
				}
			},
			brand: {
				select: {
					id: true,
					name: true,
					slug: true,
					history: true
				}
			},
			reviews: {
				select: {
					user: {
						select: {
							id: true,
							email: true,
							firstName: true,
							lastName: true,
							password: false,
							phone: true,
							deliveryAdress: true,
							isAdmin: true
						}
					},
					createAt: true,
					text: true,
					rating: true,
					id: true
				},
				orderBy: {
					createAt: 'desc'
				}
			}
		}
	});

	if (!products) return [notFoundProduct];

	return products;
}

//Получение похожих продуктов
export async function getSimilarProducts(id: number) {
	const currentProduct = await getbyProductId(id);

	if (!currentProduct) return [notFoundProduct];

	const products = await prisma.product.findMany({
		where: {
			category: {
				name: currentProduct?.category?.name
			},
			NOT: {
				id: currentProduct.id
			}
		},
		orderBy: {
			createAt: 'desc'
		},
		take: 4,
		select: {
			images: true,
			description: true,
			id: true,
			name: true,
			price: true,
			createAt: true,
			availability: true,
			oldPrice: true,
			options: true,
			slug: true,
			rating: true,
			history: true,
			category: {
				select: {
					id: true,
					name: true,
					slug: true,
					cover: true,
					priority: true,
					history: true
				}
			},
			brand: {
				select: {
					id: true,
					name: true,
					slug: true,
					history: true
				}
			},
			reviews: {
				select: {
					user: {
						select: {
							id: true,
							email: true,
							firstName: true,
							lastName: true,
							password: false,
							phone: true,
							deliveryAdress: true,
							isAdmin: true
						}
					},
					createAt: true,
					text: true,
					rating: true,
					id: true
				},
				orderBy: {
					createAt: 'desc'
				}
			}
		}
	});

	return products;
}

//Создание продукта
export async function createProduct(
	data: TypeProductData,
	userId: number,
	userEmail: string
) {
	try {
		const historyArray = [
			{ id: userId, email: userEmail, time: formatDateTime() }
		];

		const product = await prisma.product.create({
			data: {
				name: data.name,
				nameS: data.name.toLowerCase(),
				slug: generateSlug(data.name),
				description: data.description,
				descriptionS: data.description.toLowerCase(),
				price: data.price,
				oldPrice: data.oldPrice,
				options: data.options,
				images: data.images,
				availability: data.availability,
				history: JSON.stringify(historyArray),
				category: {
					connect: {
						id: data.categoryId
					}
				},
				brand: {
					connect: {
						id: data.brandId
					}
				}
			}
		});

		return product;
	} catch (error: any) {
		if (
			(error.code === 'P2002' && error.meta.target.includes('name')) ||
			(error.code === 'P2002' && error.meta.target.includes('slug'))
		) {
			return notFoundProduct;
		} else {
			console.log('Create product service error:', error);
		}
	}
}

//Обновление продукта
export async function updateProduct(
	id: number,
	data: ProductData,
	userId: number,
	userEmail: string
) {
	try {
		const {
			description,
			images,
			price,
			name,
			categoryId,
			brandId,
			options,
			availability,
			oldPrice
		} = data;

		const category = await getCategoryById(categoryId);
		if (!category) throw new Error('Category not found!');

		const brand = await getBrandById(brandId);
		if (!brand) throw new Error('Brand not found!');

		const currentProduct = await getbyProductId(id);

		if (currentProduct && currentProduct.id === 2123456789)
			throw new Error('Product not found!');

		let historyArray: IHistory[] = [];

		if (currentProduct.history)
			historyArray = JSON.parse(currentProduct.history);

		const newHistory = {
			id: userId,
			email: userEmail,
			time: formatDateTime()
		};

		historyArray.push(newHistory);

		const updatedProduct = await prisma.product.update({
			where: {
				id
			},
			data: {
				description,
				images,
				price,
				name,
				slug: generateSlug(name),
				category: {
					connect: {
						id: categoryId
					}
				},
				brand: {
					connect: {
						id: brandId
					}
				},
				options,
				availability,
				oldPrice,
				nameS: name.toLowerCase(),
				descriptionS: description.toLowerCase(),
				history: JSON.stringify(historyArray)
			}
		});

		return updatedProduct;
	} catch (error: any) {
		if (
			(error.code === 'P2002' && error.meta.target.includes('name')) ||
			(error.code === 'P2002' && error.meta.target.includes('slug'))
		) {
			return notFoundProduct;
		} else {
			console.log('Update product service error:', error);
		}
	}
}

//Обновление фото продукта
export async function updateProductFoto(
	id: number,
	data: string,
	userId: number,
	userEmail: string
) {
	const currentProduct = await getbyProductId(id);

	if (currentProduct && currentProduct.id === 2123456789)
		throw new Error('Product not found!');

	let historyArray: IHistory[] = [];

	if (currentProduct.history)
		historyArray = JSON.parse(currentProduct.history);

	const newHistory = {
		id: userId,
		email: userEmail,
		time: formatDateTime()
	};

	historyArray.push(newHistory);

	return prisma.product.update({
		where: {
			id
		},
		data: {
			images: data,
			history: JSON.stringify(historyArray)
		}
	});
}

//Обновление рейтинга продукта
export async function updateProductRating(id: number, rating: number) {
	return prisma.product.update({
		where: {
			id
		},
		data: {
			rating
		}
	});
}

//Удаление продукта
export async function deleteProduct(id: number) {
	return prisma.product.delete({
		where: {
			id
		}
	});
}

//Получение всех продуктов по критериям
export async function getAllProduct(data: AllProductData = {}) {
	const { perPage, skip } = getPagination(data);

	const filters = createFilter(data);

	const products = await prisma.product.findMany({
		where: filters,
		orderBy: getSortOption(data.sort),
		skip,
		take: perPage,
		select: {
			images: true,
			description: true,
			id: true,
			name: true,
			price: true,
			createAt: true,
			availability: true,
			oldPrice: true,
			options: true,
			slug: true,
			rating: true,
			history: true,
			category: {
				select: {
					id: true,
					name: true,
					slug: true,
					cover: true,
					priority: true,
					history: true
				}
			},
			brand: {
				select: {
					id: true,
					name: true,
					slug: true,
					history: true
				}
			},
			reviews: {
				select: {
					user: {
						select: {
							id: true,
							email: true,
							firstName: true,
							lastName: true,
							password: false,
							phone: true,
							deliveryAdress: true,
							isAdmin: true
						}
					},
					createAt: true,
					text: true,
					rating: true,
					id: true
				},
				orderBy: {
					createAt: 'desc'
				}
			}
		}
	});

	return {
		products,
		length: await prisma.product.count({
			where: filters
		})
	};
}

function getPagination(data: PaginationData, defaultPerPage = 12) {
	const page = data.page ? +data.page : 1;
	const perPage = data.perPage ? +data.perPage : defaultPerPage;

	const skip = (page - 1) * perPage;

	return { perPage, skip };
}

function createFilter(data: AllProductData): Prisma.ProductWhereInput {
	const filters: Prisma.ProductWhereInput[] = [];

	if (data.searchTerm) filters.push(getSearchTermFilter(data.searchTerm));

	if (data.minPrice || data.maxPrice) {
		if (data.minPrice && data.maxPrice) {
			filters.push(
				getPriceFilter(
					convertToNumber(data.minPrice),
					convertToNumber(data.maxPrice)
				)
			);
		} else if (data.minPrice) {
			filters.push(
				getPriceFilter(convertToNumber(data.minPrice), undefined)
			);
		} else if (data.maxPrice) {
			filters.push(
				getPriceFilter(undefined, convertToNumber(data.maxPrice))
			);
		}
	}
	if (data.categoryId) filters.push(getCategoryFilter(+data.categoryId));

	if (data.brandId) filters.push(getBrandFilter(+data.brandId));

	return filters.length ? { AND: filters } : {};
}

function getSortOption(
	sort: string | undefined
): Prisma.ProductOrderByWithRelationInput[] {
	switch (sort) {
		case 'low-price':
			return [{ price: 'asc' }];
		case 'high-price':
			return [{ price: 'desc' }];
		case 'low-rating':
			return [{ rating: 'asc' }];
		case 'high-rating':
			return [{ rating: 'desc' }];
		case 'oldest':
			return [{ createAt: 'asc' }];
		default:
			return [{ createAt: 'desc' }];
	}
}

function getSearchTermFilter(searchTerm: string): Prisma.ProductWhereInput {
	const lowerSearchTerm = searchTerm.toLowerCase();
	return {
		OR: [
			{
				category: {
					nameS: {
						contains: lowerSearchTerm
					}
				}
			},
			{
				brand: {
					nameS: {
						contains: lowerSearchTerm
					}
				}
			},
			{
				nameS: {
					contains: lowerSearchTerm
				}
			},
			{
				descriptionS: {
					contains: lowerSearchTerm
				}
			}
		]
	};
}

function getPriceFilter(
	minPrice?: number,
	maxPrice?: number
): Prisma.ProductWhereInput {
	let priceFilter: Prisma.IntFilter | undefined = {};

	if (minPrice) {
		priceFilter = {
			...priceFilter,
			gte: minPrice
		};
	}

	if (maxPrice) {
		priceFilter = {
			...priceFilter,
			lte: maxPrice
		};
	}

	return {
		price: priceFilter
	};
}

function getCategoryFilter(categoryId: number): Prisma.ProductWhereInput {
	return {
		categoryId
	};
}

function getBrandFilter(brandId: number): Prisma.ProductWhereInput {
	return {
		brandId
	};
}
