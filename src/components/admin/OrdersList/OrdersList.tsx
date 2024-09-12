'use client';

import OrderItem from '@/components/UserOrders/OrderItem/OrderItem';
import PageLoader from '@/components/loaders/PageLoader/PageLoader';
import { getAllOrders } from '@/helpers/orderHelpers';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import './ordersList.scss';

const OrdersList: FC = () => {
	const { data, isFetching } = useQuery({
		queryKey: ['get admin orders'],
		queryFn: () => getAllOrders(),
		select: data => data
	});

	return (
		<div className='orders-list'>
			{isFetching ? (
				<PageLoader />
			) : data?.length ? (
				<>
					{data.map(item => (
						<OrderItem key={item.id} item={item} variant='admin' />
					))}
				</>
			) : (
				<div className='orders-list__empty'>Список пуст!</div>
			)}
		</div>
	);
};

export default OrdersList;
