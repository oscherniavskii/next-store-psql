import {
	deleteCategory,
	getCategoryById,
	updateCategory,
	updateCategoryFoto,
	updatePriority
} from '@/services/category.services';
import { deleteFotos } from '@/services/image.services';
import { getbyProductCategory } from '@/services/product.services';
import { byId } from '@/services/user.services';
import { ICategory } from '@/types/category.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

interface IParams {
	categoryId: string;
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

		if (!params.categoryId) {
			return new NextResponse('Uncorrect data!', { status: 401 });
		}

		if (!params.categoryId) {
			return new NextResponse('Uncorrect data!', { status: 401 });
		}

		const category = await getCategoryById(+params.categoryId);

		return NextResponse.json(category);
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

		if (!params.categoryId) {
			return new NextResponse('Uncorrect data!', { status: 401 });
		}

		const data = await request.json();

		if (!data) {
			return new NextResponse('Invalid data received!', {
				status: 401
			});
		}

		const updatedCategory = await updateCategory(
			+params.categoryId,
			data,
			user.id,
			user.email
		);

		return NextResponse.json(updatedCategory);
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

		if (!params.categoryId) {
			return new NextResponse('Uncorrect data!', { status: 401 });
		}

		const data = await request.json();

		if (!data && data !== 0) {
			return new NextResponse('Invalid data received!', {
				status: 401
			});
		}

		let updatedCategory: ICategory;

		if (data.image) {
			updatedCategory = await updateCategoryFoto(
				+params.categoryId,
				data.image,
				user.id,
				user.email
			);
		} else {
			updatedCategory = await updatePriority(
				+params.categoryId,
				data,
				user.id,
				user.email
			);
		}

		return NextResponse.json(updatedCategory);
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

		if (!params.categoryId) {
			return new NextResponse('Uncorrect data!', { status: 401 });
		}

		const category = await getCategoryById(+params.categoryId);

		if (!category) {
			return new NextResponse('Category not found!', { status: 404 });
		}

		const url = category.cover || '';
		let fotoUrls: string[] = [];

		fotoUrls.push(url);

		if (fotoUrls && fotoUrls.length > 0) {
			const fotoNames = fotoUrls.map(
				(item: string) => item.split('/').pop() || ''
			);

			await deleteFotos(fotoNames);
		}

		const categoryProducts = await getbyProductCategory(category.slug);
		let productsFoto: string[] = [];

		categoryProducts.forEach(element => {
			const fotoArray = JSON.parse(element.images);

			productsFoto = [...productsFoto, ...fotoArray];
		});

		if (productsFoto && productsFoto.length > 0) {
			const fotoNames = productsFoto.map(
				(item: string) => item.split('/').pop() || ''
			);

			await deleteFotos(fotoNames);
		}

		const deletedCategory = await deleteCategory(+params.categoryId);

		return NextResponse.json(deletedCategory);
	} catch (error) {
		return new NextResponse('Server error', { status: 500 });
	}
}
