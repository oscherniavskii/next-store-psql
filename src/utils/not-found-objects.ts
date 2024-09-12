import { IBrand } from '@/types/brand.interface';
import { ICategory } from '@/types/category.interface';
import { IProduct } from '@/types/product.interface';

export const notFoundProduct: IProduct = {
	images: '["/not-found/not-found.webp"]',
	description:
		'Данный товар отсутствует в магазине. Возможно он был удален. Перейдите в каталог для поиска другого товара.',
	id: 2123456789,
	name: 'Товар отсутствует',
	price: 0,
	createAt: '2024-01-01T09:43:26.269Z',
	availability: false,
	oldPrice: 0,
	options: '[]',
	slug: '',
	rating: 0,
	history: '[{"id":1,"email":"admin@test.com","time":"21.02.2024 12:41"}]',
	category: {
		id: 2123456789,
		name: 'Без категории',
		slug: '',
		cover: '/not-found/not-found.webp',
		priority: 0,
		history: '[{"id":1,"email":"admin@test.com","time":"21.02.2024 12:41"}]'
	},
	brand: {
		id: 2123456789,
		name: 'Отсутствует',
		slug: '',
		history: '[{"id":1,"email":"admin@test.com","time":"21.02.2024 12:41"}]'
	},
	reviews: []
};

export const notFoundCategory: ICategory = {
	id: 2123456789,
	name: 'Удалено!',
	slug: '',
	cover: '/not-found/not-found.webp',
	priority: 0,
	history: '[{"id":1,"email":"admin@test.com","time":"21.02.2024 12:41"}]'
};

export const notFoundBrand: IBrand = {
	id: 2123456789,
	name: 'Удалено!',
	slug: '',
	history: '[{"id":1,"email":"admin@test.com","time":"21.02.2024 12:41"}]'
};
