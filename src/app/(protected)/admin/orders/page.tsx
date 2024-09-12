import SectionLayout from '@/components/SectionLayout/SectionLayout';
import OrdersList from '@/components/admin/OrdersList/OrdersList';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: `Заказы | ${process.env.SITE_NAME}`,
	robots: { index: false, follow: false }
};

export default function OrdersAdminPage() {
	return (
		<SectionLayout noPadding title='Заказы на сайте'>
			<OrdersList />
		</SectionLayout>
	);
}
