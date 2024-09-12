import PageDelivery from '@/components/PageDelivery/PageDelivery';
import SectionLayout from '@/components/SectionLayout/SectionLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: `Доставка и оплата | ${process.env.SITE_NAME}`
};

export default function DeliveryPage() {
	return (
		<main>
			<SectionLayout noPadding title='Доставка и оплата'>
				<PageDelivery />
			</SectionLayout>
		</main>
	);
}
