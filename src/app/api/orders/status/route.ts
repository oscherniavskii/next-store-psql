import { updateOrderStatus } from '@/services/order.services';
import { NextResponse } from 'next/server';

//Данный путь (orders/status) нужно указать в личном кабинете Юкассы чтобы обновлялся статус
export async function POST(request: Request) {
	try {
		const postData = await request.json();

		if (!postData) {
			return new NextResponse('Invalid data received!', {
				status: 401
			});
		}

		const orderStatus = updateOrderStatus(postData);

		return NextResponse.json(orderStatus);
	} catch (error: unknown) {
		console.error(error);
		return new NextResponse('Server error', { status: 500 });
	}
}
