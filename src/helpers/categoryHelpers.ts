import { axiosClassic, instance } from '@/api/api.interceptor';
import {
	CategoryData,
	ICategory,
	ICategoryWithProduct
} from '@/types/category.interface';

const CATEGORIES = '/categories';

//Получение всех категорий
export async function getAllCategories() {
	try {
		const res = await axiosClassic<ICategoryWithProduct[]>({
			url: CATEGORIES,
			method: 'GET'
		});

		return res.data;
	} catch (error) {
		console.error('Get all categories:', error);
	}
}

//Получение категори по ID
export async function getCategoryById(id: string | number) {
	try {
		const res = await instance<ICategory>({
			url: `${CATEGORIES}/${id}`,
			method: 'GET'
		});

		return res.data;
	} catch (error) {
		console.error('Get category by ID:', error);
	}
}

//Получение категори по Слагу
export async function getCategoryBySlug(slug: string) {
	try {
		const res = await axiosClassic<ICategory>({
			url: `${CATEGORIES}/by-slug/${slug}`,
			method: 'GET'
		});

		return res.data;
	} catch (error) {
		console.error('Get category by slug:', error);
	}
}

//Создание категории
export async function createCategory(data: { name: string; cover: string }) {
	try {
		const res = await instance<ICategory>({
			url: CATEGORIES,
			method: 'POST',
			data
		});

		return res.data;
	} catch (error) {
		console.error('Create category:', error);
	}
}

//Обновление категории
export async function updateCategory(id: string | number, data: CategoryData) {
	try {
		const res = await instance<ICategory>({
			url: `${CATEGORIES}/${id}`,
			method: 'PUT',
			data
		});

		return res.data;
	} catch (error: any) {
		console.error('Update category:', error);
	}
}

//Обновление фото продукта
export async function updateCategoryFoto(id: string | number, data: string) {
	try {
		const res = await instance<ICategory>({
			url: `${CATEGORIES}/${id}`,
			method: 'PATCH',
			data: { image: data }
		});

		return res.data;
	} catch (error) {
		throw new Error('Update error!');
	}
}

//Обновление приоритета
export async function updatePriority(id: string | number, data: number) {
	try {
		const res = await instance<ICategory>({
			url: `${CATEGORIES}/${id}`,
			method: 'PATCH',
			data
		});

		return res.data;
	} catch (error) {
		console.error('Update category priority:', error);
	}
}

//Удаление категории
export async function deleteCategory(id: string | number) {
	try {
		const res = await instance<ICategory>({
			url: `${CATEGORIES}/${id}`,
			method: 'DELETE'
		});

		return res.data;
	} catch (error) {
		console.error('Delete category:', error);
	}
}
