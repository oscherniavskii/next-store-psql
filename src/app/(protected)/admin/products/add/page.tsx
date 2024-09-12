import SectionLayout from '@/components/SectionLayout/SectionLayout';
import ProductEditor from '@/components/admin/ProductEditor/ProductEditor';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: `Создание нового товара | ${process.env.SITE_NAME}`,
	robots: { index: false, follow: false }
};

export default function AddProductsPage() {
	return (
		<SectionLayout noPadding title='Создание товара'>
			<ProductEditor type='new' />
		</SectionLayout>
	);
}
