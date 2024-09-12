import { IReview } from '@/types/review.interface';
import { formatDateTime } from '@/utils/format-date';
import type { FC } from 'react';
import { Rating } from 'react-simple-star-rating';
import './reviewItem.scss';

interface IReviewItem {
	review: IReview;
}

const ReviewItem: FC<IReviewItem> = ({ review }) => {
	return (
		<div className='review-item'>
			<div className='review-item__author'>
				<span className='review-item__title'>Покупатель: </span>
				{review.user
					? `${review.user.firstName} ${review.user.lastName}`
					: 'DELETED'}
			</div>
			<div className='review-item__date'>
				<span className='review-item__title'>Время: </span>
				{formatDateTime(review.createAt.toLocaleString())}
			</div>
			<div className='review-item__rating'>
				<span className='review-item__title'>Оценка: </span>
				<Rating
					readonly
					initialValue={review.rating}
					SVGstyle={{
						display: 'inline-block'
					}}
					size={18}
					allowFraction
					transition
				/>
			</div>
			<div className='review-item__text'>
				<span className='review-item__title'>Отзыв: </span>
				{review.text}
			</div>
		</div>
	);
};

export default ReviewItem;
