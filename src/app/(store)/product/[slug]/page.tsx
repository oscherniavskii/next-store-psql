import NotFound from '@/components/NotFound/NotFound';
import ProductInfo from '@/components/ProductInfo/ProductInfo';
import SectionLayout from '@/components/SectionLayout/SectionLayout';
import {
	getAllProduct,
	getSimilarProducts,
	getbyProductSlug
} from '@/services/product.services';
import { IPageSlugParam, TypeParamSlug } from '@/types/page-params';
import type { Metadata } from 'next';

//Data revalidate every 60 sec
export const revalidate = 60;

export async function generateStaticParams() {
	const { products } = await getAllProduct();

	const paths = products.map(product => {
		return {
			params: { slug: product.slug }
		};
	});

	return paths;
}

async function getProduct(params: TypeParamSlug) {
	const product = await getbyProductSlug(params?.slug as string);

	const similarProducts = await getSimilarProducts(product.id);

	return { product, similarProducts };
}

export async function generateMetadata({
	params
}: IPageSlugParam): Promise<Metadata> {
	const { product } = await getProduct(params);
	return {
		metadataBase: new URL(`${process.env.CLIENT_URL}`),
		title: `${product.name} | ${process.env.SITE_NAME}`,
		description: product.description,
		category: product?.category?.name,
		openGraph: {
			images: JSON.parse(product.images) || [],
			description: product.description
		}
	};
}

export default async function ProductPage({ params }: IPageSlugParam) {
	const { product, similarProducts } = await getProduct(params);

	//Обработка отсутствующих продуктов
	if (product.id === 2123456789) return <NotFound variant='product' />;

	return (
		<main>
			<SectionLayout noPadding={true}>
				<ProductInfo
					initialProduct={product}
					similarProducts={similarProducts}
					slug={params.slug}
				/>
			</SectionLayout>
		</main>
	);
}
