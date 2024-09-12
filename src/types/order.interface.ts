import { ICartItem } from './cart.interface';
import { IUser } from './user.interface';

export interface IOrder {
	id: number;
	createAt: string;
	items: ICartItem[];
	status: 'PENDING' | 'PAYED' | 'SHIPPED' | 'DELIVERED';
	user: IUser | null;
	total: number;
	name?: string;
	email?: string;
}

export interface OrderData {
	status: string;
	items: OrderItemData[];
}

export interface OrderItemData {
	quantity: number;
	price: number;
	productId: number;
	name?: string;
}

export interface IOrderAdminData {
	total: number;
}
