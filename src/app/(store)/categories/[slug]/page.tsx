import Catalog from '@/components/Catalog/Catalog';
import NotFound from '@/components/NotFound/NotFound';
import SectionLayout from '@/components/SectionLayout/SectionLayout';
import {
	getAllCategories,
	getCategoryBySlug
} from '@/services/category.services';
import { getbyProductCategory } from '@/services/product.services';
import { IPageSlugParam, TypeParamSlug } from '@/types/page-params';
import { Metadata } from 'next';

//Data revalidate every 60 sec
export const revalidate = 60;

export async function generateStaticParams(): Promise<IPageSlugParam[] | any> {
	const categories = await getAllCategories();

	if (categories) {
		return categories.map(category => {
			return {
				params: { slug: category.slug }
			};
		});
	}
}

async function getProducts(params: TypeParamSlug) {
	const products = await getbyProductCategory(params?.slug as string);

	const category = await getCategoryBySlug(params?.slug as string);

	return { products, category };
}

export async function generateMetadata({
	params
}: IPageSlugParam): Promise<Metadata> {
	const { category, products } = await getProducts(params);
	return {
		metadataBase: new URL(`${process.env.CLIENT_URL}`),
		title: `Категория: ${category?.name} | ${process.env.SITE_NAME}`,
		description: `Описание для категории ${category?.name}`,
		openGraph: {
			images:
				products && products.length > 0
					? JSON.parse(products[0]?.images)
					: [],
			description: `Описание для категории ${category?.name}`
		}
	};
}

export default async function CategoryPage({ params }: IPageSlugParam) {
	const data = await getProducts(params);

	//Обработка отсутствующих категорий
	if (data.category.id === 2123456789) return <NotFound variant='category' />;

	return (
		<main>
			<SectionLayout
				title={`Товары категории ${data.category?.name}`}
				noPadding
			>
				<Catalog products={data.products || []} />
			</SectionLayout>
		</main>
	);
}
