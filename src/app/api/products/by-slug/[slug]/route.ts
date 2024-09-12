import { getbyProductSlug } from '@/services/product.services';
import { NextResponse } from 'next/server';

interface IParams {
	slug: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
	try {
		if (!params.slug) {
			return new NextResponse('Uncorrect data!', { status: 401 });
		}

		const product = await getbyProductSlug(params.slug);

		return NextResponse.json(product);
	} catch (error) {
		return new NextResponse('Server error', { status: 500 });
	}
}
