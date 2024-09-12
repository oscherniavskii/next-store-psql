import prisma from '@/libs/prismadb';
import { EditableUserFormData } from '@/types/user.interface';
import { hash } from 'argon2';

//Получение профиля
export async function byId(id: number) {
	const user = await prisma.user.findUnique({
		where: {
			id
		},
		select: {
			id: true,
			email: true,
			firstName: true,
			lastName: true,
			password: true,
			phone: true,
			deliveryAdress: true,
			isAdmin: true,
			isActivate: true,
			activateLink: true,

			favorites: {
				select: {
					id: true,
					name: true,
					price: true,
					images: true,
					slug: true,
					category: {
						select: {
							name: true,
							slug: true
						}
					},
					brand: {
						select: {
							name: true,
							slug: true
						}
					},
					reviews: true,
					options: true,
					availability: true,
					rating: true
				}
			}
		}
	});

	if (!user) throw new Error('User not found!');

	return user;
}

//Обновление профиля
export async function updateProfile(id: number, data: EditableUserFormData) {
	const user = await byId(id);

	if (!user) throw new Error('User not exist!');

	return prisma.user.update({
		where: {
			id
		},
		data: {
			firstName: data.firstName,
			lastName: data.lastName,
			phone: data.phone,
			deliveryAdress: data.deliveryAdress
		}
	});
}

//Смена пароля
export async function updatePassword(id: number, newPassword: string) {
	return prisma.user.update({
		where: {
			id
		},
		data: {
			password: await hash(newPassword)
		}
	});
}

//Работа с избранным
export async function toggleFavorites(productId: number, userId: number) {
	const user = await byId(userId);

	if (!user) throw new Error('User not found!');

	const isExists = user.favorites.some(product => product.id == productId);

	await prisma.user.update({
		where: {
			id: user.id
		},
		data: {
			favorites: {
				[isExists ? 'disconnect' : 'connect']: {
					id: +productId
				}
			}
		}
	});

	return { message: 'Success' };
}

//Получение списка пользователей
export async function getAllUsers(currentId: number) {
	const users = await prisma.user.findMany({
		where: {
			NOT: {
				OR: [
					{
						id: 1
					},
					{
						id: currentId
					}
				]
			}
		},
		select: {
			id: true,
			email: true,
			firstName: true,
			lastName: true,
			password: true,
			phone: true,
			deliveryAdress: true,
			isAdmin: true,
			isActivate: true,
			activateLink: true,

			favorites: {
				select: {
					id: true,
					name: true,
					price: true,
					images: true,
					slug: true,
					category: {
						select: {
							name: true,
							slug: true
						}
					},
					brand: {
						select: {
							name: true,
							slug: true
						}
					},
					reviews: true,
					options: true,
					availability: true,
					rating: true
				}
			},
			orders: {
				select: {
					total: true
				}
			}
		},
		orderBy: {
			lastName: 'asc'
		}
	});

	if (!users) throw new Error('User not found!');

	return users;
}

//Удаление пользователя
export async function deleteProfile(id: number) {
	return prisma.user.delete({
		where: {
			id
		}
	});
}

//Обновление прав администратора
export async function switchAdminRole(id: number) {
	const user = await byId(id);

	if (!user) throw new Error('User not exist!');

	return prisma.user.update({
		where: {
			id
		},
		data: {
			isAdmin: !user.isAdmin
		}
	});
}
