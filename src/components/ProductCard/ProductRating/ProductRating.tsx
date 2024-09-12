import { IProduct } from '@/types/product.interface';
import { type FC } from 'react';
import { Rating } from 'react-simple-star-rating';
import './productRating.scss';

interface IProductRating {
	product: IProduct;
	isText?: boolean;
}

const ProductRating: FC<IProductRating> = ({ product, isText = false }) => {
	return (
		<div className='product-rating'>
			{product.reviews && (
				<span className='product-rating__body'>
					<Rating
						readonly
						initialValue={product.rating}
						SVGstyle={{
							display: 'inline-block'
						}}
						size={18}
						allowFraction
						transition
						fillColor='#ff9902'
						className='product-rating__stars'
						titleSeparator='из'
					/>
					<span className='product-rating__value'>
						{product.rating}
					</span>
				</span>
			)}

			{isText && (
				<span
					className='product-rating__reviews'
					title='Количество отзывов'
				>
					({product.reviews.length})
				</span>
			)}
		</div>
	);
};

export default ProductRating;
