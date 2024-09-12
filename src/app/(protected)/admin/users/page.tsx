import SectionLayout from '@/components/SectionLayout/SectionLayout';
import UsersList from '@/components/admin/UsersList/UsersList';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: `Пользователи | ${process.env.SITE_NAME}`,
	robots: { index: false, follow: false }
};

export default function BrandsAdminPage() {
	return (
		<SectionLayout noPadding title='Список пользователей'>
			<UsersList />
		</SectionLayout>
	);
}
