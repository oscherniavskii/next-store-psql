'use client';

import type { FC } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { axiosClassic } from '@/api/api.interceptor';
import Button from '@/components/ui/Button/Button';
import { useActions } from '@/hooks/useActions';
import { LoginFormData } from '@/types/auth.interface';
import { IAuthResponse } from '@/types/user.interface';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import './loginForm.scss';

const LoginForm: FC = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm<LoginFormData>({
		defaultValues: {
			email: '',
			password: ''
		}
	});
	const router = useRouter();
	const { saveUser } = useActions();

	const onSubmit: SubmitHandler<LoginFormData> = async data => {
		await axiosClassic<IAuthResponse>({
			url: '/auth/login',
			method: 'POST',
			data: JSON.stringify(data)
		})
			.then(({ data }) => {
				localStorage.setItem('user', JSON.stringify(data.user));
				saveUser(data);
				reset();
				router.push('/');
			})
			.catch((error: unknown) =>
				toast.error('Ошибка авторизации. Проверьте введенные данные!')
			)
			.finally(() => {});
	};

	return (
		<div className='login'>
			<form onSubmit={handleSubmit(onSubmit)} className='login__form'>
				<h1 className='login__title'>{process.env.SITE_NAME}</h1>
				<p className='login__text'>вход в учетную запись</p>

				<div className='login__input'>
					<label>Почта</label>
					<input
						type='email'
						{...register('email', {
							required: 'Адрес электронной почты обязателен!'
						})}
					/>
					{errors.email && <p role='alert'>{errors.email.message}</p>}
				</div>

				<div className='login__input'>
					<label>Пароль</label>
					<input
						type='password'
						{...register('password', {
							required: 'Введите пароль!',
							minLength: {
								value: 8,
								message: 'Минимальный пароль - 8 символов!'
							}
						})}
					/>
					{errors.password && (
						<p role='alert'>{errors.password.message}</p>
					)}
				</div>

				<div className='login__actions'>
					<Button>Войти</Button>

					<p className='login__description'>
						Еще нет аккаунта?{' '}
						<Link href={'/register'} className='login__link'>
							Зарегистрируйтесь
						</Link>
					</p>

					<Link href={'/'} className='login__link'>
						Перейти в магазин
					</Link>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
