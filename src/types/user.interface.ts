import { IOrderAdminData } from './order.interface';
import { IProduct } from './product.interface';

export interface IUser {
	id: number;
	email: string;
	phone: string;
	firstName: string;
	lastName: string;
	deliveryAdress: string;
	isAdmin: boolean;
}

export interface IFullUser extends IUser {
	favorites: IProduct[];
	orders: IOrderAdminData[];
	isActivate: boolean;
}

export interface IAuthResponse {
	user: IReturnUserFields;
}

export interface IReturnUserFields {
	id: number;
	email: string;
	isAdmin: boolean;
	isActivate: boolean;
}

export interface EditableUserFormData {
	phone: string;
	firstName: string;
	lastName: string;
	deliveryAdress: string;
}
