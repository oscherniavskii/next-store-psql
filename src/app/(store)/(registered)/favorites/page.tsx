import Favorites from '@/components/Favorites/Favorites';
import SectionLayout from '@/components/SectionLayout/SectionLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: `Избранное | ${process.env.SITE_NAME}`,
	robots: { index: false, follow: false }
};

export default function FavoritesPage() {
	return (
		<SectionLayout title='Избранные товары' noPadding>
			<Favorites />
		</SectionLayout>
	);
}
