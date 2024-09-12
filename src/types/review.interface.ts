import { ProductReviewData } from './product.interface';
import { IUser } from './user.interface';

export interface IReview {
	id: number;
	user: IUser | null;
	createAt: Date | string;
	text: string;
	rating: number;
}

export interface ReviewsFormData {
	rating: number;
	text: string;
}

export interface ReviewListData extends IReview {
	product: ProductReviewData;
}
