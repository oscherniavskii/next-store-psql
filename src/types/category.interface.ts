export interface ICategory {
	id: number;
	name: string;
	slug: string;
	cover?: string | null;
	priority: number;
	history: string;
}

export interface ICategoryWithProduct extends ICategory {
	products: IProductCount[];
}

interface IProductCount {
	name: string;
}

export interface CategoryData {
	name: string;
	cover: string;
	priority: number;
}
