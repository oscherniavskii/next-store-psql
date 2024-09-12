import SectionTitle from '@/components/SectionTitle/SectionTitle';
import { useAuth } from '@/hooks/useAuth';
import { IReview } from '@/types/review.interface';
import Link from 'next/link';
import LeaveReviewForm from './LeaveReviewForm/LeaveReviewForm';
import ReviewItem from './ReviewItem/ReviewItem';
import './productReviews.scss';

interface IProductReviews {
	reviews: IReview[];
	productId: number;
}

export default function ProductReviews({
	reviews,
	productId
}: IProductReviews) {
	const { user } = useAuth();

	return (
		<div className='product-reviews'>
			<SectionTitle>Отзывы о товаре</SectionTitle>

			{reviews.length > 0 ? (
				<div className='product-reviews__items'>
					{reviews.map(review => (
						<ReviewItem key={review.id} review={review} />
					))}
				</div>
			) : (
				<div className='product-reviews__empty'>
					У товара еще нет отзывов!
				</div>
			)}

			{user ? (
				<div className='product-reviews__form'>
					<LeaveReviewForm productId={productId} />
				</div>
			) : (
				<div className='product-reviews__auth'>
					Чтобы оставить отзыв, войдите в свою учетную запись!
					<Link href={'/login'}>Войти</Link>
				</div>
			)}
		</div>
	);
}
