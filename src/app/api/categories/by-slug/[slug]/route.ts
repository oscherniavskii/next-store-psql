import { getCategoryBySlug } from '@/services/category.services';
import { NextResponse } from 'next/server';

interface IParams {
	slug: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
	try {
		if (!params.slug) {
			return new NextResponse('Uncorrect data!', { status: 401 });
		}

		const category = await getCategoryBySlug(params.slug);

		return NextResponse.json(category);
	} catch (error) {
		return new NextResponse('Server error', { status: 500 });
	}
}
