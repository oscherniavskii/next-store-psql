import SectionLayout from '@/components/SectionLayout/SectionLayout';
import BrandsList from '@/components/admin/BrandsList/BrandsList';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: `Бренды | ${process.env.SITE_NAME}`,
	robots: { index: false, follow: false }
};

export default function BrandsAdminPage() {
	return (
		<SectionLayout noPadding title='Список брендов'>
			<BrandsList />
		</SectionLayout>
	);
}
