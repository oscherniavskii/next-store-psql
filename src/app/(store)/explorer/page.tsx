import ProductsExplorer from '@/components/ProductsExplorer/ProductsExplorer';
import SectionLayout from '@/components/SectionLayout/SectionLayout';
import { getAllProduct } from '@/services/product.services';
import {
	TypeParamsFilters,
	TypeProductDataFilters
} from '@/types/product.types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: `Каталог товаров | ${process.env.SITE_NAME}`
};

//Data revalidate every 60 sec
export const revalidate = 60;

//Fetch products
async function getProducts(searchParams: TypeProductDataFilters) {
	const data = await getAllProduct(searchParams);
	return data;
}

export default async function ExplorerPage({
	searchParams
}: TypeParamsFilters) {
	const data = await getProducts(searchParams);

	return (
		<SectionLayout noPadding>
			<ProductsExplorer initialProducts={data} />
		</SectionLayout>
	);
}
