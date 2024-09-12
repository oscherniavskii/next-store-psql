import prisma from '@/libs/prismadb';
import {
	issueTokens,
	returnUserFields,
	saveDataToCookies,
	sendActivationMail
} from '@/services/auth.services';
import { hash } from 'argon2';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
	try {
		const data = await request.json();

		if (!data) {
			return new NextResponse('Invalid data received!', {
				status: 401
			});
		}

		const oldUser = await prisma.user.findUnique({
			where: {
				email: data.email
			}
		});

		if (oldUser) {
			return new NextResponse('User already exists!', {
				status: 400
			});
		}

		const activationLink = uuidv4();

		const user = await prisma.user.create({
			data: {
				email: data.email,
				firstName: data.firstName,
				lastName: data.lastName,
				phone: data.phone,
				deliveryAdress: data.deliveryAdress,
				password: await hash(data.password),
				activateLink: activationLink,
				policy: data.policy
			}
		});

		sendActivationMail(
			data.email,
			`${process.env.CLIENT_URL}/activation/${activationLink}`
		);

		const tokens = await issueTokens(user.id);

		saveDataToCookies({ ...tokens });

		return NextResponse.json({ user: returnUserFields(user) });
	} catch (error: unknown) {
		console.log(error);
		return new NextResponse('Server error', { status: 500 });
	}
}
