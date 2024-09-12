import { updateProductRating } from '@/services/product.services';
import {
	deleteReview,
	getReviewsAverageValue
} from '@/services/reviews.services';
import { byId } from '@/services/user.services';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

interface IParams {
	reviewId: string;
}

export async function DELETE(
	request: Request,
	{ params }: { params: IParams }
) {
	try {
		const headersList = headers();
		const token = headersList.get('Authorization');

		if (!token) {
			return new Response('Unauthorized', {
				status: 401
			});
		}

		const tokenWithoutBearer = token.replace('Bearer ', '');

		const result = jwt.verify(
			`${tokenWithoutBearer}`,
			`${process.env.JWT_SECRET}`
		) as JwtPayload;

		const userId = result.id;

		if (!userId) {
			return new Response('Unauthorized', {
				status: 401
			});
		}

		const user = await byId(userId);

		if (!user.isAdmin) {
			return new Response('No permissions', {
				status: 403
			});
		}

		if (!params.reviewId) {
			return new NextResponse('Uncorrect data!', { status: 401 });
		}

		const productId = await request.json();

		if (!productId) {
			return new NextResponse('Invalid data received!', {
				status: 401
			});
		}

		const deletedReview = await deleteReview(+params.reviewId);

		const newRating = await getReviewsAverageValue(+productId);

		if (newRating) {
			await updateProductRating(+productId, +newRating);
		}

		return NextResponse.json(deletedReview);
	} catch (error) {
		return new NextResponse('Server error', { status: 500 });
	}
}
