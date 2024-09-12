import { IBrand } from './brand.interface';
import { ICategory } from './category.interface';
import { IReview } from './review.interface';

export interface IProduct {
	id: number;
	name: string;
	slug: string;
	description: string;
	price: number;
	reviews: IReview[];
	images: string;
	createAt: Date | string;
	category: ICategory | null;
	brand: IBrand | null;
	availability: boolean;
	oldPrice: number;
	options: string | null;
	rating: number;
	history: string;
}

export interface IProductDetails {
	product: IProduct;
}

export type TypeProducts = {
	products: IProduct[];
};

export type TypePaginationProducts = {
	length: number;
	products: IProduct[];
};

export interface ProductData {
	name: string;
	price: number;
	description: string;
	images: string;
	categoryId: number;
	brandId: number;
	availability: boolean;
	oldPrice: number;
	options?: string;
}

export interface PaginationData {
	page?: string;
	perPage?: string;
}

export interface AllProductData extends PaginationData {
	sort?: string;
	searchTerm?: string;
	ratings?: string;
	minPrice?: string;
	maxPrice?: string;
	categoryId?: string;
	brandId?: string;
}

export interface ProductReviewData {
	name: string;
	slug: string;
	id: number;
}
