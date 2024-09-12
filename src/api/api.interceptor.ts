import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/jwt.constants';
import { refreshTokens } from '@/helpers/authHelpers';
import axios from 'axios';
import Cookies from 'js-cookie';
import { getContentType } from './api.helper';

const axiosOptions = {
	baseURL: process.env.API_URL,
	headers: getContentType()
};

export const axiosClassic = axios.create(axiosOptions);

export const instance = axios.create(axiosOptions);

//Добавление аксес-токена во все запросы
instance.interceptors.request.use(config => {
	const accessToken = Cookies.get(ACCESS_TOKEN);

	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	return config;
});

//Обработка ошибок и перевыпуск токенов при ответе с ошибкой
instance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config;

		if (
			error.response.status === 401 &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true;

			try {
				const refreshToken = Cookies.get(REFRESH_TOKEN);

				if (refreshToken) {
					await refreshTokens(refreshToken);
				}
				return instance.request(originalRequest);
			} catch (error) {
				console.log('Пользователь не авторизован!');
			}
		}

		throw error;
	}
);
