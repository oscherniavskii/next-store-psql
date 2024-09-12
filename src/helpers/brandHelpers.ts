import { axiosClassic, instance } from '@/api/api.interceptor';
import { IBrand, IBrandWithProducts } from '@/types/brand.interface';

const BRANDS = '/brands';

//Получение всех
export async function getAllBrands() {
	try {
		const res = await axiosClassic<IBrandWithProducts[]>({
			url: BRANDS,
			method: 'GET'
		});

		return res.data;
	} catch (error) {
		console.error('Get all brands:', error);
	}
}

//Получение по ID
export async function getBrandById(id: string | number) {
	try {
		const res = await instance<IBrand>({
			url: `${BRANDS}/${id}`,
			method: 'GET'
		});

		return res.data;
	} catch (error) {
		console.error('Get brand by ID:', error);
	}
}

//Получение по Слагу
export async function getBrandBySlug(slug: string) {
	try {
		const res = await axiosClassic<IBrand>({
			url: `${BRANDS}/by-slug/${slug}`,
			method: 'GET'
		});

		return res.data;
	} catch (error) {
		console.error('Get brand by slug:', error);
	}
}

//Создание
export async function createBrand(name: string) {
	try {
		const res = await instance<IBrand>({
			url: BRANDS,
			method: 'POST',
			data: name
		});

		return res.data;
	} catch (error) {
		console.error('Create brand:', error);
	}
}

//Обновление
export async function updateBrand(id: string | number, name: string) {
	try {
		const res = await instance<IBrand>({
			url: `${BRANDS}/${id}`,
			method: 'PUT',
			data: { name }
		});

		return res.data;
	} catch (error) {
		console.error('Update brand:', error);
	}
}

//Удаление
export async function deleteBrand(id: string | number) {
	try {
		const res = await instance<IBrand>({
			url: `${BRANDS}/${id}`,
			method: 'DELETE'
		});

		return res.data;
	} catch (error) {
		console.error('Delete brand:', error);
	}
}
