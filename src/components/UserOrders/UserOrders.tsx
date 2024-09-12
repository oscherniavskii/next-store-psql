'use client';

import { getOrdersByUserId } from '@/helpers/orderHelpers';
import { IOrder } from '@/types/order.interface';
import { FC, useEffect, useState } from 'react';
import ListLoader from '../loaders/ListLoader/ListLoader';
import OrderItem from './OrderItem/OrderItem';
import './userOrders.scss';

const UserOrders: FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [orders, setOrders] = useState<IOrder[]>([]);

	useEffect(() => {
		setIsLoading(true);
		getOrdersByUserId()
			.then(res => setOrders(res || []))
			.catch(e => console.log(e))
			.finally(() => setIsLoading(false));
	}, []);

	if (isLoading) return <ListLoader />;

	return (
		<div className='user-orders'>
			{orders.length > 0 ? (
				<>
					<div className='user-orders__header'>
						<span>Дата и время</span>
						<span>Общая стоимость</span>
						<span>Статус</span>
						<span>Подробнее</span>
					</div>
					{orders &&
						orders.map(item => (
							<OrderItem key={item.id} item={item} />
						))}
				</>
			) : (
				<div className='user-orders__empty'>
					У Вас пока нет покупок!
				</div>
			)}
		</div>
	);
};

export default UserOrders;
