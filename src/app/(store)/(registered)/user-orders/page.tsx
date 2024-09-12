import SectionLayout from '@/components/SectionLayout/SectionLayout';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import UserOrders from '@/components/UserOrders/UserOrders';

export default function UserOrdersPage() {
	return (
		<SectionLayout noPadding>
			<SectionTitle>История покупок</SectionTitle>
			<UserOrders />
		</SectionLayout>
	);
}
