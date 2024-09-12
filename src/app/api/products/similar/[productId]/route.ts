import { getSimilarProducts } from '@/services/product.services';
import { NextResponse } from 'next/server';

interface IParams {
	productId: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
	try {
		if (!params.productId) {
			return new NextResponse('Uncorrect data!', { status: 401 });
		}

		const product = await getSimilarProducts(+params.productId);

		return NextResponse.json(product);
	} catch (error) {
		return new NextResponse('Server error', { status: 500 });
	}
}
