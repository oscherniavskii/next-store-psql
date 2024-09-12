import CategoriesCatalog from '@/components/CategoriesCatalog/CategoriesCatalog';
import SectionLayout from '@/components/SectionLayout/SectionLayout';
import { getAllCategories } from '@/services/category.services';
import { Metadata } from 'next';

//Data revalidate every 60 sec
export const revalidate = 60;

async function getCategories() {
	const categories = await getAllCategories();

	return categories;
}

export const metadata: Metadata = {
	title: `Категории товаров | ${process.env.SITE_NAME}`
};

export default async function CategoryPage() {
	const data = await getCategories();

	return (
		<main>
			<SectionLayout title={`Категории товаров`} noPadding>
				<CategoriesCatalog categories={data} />
			</SectionLayout>
		</main>
	);
}
