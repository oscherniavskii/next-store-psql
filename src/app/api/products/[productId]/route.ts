import { deleteFotos } from '@/services/image.services';
import {
	deleteProduct,
	getbyProductId,
	updateProduct,
	updateProductFoto
} from '@/services/product.services';
import { byId } from '@/services/user.services';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

interface IParams {
	productId: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
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

		if (!params.productId) {
			return new NextResponse('Uncorrect data!', { status: 401 });
		}

		const product = await getbyProductId(+params.productId);

		return NextResponse.json(product);
	} catch (error) {
		return new NextResponse('Server error', { status: 500 });
	}
}

export async function PUT(request: Request, { params }: { params: IParams }) {
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

		if (!params.productId) {
			return new NextResponse('Uncorrect data!', { status: 401 });
		}

		const data = await request.json();

		if (!data) {
			return new NextResponse('Invalid data received!', {
				status: 401
			});
		}

		const updatedProduct = await updateProduct(
			+params.productId,
			data,
			user.id,
			user.email
		);

		return NextResponse.json(updatedProduct);
	} catch (error) {
		return new NextResponse('Server error', { status: 500 });
	}
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
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

		if (!params.productId) {
			return new NextResponse('Uncorrect data!', { status: 401 });
		}

		const data = await request.json();

		if (!data) {
			return new NextResponse('Invalid data received!', {
				status: 401
			});
		}

		const updatedProduct = await updateProductFoto(
			+params.productId,
			data.images,
			user.id,
			user.email
		);

		return NextResponse.json(updatedProduct);
	} catch (error) {
		return new NextResponse('Server error', { status: 500 });
	}
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

		if (!params.productId) {
			return new NextResponse('Uncorrect data!', { status: 401 });
		}

		const product = await getbyProductId(+params.productId);

		if (!product) {
			return new NextResponse('Product not found!', { status: 404 });
		}

		const fotoUrls: string[] = JSON.parse(product.images);

		if (fotoUrls && fotoUrls.length > 0) {
			const fotoNames = fotoUrls.map(
				(item: string) => item.split('/').pop() || ''
			);

			await deleteFotos(fotoNames);
		}

		const deletedProduct = await deleteProduct(+params.productId);

		return NextResponse.json(deletedProduct);
	} catch (error) {
		return new NextResponse('Server error', { status: 500 });
	}
}
