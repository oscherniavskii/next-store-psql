export interface IBrand {
	id: number;
	name: string;
	slug: string;
	history: string;
}

export interface IBrandWithProducts extends IBrand {
	products: IProductCount[];
}

interface IProductCount {
	name: string;
}

export interface BrandData {
	name: string;
}
