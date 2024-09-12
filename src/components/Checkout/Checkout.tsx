'use client';

// import { placeOrder } from '@/helpers/orderHelpers';
import { useActions } from '@/hooks/useActions';
import { useCart } from '@/hooks/useCart';
import { IProduct } from '@/types/product.interface';
// import { useMutation } from '@tanstack/react-query';
import { priceConvert } from '@/utils/price-format';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import Catalog from '../Catalog/Catalog';
import SectionTitle from '../SectionTitle/SectionTitle';
import Button from '../ui/Button/Button';
import CheckoutItem from './CheckoutItem/CheckoutItem';
import './checkout.scss';

const Checkout: FC<{ products: IProduct[] }> = ({ products = [] }) => {
	const { items, total } = useCart();
	const { reset } = useActions();
	const { push } = useRouter();
	const currency = process.env.CURRENCY;

	const recommendProducts = products
		.filter(
			product => !items.map(item => item.product.id).includes(product.id)
		)
		.filter(product => product.availability)
		.slice(0, 4);

	// const { mutate } = useMutation({
	// 	mutationKey: ['create order and payment'],
	// 	mutationFn: () =>
	// 		placeOrder({
	// 			items: items.map(item => ({
	// 				price: item.price,
	// 				quantity: item.quantity,
	// 				productId: item.product.id,
	// 				name: item.product.name
	// 			}))
	// 		}),

	// 	onSuccess(data) {
	// 		reset();
	// 		if (data) push(data.confirmation.confirmation_url);
	// 	}
	// });

	return (
		<section className='checkout'>
			{items.length ? (
				<div className='checkout__inner'>
					<div className='checkout__content'>
						<div className='checkout__items'>
							{items.map(item => (
								<CheckoutItem
									key={item.product.name}
									product={item.product}
									quantity={item.quantity}
									id={item.id}
								/>
							))}
						</div>
						<div className='checkout__actions'>
							<div className='checkout__total'>
								<div className='checkout__sum'>
									Сумма заказа:
								</div>
								<div className='checkout__value'>
									{priceConvert(total)}
								</div>
							</div>
							{/* <Button onClick={() => mutate()}>
								Оформить заказ
							</Button> */}
							<Button
								onClick={() => {
									push('/thanks');
									reset();
								}}
							>
								Оформить заказ
							</Button>
						</div>
					</div>
					<div className='checkout__recommendation'>
						<SectionTitle>Рекомендованные товары</SectionTitle>
						<Catalog products={recommendProducts} />
					</div>
				</div>
			) : (
				<div className='checkout__empty'>
					В заказе отсутствуют товары!
				</div>
			)}
		</section>
	);
};

export default Checkout;
