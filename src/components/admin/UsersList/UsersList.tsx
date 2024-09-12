'use client';

import PageLoader from '@/components/loaders/PageLoader/PageLoader';
import {
	deleteProfile,
	getAllUsers,
	switchAdminRole
} from '@/helpers/userHelpers';
import { useAuth } from '@/hooks/useAuth';
import { priceConvert } from '@/utils/price-format';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import AdminActions from '../AdminActions/AdminActions';
import './usersList.scss';

const UsersList: FC = () => {
	const { user } = useAuth();

	const { data, isFetching, refetch } = useQuery({
		queryKey: ['get admin users'],
		queryFn: () => getAllUsers(),
		select: data => data
	});

	const { mutate: deleteUser } = useMutation({
		mutationKey: ['delete user'],
		mutationFn: (id: number) => deleteProfile(id),
		onSuccess() {
			refetch();
		}
	});

	const { mutate: switchAdmin } = useMutation({
		mutationKey: ['switch admin'],
		mutationFn: (id: number) => switchAdminRole(id),
		onSuccess() {
			refetch();
		}
	});

	return (
		<div className='users-list'>
			{isFetching ? (
				<PageLoader />
			) : data?.length ? (
				<>
					{data.map(item => {
						const ordersTotalCount =
							item.orders?.reduce((count, item) => {
								count += item.total;
								return count;
							}, 0) || 0;

						return (
							<article className='users-list__item' key={item.id}>
								<div className='users-list__name'>
									{item.lastName} {item.firstName}
								</div>
								<div className='users-list__email'>
									{item.email}
								</div>
								<div
									className={`users-list__admin ${
										item.isAdmin
											? 'users-list__admin--true'
											: ''
									}`}
								>
									{item.isAdmin
										? 'Администратор'
										: 'Покупатель'}
								</div>
								<div
									className={`users-list__active ${
										item.isActivate
											? 'users-list__active--true'
											: ''
									}`}
								>
									<span>Подтвержден: </span>
									<span>
										{item.isActivate ? 'Да' : 'Нет'}
									</span>
								</div>
								<div className='users-list__orders'>
									Заказов: {item.orders?.length || 0}
								</div>
								<div className='users-list__total'>
									Сумма заказов:{' '}
									{priceConvert(ordersTotalCount)}
								</div>
								<div className='users-list__fav'>
									Товары в избранном: {item.favorites.length}
								</div>
								<div className='users-list__actions'>
									{user && +user.id === 1 && (
										<button
											className={`users-list__switch ${
												item.isAdmin ? 'admin' : ''
											}`}
											title='Админ права'
											onClick={() => switchAdmin(item.id)}
										>
											<svg viewBox='0 0 32 32'>
												<path
													d='M12,4A5,5,0,1,1,7,9a5,5,0,0,1,5-5m0-2a7,7,0,1,0,7,7A7,7,0,0,0,12,2Z'
													transform='translate(0 0)'
												/>
												<path
													d='M22,30H20V25a5,5,0,0,0-5-5H9a5,5,0,0,0-5,5v5H2V25a7,7,0,0,1,7-7h6a7,7,0,0,1,7,7Z'
													transform='translate(0 0)'
												/>
												<polygon points='25 16.18 22.41 13.59 21 15 25 19 32 12 30.59 10.59 25 16.18' />
												<rect
													fill='none'
													height='32'
													width='32'
												/>
											</svg>
										</button>
									)}
									{(user && +user.id === 1) ||
									!item.isAdmin ? (
										<AdminActions
											removeHandler={() =>
												deleteUser(item.id)
											}
											variants='user'
											name={`${item.lastName} ${item.firstName}`}
										/>
									) : null}
								</div>
							</article>
						);
					})}
				</>
			) : (
				<div className='users-list__empty'>Список пуст!</div>
			)}
		</div>
	);
};

export default UsersList;
