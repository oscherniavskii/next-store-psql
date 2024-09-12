import { byId, updatePassword } from '@/services/user.services';
import { ChangePasswordFormData } from '@/types/auth.interface';
import { verify } from 'argon2';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
	try {
		const data: ChangePasswordFormData = await request.json();

		if (!data) {
			return new NextResponse('Invalid data received!', {
				status: 401
			});
		}

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

		const isValid = await verify(user.password, data.oldPassword);

		if (!isValid) return NextResponse.json({ status: 'error' });

		const updatedUser = await updatePassword(userId, data.newPassword);

		if (!updatedUser) {
			return new Response('Invalid data received!', {
				status: 401
			});
		}

		return NextResponse.json({ status: 'ok' });
	} catch (error: unknown) {
		console.log(error);
		return new NextResponse('Server error', { status: 500 });
	}
}
