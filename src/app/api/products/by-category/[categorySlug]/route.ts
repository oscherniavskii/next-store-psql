import { getbyProductCategory } from '@/services/product.services';
import { NextResponse } from 'next/server';

interface IParams {
	categorySlug: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
	try {
		if (!params.categorySlug) {
			return new NextResponse('Uncorrect data!', { status: 401 });
		}

		const product = await getbyProductCategory(params.categorySlug);

		return NextResponse.json(product);
	} catch (error) {
		return new NextResponse('Server error', { status: 500 });
	}
}
