import { instance } from '@/api/api.interceptor';
import { IFullUser, IUser } from '@/types/user.interface';

const USERS = '/users';

type TypeData = {
	email: string;
	password?: string;
	name?: string;
	avatarPath?: string;
	phone?: string;
};

export async function getProfile() {
	try {
		const res = await instance<IFullUser>({
			url: `${USERS}/profile`,
			method: 'GET'
		});

		return res.data;
	} catch (error) {
		console.error('Get profile:', error);
	}
}

export async function updateProfile(data: TypeData) {
	try {
		const res = await instance<IUser>({
			url: `${USERS}/profile`,
			method: 'PUT',
			data
		});

		return res.data;
	} catch (error) {
		console.error('Update profile:', error);
	}
}

export async function deleteProfile(id: number) {
	try {
		const res = await instance<IUser>({
			url: `${USERS}/profile`,
			method: 'DELETE',
			data: id
		});

		return res.data;
	} catch (error) {
		console.error('Delete profile:', error);
	}
}

export async function toggleFavorite(productId: string | number) {
	try {
		const res = await instance<string>({
			url: `${USERS}/profile/favorites/${productId}`,
			method: 'PATCH'
		});

		return res.data;
	} catch (error) {
		console.error('Toggle favorites:', error);
	}
}

//Получение списка пользователей
export async function getAllUsers() {
	try {
		const res = await instance<IFullUser[]>({
			url: `${USERS}`,
			method: 'GET'
		});

		return res.data;
	} catch (error) {
		console.error('Get all users:', error);
	}
}

//Обновление прав администратора
export async function switchAdminRole(id: number) {
	try {
		const res = await instance<{ status: string }>({
			url: `${USERS}/profile`,
			method: 'PATCH',
			data: id
		});

		return res.data;
	} catch (error) {
		console.error('Switch admin user role:', error);
	}
}
