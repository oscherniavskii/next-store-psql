import {
	issueTokens,
	returnUserFields,
	saveDataToCookies,
	validateUser
} from '@/services/auth.services';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const data = await request.json();

		const user = await validateUser(data);

		const tokens = await issueTokens(user.id);

		saveDataToCookies({ ...tokens });

		return NextResponse.json({ user: returnUserFields(user) });
	} catch (error: unknown) {
		return new NextResponse('Unauthorized', { status: 401 });
	}
}
