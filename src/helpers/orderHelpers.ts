import { instance } from '@/api/api.interceptor';
import { IOrder } from '@/types/order.interface';

const ORDERS = '/orders';

type TypeData = {
	status?: 'PENDING' | 'PAYED' | 'SHIPPED' | 'DELIVERED';
	items: {
		quantity: number;
		price: number;
		productId: number;
	}[];
};

//Получение всех заказов
export async function getAllOrders() {
	try {
		const res = await instance<IOrder[]>({
			url: ORDERS,
			method: 'GET'
		});

		return res.data;
	} catch (error) {
		console.error('Get all orders:', error);
	}
}

//Получение заказов определенного пользователя
export async function getOrdersByUserId() {
	try {
		const res = await instance<IOrder[]>({
			url: `${ORDERS}/by-user`,
			method: 'GET'
		});

		return res.data;
	} catch (error) {
		console.error('Get user orders:', error);
	}
}

//Подтверждение оплаты
export async function placeOrder(data: TypeData) {
	try {
		const res = await instance<{
			confirmation: { confirmation_url: string };
		}>({
			url: ORDERS,
			method: 'POST',
			data
		});

		return res.data;
	} catch (error) {
		console.error('Create order:', error);
	}
}
