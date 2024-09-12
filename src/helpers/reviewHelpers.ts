import { instance } from '@/api/api.interceptor';
import { IReview, ReviewListData } from '@/types/review.interface';

const REVIEWS = '/reviews';

type TypeData = {
	rating: number;
	text: string;
};

//Получение всех отзывов
export async function getAllReviews() {
	try {
		const res = await instance<ReviewListData[]>({
			url: REVIEWS,
			method: 'GET'
		});

		return res.data;
	} catch (error) {
		console.error('Get all reviews:', error);
	}
}

//Оставить отзывов
export async function leaveReview(productId: string | number, data: TypeData) {
	try {
		const res = await instance<IReview>({
			url: `${REVIEWS}/leave/${productId}`,
			method: 'POST',
			data
		});

		return res.data;
	} catch (error) {
		console.error('Leave review:', error);
	}
}

//Удаление отзывов
export async function deleteReview(
	id: string | number,
	productId: string | number
) {
	try {
		const res = await instance<Promise<void>>({
			url: `${REVIEWS}/${id}`,
			method: 'DELETE',
			data: productId
		});

		return res.data;
	} catch (error) {
		console.error('Get all reviews:', error);
	}
}
