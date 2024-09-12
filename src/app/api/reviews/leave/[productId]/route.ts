import {
	getbyProductId,
	updateProductRating
} from '@/services/product.services';
import {
	createReview,
	getReviewsAverageValue
} from '@/services/reviews.services';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

interface IParams {
	productId: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
	try {
		if (!params.productId) {
			return new NextResponse('Uncorrect data!', { status: 401 });
		}

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

		const postData = await request.json();

		if (!postData) {
			return new NextResponse('Invalid data received!', {
				status: 401
			});
		}

		const product = await getbyProductId(+params.productId);

		if (!product) {
			return new NextResponse('Product not found!', {
				status: 401
			});
		}

		const newReview = await createReview(
			userId,
			postData,
			+params.productId
		);

		if (!newReview) {
			return new NextResponse('Server error', { status: 500 });
		}

		const newRating = await getReviewsAverageValue(+params.productId);

		if (newRating && +newRating !== product.rating) {
			await updateProductRating(+params.productId, +newRating);
		}

		return NextResponse.json(newReview);
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message);
			return new NextResponse('Server error', { status: 500 });
		} else {
			console.error('Unknown error');
			return new NextResponse('Unknown server error', { status: 500 });
		}
	}
}
