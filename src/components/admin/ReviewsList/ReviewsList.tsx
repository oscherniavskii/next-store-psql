'use client';

import PageLoader from '@/components/loaders/PageLoader/PageLoader';
import { deleteReview, getAllReviews } from '@/helpers/reviewHelpers';
import { formatDateTime } from '@/utils/format-date';
import { MutationFunction, useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { FC } from 'react';
import AdminActions from '../AdminActions/AdminActions';
import './reviewsList.scss';

// Определение типа для функции mutate
type MutateFunction = MutationFunction<void, { id: number; productId: number }>;

const ReviewsList: FC = () => {
	const { data, isFetching, refetch } = useQuery({
		queryKey: ['get admin reviews'],
		queryFn: () => getAllReviews(),
		select: data => data
	});

	const { mutate } = useMutation<
		void,
		Error,
		{ id: number; productId: number }
	>({
		mutationKey: ['delete review'],
		mutationFn: ({ id, productId }) => deleteReview(id, productId),
		onSuccess() {
			refetch();
		}
	});

	return (
		<div className='reviews-list'>
			{isFetching ? (
				<PageLoader />
			) : data?.length ? (
				<>
					{data.map(item => (
						<article className='reviews-list__item' key={item.id}>
							<div className='reviews-list__block'>
								<span className='reviews-list__title'>
									Дата:
								</span>
								<span className='reviews-list__value'>
									{formatDateTime(item.createAt as string)}
								</span>
							</div>
							<div className='reviews-list__block reviews-list__block--rating'>
								<span className='reviews-list__title'>
									Оценка:
								</span>
								<span className='reviews-list__value'>
									{item.rating}
								</span>
							</div>
							<div className='reviews-list__block'>
								<span className='reviews-list__title'>
									Автор:
								</span>
								<span className='reviews-list__value'>
									{item.user
										? `${item.user.firstName} ${item.user.lastName}`
										: 'DELETED'}
								</span>
							</div>
							<div className='reviews-list__block'>
								<span className='reviews-list__title'>
									Товар:
								</span>
								<Link
									href={`/product/${item.product.slug}`}
									target='_blank'
								>
									{item.product.name}
								</Link>
							</div>
							<div className='reviews-list__block'>
								<AdminActions
									removeHandler={() =>
										mutate({
											id: item.id,
											productId: item.product.id
										})
									}
									variants='review'
								/>
							</div>
							<div className='reviews-list__block'>
								<span className='reviews-list__title'>
									Текст:
								</span>
								<span className='reviews-list__value'>
									{item.text}
								</span>
							</div>
						</article>
					))}
				</>
			) : (
				<div className='reviews-list__empty'>Список пуст!</div>
			)}
		</div>
	);
};

export default ReviewsList;
