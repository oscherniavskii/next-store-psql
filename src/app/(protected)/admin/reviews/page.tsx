import SectionLayout from '@/components/SectionLayout/SectionLayout';
import ReviewsList from '@/components/admin/ReviewsList/ReviewsList';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: `Отзывы | ${process.env.SITE_NAME}`,
	robots: { index: false, follow: false }
};

export default function ReviewsAdminPage() {
	return (
		<SectionLayout noPadding title='Отзывы на сайте'>
			<ReviewsList />
		</SectionLayout>
	);
}
