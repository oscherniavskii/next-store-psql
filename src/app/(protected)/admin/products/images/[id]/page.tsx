import NotFound from '@/components/NotFound/NotFound';
import SectionLayout from '@/components/SectionLayout/SectionLayout';
import ProductImageUpload from '@/components/admin/ProductImageUpload/ProductImageUpload';
import { getAllProduct, getbyProductId } from '@/services/product.services';
import { IPageIdParam } from '@/types/page-params';
import { Metadata } from 'next';

export async function generateStaticParams(): Promise<IPageIdParam[] | any> {
	const { products } = await getAllProduct({
		perPage: '1000'
	});

	if (products) {
		return products.map(product => {
			return {
				params: { id: product.id }
			};
		});
	}
}

export async function generateMetadata({
	params
}: IPageIdParam): Promise<Metadata> {
	const product = await getbyProductId(Number(params?.id));

	return {
		title: `Редактирование изображений товара ${product?.name} | ${process.env.SITE_NAME}`,
		robots: { index: false, follow: false }
	};
}

export default async function EditProductFotoPage({ params }: IPageIdParam) {
	const product = await getbyProductId(Number(params?.id));

	if (product?.id === 2123456789) return <NotFound variant='product' />;

	return (
		<main>
			<SectionLayout noPadding title='Редактирование фото товара'>
				<ProductImageUpload productId={Number(params?.id)} />
			</SectionLayout>
		</main>
	);
}
