import prisma from '@/libs/prismadb';
import { OrderData } from '@/types/order.interface';
import { PaymentStatusData } from '@/types/payment.interface';
// @ts-ignore
import * as YooKassa from 'yookassa';

//Оплата. Настройка Юкасса
const yooKassa = new YooKassa({
	shopId: process.env.SHOP_ID,
	secretKey: process.env.PAYMENT_TOKEN
});

export async function getAllOrders() {
	return prisma.order.findMany({
		orderBy: {
			createAt: 'desc'
		},
		include: {
			user: true,
			items: {
				include: {
					product: {
						select: {
							images: true,
							description: true,
							id: true,
							name: true,
							price: true,
							createAt: true,
							availability: true,
							oldPrice: true,
							options: true,
							slug: true,
							rating: true,
							category: {
								select: {
									id: true,
									name: true,
									slug: true
								}
							},
							brand: {
								select: {
									id: true,
									name: true,
									slug: true
								}
							},
							reviews: {
								select: {
									user: {
										select: {
											id: true,
											email: true,
											firstName: true,
											lastName: true,
											password: false,
											phone: true,
											deliveryAdress: true
										}
									},
									createAt: true,
									text: true,
									rating: true,
									id: true
								},
								orderBy: {
									createAt: 'desc'
								}
							}
						}
					}
				}
			}
		}
	});
}

export async function getOrdersByUserId(userId: number) {
	return prisma.order.findMany({
		where: {
			userId
		},
		orderBy: {
			createAt: 'desc'
		},
		include: {
			items: {
				include: {
					product: {
						select: {
							images: true,
							description: true,
							id: true,
							name: true,
							price: true,
							createAt: true,
							availability: true,
							oldPrice: true,
							options: true,
							slug: true,
							rating: true,
							category: {
								select: {
									id: true,
									name: true,
									slug: true
								}
							},
							brand: {
								select: {
									id: true,
									name: true,
									slug: true
								}
							},
							reviews: {
								select: {
									user: {
										select: {
											id: true,
											email: true,
											firstName: true,
											lastName: true,
											password: false,
											phone: true,
											deliveryAdress: true
										}
									},
									createAt: true,
									text: true,
									rating: true,
									id: true
								},
								orderBy: {
									createAt: 'desc'
								}
							}
						}
					}
				}
			}
		}
	});
}

export async function placeOrder(data: OrderData, userId: number) {
	const total = data.items.reduce((acc, item) => {
		return acc + item.price * item.quantity;
	}, 0);

	const user = await prisma.user.findUnique({
		where: {
			id: userId
		}
	});

	const order = await prisma.order.create({
		data: {
			status: data.status,
			items: {
				create: data.items
			},
			total,
			name: `${user?.firstName} ${user?.lastName}`,
			email: user?.email,
			user: {
				connect: {
					id: userId
				}
			}
		}
	});

	//Создание платежа
	const payment = await yooKassa.createPayment({
		amount: {
			value: total.toFixed(2),
			currency: 'RUB'
		},
		payment_method_data: {
			type: 'bank_card'
		},
		confirmation: {
			type: 'redirect',
			return_url: `${process.env.CLIENT_URL}/thanks`
		},

		description: `Order ID: ${order.id}`
	});

	return payment;
}

export async function updateOrderStatus(data: PaymentStatusData) {
	if (data.event === 'payment.waiting_for_capture') {
		const payment = await yooKassa.capturePayment(data.object.id);

		return payment;
	}

	if (data.event === 'payment.succeeded') {
		const orderId = Number(data.object.description.split('#')[1]);

		await prisma.order.update({
			where: {
				id: orderId
			},
			data: {
				status: 'PAYED'
			}
		});

		return true;
	}

	return true;
}
