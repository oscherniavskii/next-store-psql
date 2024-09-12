'use client';

import { getProductBySlug } from '@/helpers/productHelpers';
import { useActions } from '@/hooks/useActions';
import { useCart } from '@/hooks/useCart';
import { IProduct } from '@/types/product.interface';
import { priceConvert } from '@/utils/price-format';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState, type FC } from 'react';
import FavoriteButton from '../ProductCard/FavoriteButton/FavoriteButton';
import ProductRating from '../ProductCard/ProductRating/ProductRating';
import Button from '../ui/Button/Button';
import Quantity from '../ui/Quantity/Quantity';
import ProductCharacteristics from './ProductCharacteristics/ProductCharacteristics';
import ProductGallery from './ProductGallery/ProductGallery';
import ProductReviews from './ProductReviews/ProductReviews';
import SimilarProducts from './SimilarProducts/SimilarProducts';
import './productInfo.scss';

interface IProductPage {
	initialProduct: IProduct;
	similarProducts: IProduct[];
	slug?: string;
}

const ProductInfo: FC<IProductPage> = ({
	initialProduct,
	similarProducts,
	slug = ''
}) => {
	const [quantity, setQuantity] = useState<number>(1);
	const { addToCart, removeFromCart } = useActions();
	const { items } = useCart();

	const { data: product } = useQuery({
		queryKey: ['get product', initialProduct.id],
		queryFn: () => getProductBySlug(slug),
		initialData: initialProduct,
		enabled: !!slug
	});

	const optionsArray = product?.options ? JSON.parse(product.options) : null;
	const productImages = product?.images ? JSON.parse(product.images) : [];
	const sale = product ? product.price < product.oldPrice : false;

	const currentElement = items.find(
		cartItem => cartItem.product.id === product?.id
	);

	//Для исправления ошибки сериализации в Redux с redux-persist
	//Заменяем объект даты на строку
	let productForCart: IProduct | undefined;

	if (product?.createAt) {
		productForCart = {
			...product,
			createAt: (product.createAt as Date).toString(),
			reviews: product.reviews.map(review => ({
				...review,
				createAt: (review.createAt as Date).toString()
			}))
		};
	} else {
		productForCart = product;
	}

	const onButtonClick = () => {
		if (currentElement) {
			removeFromCart({ id: currentElement.id });
		} else {
			if (productForCart && product) {
				addToCart({
					product: productForCart,
					quantity,
					price: product?.price
				});
			}
			setQuantity(1);
		}
	};

	return (
		<div className='product-info'>
			<div className='product-info__header'>
				<h1 className='product-info__title'>{product?.name}</h1>
				{!!product && (
					<div className='product-info__favorite'>
						<FavoriteButton productId={product?.id} />
					</div>
				)}
			</div>
			<div className='product-info__inner'>
				<div className='product-info__gallery'>
					<ProductGallery images={productImages} />
				</div>
				<div className='product-info__body'>
					<div className='product-info__info'>
						<div className='product-info__category'>
							<span>Категория: </span>
							<Link
								href={`/categories/${product?.category?.slug}`}
							>
								{product?.category?.name}
							</Link>
						</div>
						<div className='product-info__category'>
							<span>Бренд: </span>
							<Link href={`/brands/${product?.brand?.slug}`}>
								{product?.brand?.name}
							</Link>
						</div>
						{!!product && (
							<div className='product-info__rating'>
								<span>Рейтинг: </span>
								<ProductRating product={product} isText />
							</div>
						)}
						<div className='product-info__characteristics'>
							<span className='title'>Характеристики:</span>
							{optionsArray.length ? (
								<ProductCharacteristics
									options={optionsArray}
								/>
							) : (
								<div className='product-info__nocharact'>
									характеристики отсутствуют
								</div>
							)}
						</div>
					</div>
					<div className='product-info__actions info-actions'>
						{!!product?.availability ? (
							<div className='info-actions__available'>
								<div
									className={`info-actions__price ${
										sale ? 'info-actions__price--sale' : ''
									}`}
								>
									{sale && (
										<div className='info-actions__old'>
											{priceConvert(product.oldPrice)}
										</div>
									)}
									<div
										className='info-actions__current'
										title='Цена'
									>
										{priceConvert(product.price)}
									</div>
								</div>

								<div className='info-actions__quantity'>
									<Quantity
										count={quantity}
										setCount={setQuantity}
										disabled={!!currentElement}
									/>
								</div>

								<div className='info-actions__button'>
									<Button
										type='button'
										onClick={onButtonClick}
									>
										{currentElement
											? 'Удалить с корзины'
											: 'Добавить в корзину'}
									</Button>
								</div>
							</div>
						) : (
							<div className='info-actions__unavailable'>
								Товара нет в наличии
							</div>
						)}
					</div>
					<div className='product-info__description'>
						<span>Описание:</span>
						{!!product?.description
							? product?.description
							: 'Нет описания'}
					</div>
				</div>
			</div>
			<SimilarProducts similarProducts={similarProducts} />
			{!!product && (
				<ProductReviews
					reviews={product.reviews}
					productId={product.id}
				/>
			)}
		</div>
	);
};

export default ProductInfo;
