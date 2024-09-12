import { createBrand, getAllBrands } from '@/services/brand.services';
import { byId } from '@/services/user.services';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	try {
		const brands = await getAllBrands();

		return NextResponse.json(brands);
	} catch (error) {
		return new NextResponse('Server error', { status: 500 });
	}
}

export async function POST(request: Request) {
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

		const data = await request.json();

		if (!data) {
			return new NextResponse('Invalid data received!', {
				status: 401
			});
		}

		const createdBrand = await createBrand(data, user.id, user.email);

		return NextResponse.json(createdBrand);
	} catch (error) {
		return new NextResponse('Server error', { status: 500 });
	}
}
