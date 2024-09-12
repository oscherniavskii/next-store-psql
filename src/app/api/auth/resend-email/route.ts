import { sendActivationMail } from '@/services/auth.services';
import { byId } from '@/services/user.services';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
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

		if (user) {
			sendActivationMail(
				user.email,
				`${process.env.CLIENT_URL}/activation/${user.activateLink}`
			);
		} else {
			return new NextResponse('User not found!', {
				status: 401
			});
		}

		return NextResponse.json({ status: 'ok' });
	} catch (error) {
		return new NextResponse('Server error', { status: 500 });
	}
}
