import {
	deleteBrand,
	getBrandById,
	updateBrand
} from '@/services/brand.services';
import { deleteFotos } from '@/services/image.services';
import { getbyProductBrand } from '@/services/product.services';
import { byId } from '@/services/user.services';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

interface IParams {
	brandId: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
	try {
		if (!params.brandId) {
			return new NextResponse('Uncorrect data!', { status: 401 });
		}

		const brand = await getBrandById(+params.brandId);

		return NextResponse.json(brand);
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

		if (!params.brandId) {
			return new NextResponse('Uncorrect data!', { status: 401 });
		}

		const data = await request.json();

		if (!data) {
			return new NextResponse('Invalid data received!', {
				status: 401
			});
		}

		const updatedBrand = await updateBrand(
			+params.brandId,
			data,
			user.id,
			user.email
		);

		return NextResponse.json(updatedBrand);
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

		if (!params.brandId) {
			return new NextResponse('Uncorrect data!', { status: 401 });
		}

		const brand = await getBrandById(+params.brandId);

		if (!brand) {
			return new NextResponse('Brand not found!', { status: 404 });
		}

		const brandProducts = await getbyProductBrand(brand.slug);
		let productsFoto: string[] = [];

		brandProducts.forEach(element => {
			const fotoArray = JSON.parse(element.images);

			productsFoto = [...productsFoto, ...fotoArray];
		});

		if (productsFoto && productsFoto.length > 0) {
			const fotoNames = productsFoto.map(
				(item: string) => item.split('/').pop() || ''
			);

			await deleteFotos(fotoNames);
		}

		const deletedBrand = await deleteBrand(+params.brandId);

		return NextResponse.json(deletedBrand);
	} catch (error) {
		return new NextResponse('Server error', { status: 500 });
	}
}
