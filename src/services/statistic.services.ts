import prisma from '@/libs/prismadb';
import { getAllOrders } from './order.services';

export async function getMainStat() {
	const ordersCount = await prisma.order.count();
	const reviewsCount = await prisma.review.count();
	const usersCount = await prisma.user.count();
	const categoryCount = await prisma.category.count();
	const brandCount = await prisma.brand.count();
	const productCount = await prisma.product.count();

	const totalAmount = await prisma.order.aggregate({
		_sum: {
			total: true
		}
	});

	const orders = await getAllOrders();
	const totalOrdersQuantity = orders.reduce((sum, group) => {
		return (
			sum +
			group.items.reduce((itemSum, item) => {
				return itemSum + item.quantity;
			}, 0)
		);
	}, 0);

	return [
		{
			name: 'Пользователи',
			value: usersCount
		},
		{
			name: 'Категории',
			value: categoryCount
		},
		{
			name: 'Бренды',
			value: brandCount
		},
		{
			name: 'Товары',
			value: productCount
		},
		{
			name: 'Заказы',
			value: ordersCount
		},
		{
			name: 'Отзывы',
			value: reviewsCount
		},
		{
			name: 'Продано товаров',
			value: totalOrdersQuantity || 0
		},
		{
			name: 'Сумма продаж',
			value: totalAmount._sum.total || 0
		}
	];
}
