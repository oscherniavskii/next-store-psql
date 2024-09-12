import { axiosClassic } from '@/api/api.interceptor';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/jwt.constants';
import Cookies from 'js-cookie';

const AUTH = '/auth';

export async function checkAndUpdateAuthentication() {
	const accessToken = Cookies.get(ACCESS_TOKEN);
	const refreshToken = Cookies.get(REFRESH_TOKEN);

	if (!refreshToken) {
		logout();
		return false;
	}

	if (accessToken) {
		const accessVerify = await verifyToken(accessToken);

		if (accessVerify) {
			return true;
		} else {
			const isRefreshTokens = await refreshTokens(refreshToken);
			if (isRefreshTokens) return true;
		}
	} else {
		const isRefreshTokens = await refreshTokens(refreshToken);
		if (isRefreshTokens) return true;
	}

	return false;
}

export async function verifyToken(token: string) {
	try {
		const res = await axiosClassic({
			url: `${AUTH}/verify-token`,
			method: 'POST',
			data: JSON.stringify(token)
		});

		return res.data.isVerifyed;
	} catch (error) {
		console.error('Verify token:', error);
		return false;
	}
}

export async function refreshTokens(refreshToken: string) {
	try {
		const res = await axiosClassic({
			url: `${AUTH}/refresh-tokens`,
			method: 'POST',
			data: JSON.stringify(refreshToken)
		});

		if (res.data.user) {
			return true;
		}
		return false;
	} catch (error) {
		console.error('Refresh tokens:', error);
		return false;
	}
}

export function logout() {
	Cookies.remove(ACCESS_TOKEN);
	Cookies.remove(REFRESH_TOKEN);
	localStorage.removeItem('user');
}
