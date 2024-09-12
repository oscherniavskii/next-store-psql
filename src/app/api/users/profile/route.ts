import { returnUserFields } from '@/services/auth.services';
import {
	byId,
	deleteProfile,
	switchAdminRole,
	updateProfile
} from '@/services/user.services';
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

		return NextResponse.json(user);
	} catch (error) {
		return new NextResponse('Server error', { status: 500 });
	}
}

export async function PUT(request: Request) {
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

		const data = await request.json();

		if (!data) {
			return new NextResponse('Invalid data received!', {
				status: 401
			});
		}

		const updatedUser = await updateProfile(userId, data);

		return NextResponse.json({ user: returnUserFields(updatedUser) });
	} catch (error) {
		return new NextResponse('Server error', { status: 500 });
	}
}

export async function PATCH(request: Request) {
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

		const data = await request.json();

		if (!data) {
			return new NextResponse('Invalid data received!', {
				status: 401
			});
		}

		const currentUser = await byId(userId);

		if (currentUser.id === 1) {
			const updatedUser = await switchAdminRole(data);

			if (updatedUser) {
				return NextResponse.json({ status: 'ok' });
			} else {
				return NextResponse.json({ status: 'error' });
			}
		} else {
			return new Response('No permissions', {
				status: 403
			});
		}
	} catch (error) {
		return new NextResponse('Server error', { status: 500 });
	}
}

export async function DELETE(request: Request) {
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

		const currentUserId = result.id;

		if (!currentUserId) {
			return new Response('Unauthorized', {
				status: 401
			});
		}

		const currentUser = await byId(currentUserId);

		const onDeletUserId = await request.json();

		if (!onDeletUserId) {
			return new NextResponse('Invalid data received!', {
				status: 401
			});
		}

		const onDeletUser = await byId(onDeletUserId);

		let deletedUser;

		if (+currentUserId === 1) {
			deletedUser = await deleteProfile(onDeletUserId);
			return NextResponse.json({ deletedUser });
		} else {
			if (currentUser.isAdmin) {
				if (!onDeletUser.isAdmin) {
					deletedUser = await deleteProfile(onDeletUserId);
					return NextResponse.json({ deletedUser });
				} else {
					return new Response('No permissions', {
						status: 403
					});
				}
			} else {
				if (+currentUserId === +onDeletUserId) {
					deletedUser = await deleteProfile(onDeletUserId);
					return NextResponse.json({ deletedUser });
				} else {
					return new Response('No permissions', {
						status: 403
					});
				}
			}
		}
	} catch (error) {
		return new NextResponse('Server error', { status: 500 });
	}
}
