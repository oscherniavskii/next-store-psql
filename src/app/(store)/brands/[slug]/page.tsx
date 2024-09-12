import Catalog from '@/components/Catalog/Catalog';
import NotFound from '@/components/NotFound/NotFound';
import SectionLayout from '@/components/SectionLayout/SectionLayout';
import { getAllBrands, getBrandBySlug } from '@/services/brand.services';
import { getbyProductBrand } from '@/services/product.services';
import { IPageSlugParam, TypeParamSlug } from '@/types/page-params';
import { Metadata } from 'next';

//Data revalidate every 60 sec
export const revalidate = 60;

export async function generateStaticParams(): Promise<IPageSlugParam[] | any> {
	const brands = await getAllBrands();

	if (brands) {
		return brands.map(brand => {
			return {
				params: { slug: brand.slug }
			};
		});
	}
}

async function getProducts(params: TypeParamSlug) {
	const products = await getbyProductBrand(params?.slug as string);

	const brand = await getBrandBySlug(params?.slug as string);

	return { products, brand };
}

export async function generateMetadata({
	params
}: IPageSlugParam): Promise<Metadata> {
	const { brand, products } = await getProducts(params);
	return {
		metadataBase: new URL(`${process.env.CLIENT_URL}`),
		title: `Бренд: ${brand?.name} | ${process.env.SITE_NAME}`,
		description: `Описание для бренда ${brand?.name}`,
		openGraph: {
			images:
				products && products.length > 0
					? JSON.parse(products[0]?.images)
					: [],
			description: `Описание для бренда ${brand?.name}`
		}
	};
}

export default async function BrandPage({ params }: IPageSlugParam) {
	const data = await getProducts(params);

	//Обработка отсутствующих брендов
	if (data.brand.id === 2123456789) return <NotFound variant='brand' />;

	return (
		<main>
			<SectionLayout
				title={`Товары бренда ${data.brand?.name}`}
				noPadding
			>
				<Catalog products={data.products || []} />
			</SectionLayout>
		</main>
	);
}
