import prisma from '@/libs/prismadb';
import { ReviewsFormData } from '@/types/review.interface';

export async function getAllReviews() {
	return prisma.review.findMany({
		orderBy: {
			createAt: 'desc'
		},
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
			id: true,
			product: {
				select: {
					name: true,
					slug: true,
					id: true
				}
			}
		}
	});
}

export async function createReview(
	userId: number,
	data: ReviewsFormData,
	productId: number
) {
	return prisma.review.create({
		data: {
			...data,
			product: {
				connect: {
					id: productId
				}
			},
			user: {
				connect: {
					id: userId
				}
			}
		}
	});
}

export async function getReviewsAverageValue(productId: number) {
	try {
		const res = await prisma.review
			.aggregate({
				where: {
					productId
				},
				_avg: { rating: true }
			})
			.then(data => data._avg);

		return res.rating ? Math.round(+res.rating * 10) / 10 : null;
	} catch (error) {
		console.error('Get statistics:', error);
	}
}

export async function deleteReview(id: number) {
	return prisma.review.delete({
		where: {
			id
		}
	});
}
