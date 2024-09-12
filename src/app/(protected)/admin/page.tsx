import SectionLayout from '@/components/SectionLayout/SectionLayout';
import StatDushboard from '@/components/admin/StatDushboard/StatDushboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: `Админка | ${process.env.SITE_NAME}`,
	robots: { index: false, follow: false }
};

export default function AdminPage() {
	return (
		<SectionLayout noPadding title='Статистика сайта'>
			<StatDushboard />
		</SectionLayout>
	);
}
