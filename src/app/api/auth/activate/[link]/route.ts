import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
	link?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
	try {
		if (!params.link) {
			return new NextResponse('Uncorrect data!', { status: 401 });
		}

		const user = await prisma.user.findUnique({
			where: {
				activateLink: params.link
			}
		});

		if (!user) {
			return new NextResponse('Uncorrect link!', { status: 401 });
		}

		await prisma.user.update({
			where: {
				activateLink: params.link
			},
			data: {
				isActivate: true
			}
		});

		return NextResponse.json({ isActive: true });
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message);
			return new NextResponse('Server error', { status: 500 });
		} else {
			console.error('Unknown error');
			return new NextResponse('Unknown server error', { status: 500 });
		}
	}
}
