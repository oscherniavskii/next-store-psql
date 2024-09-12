import { IOrder } from '@/types/order.interface';
import { formatDateTime } from '@/utils/format-date';
import { priceConvert } from '@/utils/price-format';
import Link from 'next/link';
import { FC, useState } from 'react';
import './orderItem.scss';

interface IOrderItem {
	item: IOrder;
	variant?: 'default' | 'admin';
}

const OrderItem: FC<IOrderItem> = ({ item, variant = 'default' }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div
			className={`order-item ${
				variant === 'admin' ? 'order-item--admin' : ''
			}`}
		>
			<button
				className='order-item__title'
				onClick={() => setIsOpen(!isOpen)}
			>
				<span>{formatDateTime(item.createAt)}</span>
				{variant === 'admin' && (
					<>
						<span>
							{item.user
								? `${item.user.firstName} ${item.user.lastName}`
								: `${item.name} (DELETED)`}
						</span>
						<span>{item.user ? item.user.email : item.email}</span>
					</>
				)}
				<span>{priceConvert(item.total)}</span>
				<span
					style={
						item.status === 'PAYED'
							? { color: 'var(--green-text)' }
							: {}
					}
				>
					{item.status === 'PENDING' && 'ОБРАБОТКА'}
					{item.status === 'PAYED' && 'ОПЛАЧЕНО'}
				</span>
				<span
					className={`order-item__icon ${
						isOpen && 'order-item__icon--open'
					}`}
				>
					<svg width='32' height='32' viewBox='0 0 32 32' fill='none'>
						<circle cx='16' cy='16' r='16' fill='white' />
						<path
							d='M10 16H22'
							stroke='#FF8D1C'
							strokeWidth='2'
							strokeLinecap='round'
						/>
						<path
							d='M16 10L16 22'
							stroke='#FF8D1C'
							strokeWidth='2'
							strokeLinecap='round'
						/>
					</svg>
				</span>
			</button>
			<div
				className={`order-item__body ${
					isOpen && 'order-item__body--open'
				}`}
			>
				<ul className='order-item__list'>
					{item.items.map((item, i) => (
						<li className='order-item__item' key={item.id}>
							<div className='order-item__head'>
								<span className='order-item__count'>{`${
									i + 1
								}.`}</span>
								{item.product ? (
									<Link
										className='order-item__name'
										href={`/product/${item.product.slug}`}
									>
										{item.product.name}
									</Link>
								) : (
									<span className='order-item__name'>
										{item.name}
										{' (DELETED)'}
									</span>
								)}
							</div>
							<div className='order-item__inner'>
								<div className='order-item__price'>
									{priceConvert(item.price)}
								</div>
								<div className='order-item__quant'>
									{'x '}
									{item.quantity}
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default OrderItem;
