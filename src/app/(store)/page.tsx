import SectionLayout from '@/components/SectionLayout/SectionLayout';
import MainAboutSection from '@/components/homePageSections/MainAboutSection/MainAboutSection';
import MainCategoriesSection from '@/components/homePageSections/MainCategoriesSection/MainCategoriesSection';
import MainFaqSection from '@/components/homePageSections/MainFaqSection/MainFaqSection';
import MainProductSection from '@/components/homePageSections/MainProductSection/MainProductSection';
import MainSection from '@/components/homePageSections/MainSection/MainSection';
import { getAllCategories } from '@/services/category.services';
import { getAllProduct } from '@/services/product.services';

//Data revalidate every 60 sec
export const revalidate = 60;

//Fetch products
async function getProducts() {
	'use server';
	const data = await getAllProduct({
		page: '1',
		perPage: `${process.env.PRODUCTS_COUNT_HOME}`,
		sort: 'newest'
	});

	return data;
}
//Fetch categories
async function getCategories() {
	'use server';
	const data = await getAllCategories();

	return data;
}

export default async function HomePage() {
	const dataProduct = await getProducts();
	const products = dataProduct.products;

	const allCategories = await getCategories();
	const categories = allCategories
		.filter(cat => cat.priority > 0)
		.sort((cat1, cat2) => (cat1.priority > cat2.priority ? 1 : -1));

	return (
		<main>
			<MainSection />
			<SectionLayout title='Популярные категории'>
				<MainCategoriesSection categories={categories} />
			</SectionLayout>
			<SectionLayout title='Свежие поступления'>
				<MainProductSection products={products} />
			</SectionLayout>
			<SectionLayout title={`Онлайн-магазин ${process.env.SITE_NAME}`}>
				<MainAboutSection />
			</SectionLayout>
			<SectionLayout title='Ответы на вопросы'>
				<MainFaqSection />
			</SectionLayout>
		</main>
	);
}
