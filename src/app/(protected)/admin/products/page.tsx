import SectionLayout from '@/components/SectionLayout/SectionLayout';
import ProductsList from '@/components/admin/ProductsList/ProductsList';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: `Товары | ${process.env.SITE_NAME}`,
	robots: { index: false, follow: false }
};

export default function ProductsAdminPage() {
	return (
		<SectionLayout noPadding title='Список товаров'>
			<ProductsList />
		</SectionLayout>
	);
}
