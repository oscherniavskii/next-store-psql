import Checkout from '@/components/Checkout/Checkout';
import SectionLayout from '@/components/SectionLayout/SectionLayout';
import { getAllProduct } from '@/services/product.services';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: `Оформление заказа | ${process.env.SITE_NAME}`,
	robots: { index: false, follow: false }
};

//Data revalidate every 60 sec
export const revalidate = 60;

//Fetch products
async function getProducts() {
	const data = await getAllProduct({
		page: '1',
		perPage: '8',
		ratings: ''
	});

	return data;
}

export default async function CheckoutPage() {
	const data = await getProducts();

	return (
		<SectionLayout title='Оформление заказа' noPadding>
			<Checkout products={data.products} />
		</SectionLayout>
	);
}
