import { toggleFavorites } from '@/services/user.services';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

interface IParams {
	productId: string;
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
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

		const data = await toggleFavorites(+params.productId, userId);

		return NextResponse.json(data);
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
