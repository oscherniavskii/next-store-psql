'use client';

import { IProduct } from '@/types/product.interface';
import { priceConvert } from '@/utils/price-format';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import AddToCartButton from './AddToCardButton/AddToCartButton';
import FavoriteButton from './FavoriteButton/FavoriteButton';
import ProductRating from './ProductRating/ProductRating';
import './productCard.scss';

interface IProductCard {
	product: IProduct;
}

const ProductCard: FC<IProductCard> = ({ product }) => {
	const cover = JSON.parse(product.images)[0];
	const sale = product.price < product.oldPrice;
	return (
		<article className='product-card'>
			<div className='product-card__cover'>
				<div className='product-card__actions'>
					<FavoriteButton productId={product.id} />
					{product.availability && (
						<AddToCartButton product={product} />
					)}
				</div>

				<Link
					href={`/product/${product.slug}`}
					className='product-card__image'
				>
					<Image
						width={200}
						height={200}
						src={`${process.env.FOTO_URL}${cover}`}
						alt={product.name}
						priority
					/>
				</Link>
			</div>
			<div className='product-card__info'>
				<h3 className='product-card__title' title={product.name}>
					<Link href={`/product/${product.slug}`}>
						{product.name}
					</Link>
				</h3>
				<Link
					href={`/categories/${product?.category?.slug}`}
					className='product-card__category'
				>
					{product?.category?.name}
				</Link>
				<ProductRating product={product} isText />
				<div className='product-card__stock'>
					<div
						className={`product-card__price card-price ${
							sale ? 'card-price--sale' : ''
						}`}
					>
						{sale && (
							<div className='card-price__old'>
								{priceConvert(product.oldPrice)}
							</div>
						)}
						<div className='card-price__current' title='Цена'>
							{priceConvert(product.price)}
						</div>
					</div>
					<div
						className='product-card__availability availability'
						title='Наличие'
					>
						{product.availability ? (
							<span className='availability__in'>В наличии</span>
						) : (
							<span className='availability__no'>
								Отсутствует
							</span>
						)}
					</div>
				</div>
			</div>
		</article>
	);
};

export default ProductCard;
