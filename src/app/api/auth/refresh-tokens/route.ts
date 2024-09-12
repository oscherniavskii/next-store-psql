import {
	issueTokens,
	returnUserFields,
	saveDataToCookies
} from '@/services/auth.services';
import { byId } from '@/services/user.services';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const refreshToken = await request.json();

		const result = jwt.verify(
			`${refreshToken}`,
			`${process.env.JWT_SECRET}`
		) as JwtPayload;

		if (!result || !result.id) {
			throw new Error('Invalid refresh token!');
		}

		const user = await byId(result.id);

		const tokens = await issueTokens(user.id);

		saveDataToCookies({ ...tokens });

		return NextResponse.json({ user: returnUserFields(user) });
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
