export type TypeProductData = {
	name: string;
	price: number;
	description: string;
	images: string;
	categoryId: number;
	brandId: number;
	availability: boolean;
	oldPrice: number;
	options: string;
	rating?: number;
};

export type TypeProductEditData = {
	name: string;
	description: string;
	price: number | string;
	oldPrice: number | string;
	availability: boolean;
	categoryId: number | string;
	brandId: number | string;
	options: { char: string; value: string }[];
};

export type TypeProductDataFilters = {
	sort?: string;
	searchTerm?: string;
	page?: string;
	perPage: string;
	ratings?: string;
	minPrice?: string;
	maxPrice?: string;
	categoryId?: string;
	brandId?: string;
};

export type TypeParamsFilters = {
	searchParams: TypeProductDataFilters;
};
