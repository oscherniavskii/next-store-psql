import { createProduct, getAllProduct } from '@/services/product.services';
import { byId } from '@/services/user.services';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	try {
		const url = new URL(request.url);

		const page = url.searchParams.get('page') || undefined;
		const perPage = url.searchParams.get('perPage') || undefined;
		const sort = url.searchParams.get('sort') || undefined;
		const searchTerm = url.searchParams.get('searchTerm') || undefined;
		const ratings = url.searchParams.get('ratings') || undefined;
		const minPrice = url.searchParams.get('minPrice') || undefined;
		const maxPrice = url.searchParams.get('maxPrice') || undefined;
		const categoryId = url.searchParams.get('categoryId') || undefined;
		const brandId = url.searchParams.get('brandId') || undefined;

		const params = {
			page,
			perPage,
			sort,
			searchTerm,
			ratings,
			maxPrice,
			minPrice,
			categoryId,
			brandId
		};

		const products = await getAllProduct(params);

		return NextResponse.json(products);
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

		const createdProduct = await createProduct(data, user.id, user.email);

		return NextResponse.json(createdProduct);
	} catch (error) {
		return new NextResponse('Server error', { status: 500 });
	}
}
