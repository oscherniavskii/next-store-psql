import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/jwt.constants';
import prisma from '@/libs/prismadb';
import { LoginFormData } from '@/types/auth.interface';
import { User } from '@prisma/client';
import { verify } from 'argon2';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import * as nodemailer from 'nodemailer';

export function saveDataToCookies({
	accessToken,
	refreshToken
}: {
	accessToken: string;
	refreshToken: string;
}) {
	const serverCurrentTime = new Date();
	const accessExpires = new Date(
		serverCurrentTime.getTime() + 30 * 60 * 1000
	);
	const refreshExpires = new Date(
		serverCurrentTime.getTime() + 7 * 24 * 60 * 60 * 1000
	);

	cookies().set(ACCESS_TOKEN, accessToken, { expires: accessExpires });
	cookies().set(REFRESH_TOKEN, refreshToken, { expires: refreshExpires });
}

export async function issueTokens(userId: number) {
	const data = { id: userId };

	const accessToken = jwt.sign(data, `${process.env.JWT_SECRET}`, {
		expiresIn: '30m'
	});
	const refreshToken = jwt.sign(data, `${process.env.JWT_SECRET}`, {
		expiresIn: '7d'
	});

	return { accessToken, refreshToken };
}

export function sendActivationMail(to: string, link: string) {
	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		// secure: false,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASSWORD
		}
	} as nodemailer.TransportOptions);

	transporter.sendMail({
		from: `"Next-Store" ${process.env.SMTP_USER}`,
		to,
		subject: `Account activation on ${process.env.CLIENT_URL}`,
		text: '', //Пусто т.к. отправляем html
		html: `
			<div>
				<h1>To activate, follow the link:</h1>
				<a href="${link}">${link}</a>
			</div>
		`
	});
}

export function returnUserFields(user: Partial<User>) {
	return {
		id: user.id,
		email: user.email,
		isAdmin: user.isAdmin,
		isActivate: user.isActivate
	};
}

export async function validateUser(data: LoginFormData) {
	const user = await prisma.user.findUnique({
		where: {
			email: data.email
		}
	});

	if (!user) throw new Error('User not found!');

	const isValid = await verify(user.password, data.password);

	if (!isValid) throw new Error('Invalid password!');

	return user;
}
