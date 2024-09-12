import { getbyProductBrand } from '@/services/product.services';
import { NextResponse } from 'next/server';

interface IParams {
	brandSlug: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
	try {
		if (!params.brandSlug) {
			return new NextResponse('Uncorrect data!', { status: 401 });
		}

		const product = await getbyProductBrand(params.brandSlug);

		return NextResponse.json(product);
	} catch (error) {
		return new NextResponse('Server error', { status: 500 });
	}
}
