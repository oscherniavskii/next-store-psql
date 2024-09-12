'use client';

import { useActions } from '@/hooks/useActions';
import { IProduct } from '@/types/product.interface';
import { priceConvert } from '@/utils/price-format';
import Image from 'next/image';
import Link from 'next/link';
import { type FC } from 'react';
import './checkoutItem.scss';

interface ICheckoutItem {
	product: IProduct;
	quantity: number;
	id: number;
}

const СheckoutItem: FC<ICheckoutItem> = ({ product, quantity, id }) => {
	const { removeFromCart } = useActions();
	const cover = JSON.parse(product.images)[0];

	return (
		<div className='checkout-item'>
			<Link
				className='checkout-item__cover'
				href={`/product/${product.slug}`}
			>
				<Image
					src={cover}
					width={70}
					height={70}
					alt={product.name}
					className='checkout-item__image'
				/>
			</Link>
			<div className='checkout-item__info'>
				<Link
					className='checkout-item__name'
					href={`/product/${product.slug}`}
				>
					{product.name}
				</Link>
				<Link
					className='checkout-item__category'
					href={`/categories/${product?.category?.slug}`}
				>
					{product?.category?.name}
				</Link>
			</div>
			<div className='checkout-item__price'>
				{priceConvert(product.price)}
			</div>
			<div className='checkout-item__quantity'>x {quantity}</div>
			<div className='checkout-item__total'>
				{priceConvert(+product.price * +quantity)}
			</div>
			<div className='checkout-item__btn'>
				<button
					className='checkout-item__icon'
					onClick={() => removeFromCart({ id })}
				>
					<svg width='40' height='40' viewBox='0 0 40 40'>
						<path
							d='M30 10L10 30'
							stroke='white'
							strokeWidth='4'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
						<path
							d='M10 10L30 30'
							stroke='white'
							strokeWidth='4'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default СheckoutItem;
