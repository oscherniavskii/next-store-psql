import SectionLayout from '@/components/SectionLayout/SectionLayout';
import Thanks from '@/components/Thanks/Thanks';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: `Оплата успешна | ${process.env.SITE_NAME}`,
	robots: { index: false, follow: false }
};

export default function ThanksPage() {
	return (
		<SectionLayout noPadding>
			<Thanks />
		</SectionLayout>
	);
}
