import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const token = await request.json();

		const result = jwt.verify(
			`${token}`,
			`${process.env.JWT_SECRET}`
		) as JwtPayload;

		if (!result) {
			return NextResponse.json({ isVerifyed: false });
		}

		return NextResponse.json({ isVerifyed: true });
	} catch (error: unknown) {
		console.error(error);
		return new NextResponse('Server error', { status: 500 });
	}
}
