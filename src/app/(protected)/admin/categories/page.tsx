import SectionLayout from '@/components/SectionLayout/SectionLayout';
import CategoriesList from '@/components/admin/CategoriesList/CategoriesList';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: `Категории | ${process.env.SITE_NAME}`,
	robots: { index: false, follow: false }
};

export default function CategoriesAdminPage() {
	return (
		<SectionLayout noPadding title='Список категорий'>
			<CategoriesList />
		</SectionLayout>
	);
}
