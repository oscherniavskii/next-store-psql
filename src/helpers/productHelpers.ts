import { axiosClassic, instance } from '@/api/api.interceptor';
import { IProduct, TypePaginationProducts } from '@/types/product.interface';
import { TypeProductData, TypeProductDataFilters } from '@/types/product.types';

const PRODUCTS = '/products';

//Получение всех продуктов по параметрам
export async function getAllProducts(queryData = {} as TypeProductDataFilters) {
	try {
		const { data } = await axiosClassic<TypePaginationProducts>({
			url: PRODUCTS,
			method: 'GET',
			params: queryData
		});

		return data;
	} catch (error) {
		console.error('Get all products:', error);
	}
}

//Получение похожих продуктов
export async function getSimilarProducts(productId: string | number) {
	try {
		const res = await axiosClassic<IProduct[]>({
			url: `${PRODUCTS}/similar/${productId}`,
			method: 'GET'
		});

		return res.data;
	} catch (error) {
		console.error('Get similar products:', error);
	}
}

//Получение по категории
export async function getProductByCategory(categorySlug: string) {
	try {
		const res = await axiosClassic<IProduct[]>({
			url: `${PRODUCTS}/by-category/${categorySlug}`,
			method: 'GET'
		});

		return res.data;
	} catch (error) {
		console.error('Get products by category:', error);
	}
}

//Получение по бренду
export async function getProductByBrand(brandSlug: string) {
	try {
		const res = await axiosClassic<IProduct[]>({
			url: `${PRODUCTS}/by-brand/${brandSlug}`,
			method: 'GET'
		});

		return res.data;
	} catch (error) {
		console.error('Get products by brand:', error);
	}
}

//Получение по слагу
export async function getProductBySlug(slug: string) {
	try {
		const { data } = await axiosClassic<IProduct>({
			url: `${PRODUCTS}/by-slug/${slug}`,
			method: 'GET'
		});

		return data;
	} catch (error) {
		console.error('Get product by slug:', error);
	}
}

//Получение по ID
export async function getProductById(productId: string | number) {
	try {
		const res = await instance<IProduct>({
			url: `${PRODUCTS}/${productId}`,
			method: 'GET'
		});

		return res.data;
	} catch (error) {
		console.error('Get product by ID:', error);
	}
}

//Создание продукта (пустого)
export async function createProduct(data: TypeProductData) {
	try {
		const res = await instance<IProduct>({
			url: PRODUCTS,
			method: 'POST',
			data
		});

		return res.data;
	} catch (error) {
		console.error('Create product:', error);
	}
}

//Обновление продукта
export async function updateProduct(
	id: string | number,
	data: TypeProductData
) {
	try {
		const res = await instance<IProduct>({
			url: `${PRODUCTS}/${id}`,
			method: 'PUT',
			data
		});

		return res.data;
	} catch (error) {
		throw new Error('Update product error!');
	}
}

//Обновление фото продукта
export async function updateProductFoto(id: string | number, data: string) {
	try {
		const res = await instance<IProduct>({
			url: `${PRODUCTS}/${id}`,
			method: 'PATCH',
			data: { images: data }
		});

		return res.data;
	} catch (error) {
		throw new Error('Update product foto error!');
	}
}

//Удаление продукта
export async function deleteProduct(id: string | number) {
	try {
		const res = await instance<IProduct>({
			url: `${PRODUCTS}/${id}`,
			method: 'DELETE'
		});

		return res.data;
	} catch (error) {
		console.error('Delete product:', error);
	}
}
