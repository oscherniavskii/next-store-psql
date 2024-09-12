'use client';

import { toggleFavorite } from '@/helpers/userHelpers';
import { useProfile } from '@/hooks/useProfile';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import './favoriteButton.scss';

const FavoriteButton: FC<{ productId: number }> = ({ productId }) => {
	const { profile } = useProfile();
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationKey: ['toggle favorite'],
		mutationFn: () => toggleFavorite(productId),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['get profile'] });
		}
	});

	if (!profile) return null;

	const isExist = profile.favorites.some(favorit => favorit.id === productId);

	return (
		<div className='favorite-button'>
			<button
				className='favorite-button__btn'
				onClick={() => mutate()}
				title={
					isExist ? 'Удалить из избранного' : 'Добавить в избранное'
				}
			>
				{isExist ? (
					<svg
						x='0px'
						y='0px'
						width='24px'
						height='24px'
						viewBox='0 0 32 32'
						className='favorite-button__added'
					>
						<path
							d='M14.708,15.847C14.252,14.864,14,13.742,14,12.5s0.252-2.489,0.708-3.659c0.455-1.171,1.114-2.266,1.929-3.205
						   c0.814-0.938,1.784-1.723,2.86-2.271C20.574,2.814,21.758,2.5,23,2.5s2.426,0.252,3.503,0.707c1.077,0.456,2.046,1.115,2.86,1.929
						   c0.813,0.814,1.474,1.784,1.929,2.861C31.749,9.073,32,10.258,32,11.5s-0.252,2.427-0.708,3.503
						   c-0.455,1.077-1.114,2.047-1.929,2.861C28.55,18.678,17.077,29.044,16,29.5l0,0l0,0C14.923,29.044,3.45,18.678,2.636,17.864
						   c-0.814-0.814-1.473-1.784-1.929-2.861C0.252,13.927,0,12.742,0,11.5s0.252-2.427,0.707-3.503C1.163,6.92,1.821,5.95,2.636,5.136
						   C3.45,4.322,4.42,3.663,5.497,3.207C6.573,2.752,7.757,2.5,9,2.5s2.427,0.314,3.503,0.863c1.077,0.55,2.046,1.334,2.861,2.272
						   c0.814,0.939,1.473,2.034,1.929,3.205C17.748,10.011,18,11.258,18,12.5s-0.252,2.364-0.707,3.347
						   c-0.456,0.983-1.113,1.828-1.929,2.518'
							fill='#ff9902'
						/>
					</svg>
				) : (
					<svg
						x='0px'
						y='0px'
						viewBox='0 0 333.701 333.701'
						width='24px'
						height='24px'
					>
						<path
							d='M166.828,312.996L25.932,172.101c-34.576-34.576-34.576-90.837,0-125.42C42.681,29.933,64.95,20.704,88.639,20.704
		s45.965,9.229,62.713,25.977l15.476,15.476l15.476-15.476c16.748-16.748,39.024-25.977,62.713-25.977s45.952,9.229,62.707,25.977
		c16.755,16.748,25.977,39.024,25.977,62.713s-9.229,45.958-25.977,62.707L166.828,312.996z M88.639,33.558
		c-20.257,0-39.3,7.892-53.619,22.211c-29.563,29.57-29.563,77.675,0,107.245l131.814,131.808l131.802-131.808
		c14.325-14.325,22.211-33.362,22.211-53.619s-7.892-39.3-22.211-53.626c-14.325-14.325-33.362-22.211-53.619-22.211
		s-39.3,7.892-53.626,22.211l-24.563,24.563l-24.563-24.563C127.939,41.45,108.896,33.558,88.639,33.558z'
							fill='#ff9902'
						/>
					</svg>
				)}
			</button>
		</div>
	);
};

export default FavoriteButton;
