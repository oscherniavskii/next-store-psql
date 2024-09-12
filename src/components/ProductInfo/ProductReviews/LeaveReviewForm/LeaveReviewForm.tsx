import InfinityLoader from '@/components/loaders/InfinityLoader/InfinityLoader';
import Button from '@/components/ui/Button/Button';
import { leaveReview } from '@/helpers/reviewHelpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Rating } from 'react-simple-star-rating';
import './leaveReviewForm.scss';

interface IReviewsFields {
	rating: number;
	text: string;
}

const LeaveReviewForm: FC<{ productId: number }> = ({ productId }) => {
	const {
		register: formRegister,
		formState: { errors },
		handleSubmit,
		reset,
		control
	} = useForm<IReviewsFields>({ mode: 'onChange' });

	const queryClient = useQueryClient();

	const { mutate, isSuccess, isPending } = useMutation({
		mutationKey: ['leave review'],
		mutationFn: (data: IReviewsFields) => leaveReview(productId, data),
		onSuccess() {
			queryClient.refetchQueries({
				queryKey: ['get product', productId]
			});
		}
	});

	const onSubmit: SubmitHandler<IReviewsFields> = data => {
		mutate(data);
		reset();
	};

	if (isSuccess)
		return (
			<div className='review-form-success'>Ваш отзыв опубликован!</div>
		);

	return (
		<form className='review-form' onSubmit={handleSubmit(onSubmit)}>
			<h3 className='review-form__title'>Оставить отзыв:</h3>

			{isPending ? (
				<div>
					<InfinityLoader />
				</div>
			) : (
				<>
					<div className='review-form__inner'>
						<div className='review-form__rating'>
							<span className='review-form__descr'>Оценка: </span>
							<Controller
								control={control}
								name='rating'
								render={({ field: { onChange, value } }) => (
									<Rating
										onClick={onChange}
										initialValue={value}
										SVGstyle={{
											display: 'inline-block'
										}}
										size={20}
										transition
									/>
								)}
								rules={{
									required: 'Оценка обязательна!'
								}}
							/>
						</div>

						<div className='review-form__field'>
							<textarea
								{...formRegister('text', {
									required: 'Текст отзыва обязателен!'
								})}
								placeholder='Текст отзыва...'
								className='review-form__textarea'
							/>

							{Object.entries(errors) && (
								<ul className='review-form__errors'>
									{Object.entries(errors).map(
										([_, error]) => (
											<li key={error.message}>
												{error?.message}
											</li>
										)
									)}
								</ul>
							)}
						</div>
					</div>
					<div className='review-form__button'>
						<Button type='submit' variant='button'>
							Оставить отзыв
						</Button>
					</div>
				</>
			)}
		</form>
	);
};

export default LeaveReviewForm;
