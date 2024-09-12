'use client';

import { axiosClassic } from '@/api/api.interceptor';
import Button from '@/components/ui/Button/Button';
import { useActions } from '@/hooks/useActions';
import { RegistrationFormData } from '@/types/auth.interface';
import { IAuthResponse } from '@/types/user.interface';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import './registerForm.scss';

const RegisterForm: FC = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
		reset
	} = useForm<RegistrationFormData>({
		defaultValues: {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			phone: '',
			deliveryAdress: '',
			confirmPassword: '',
			policy: false
		}
	});
	const router = useRouter();
	const { saveUser } = useActions();

	const onSubmit: SubmitHandler<RegistrationFormData> = async data => {
		await axiosClassic<IAuthResponse>({
			url: '/auth/register',
			method: 'POST',
			data: JSON.stringify(data)
		})
			.then(({ data }) => {
				localStorage.setItem('user', JSON.stringify(data.user));
				saveUser(data);
				reset();
				router.push('/');
			})
			.catch((errors: unknown) =>
				toast.error('Что-то пошло не так! Попробуйте еще раз!')
			)
			.finally(() => router.push('/'));
	};

	return (
		<div className='register'>
			<form onSubmit={handleSubmit(onSubmit)} className='register__form'>
				<h1 className='register__title'>{process.env.SITE_NAME}</h1>
				<p className='register__text'>
					регистрация нового пользователя
				</p>

				<div className='register__fields'>
					<div className='register__input'>
						<label>
							Имя <p>*</p>
						</label>
						<input
							{...register('firstName', {
								required: true,
								minLength: {
									value: 3,
									message: 'Минимально 3 символа!'
								}
							})}
						/>
						{errors.firstName?.type === 'required' && (
							<p role='alert'>Укажите имя</p>
						)}
						{errors.firstName && (
							<p role='alert'>{errors.firstName.message}</p>
						)}
					</div>

					<div className='register__input'>
						<label>
							Фамилия <p>*</p>
						</label>
						<input
							{...register('lastName', {
								required: true,
								minLength: {
									value: 3,
									message: 'Минимально 3 символа!'
								}
							})}
						/>
						{errors.lastName?.type === 'required' && (
							<p role='alert'>Укажите фамилию</p>
						)}
						{errors.lastName && (
							<p role='alert'>{errors.lastName.message}</p>
						)}
					</div>

					<div className='register__input'>
						<label>
							Почта <p>*</p>
						</label>
						<input
							type='email'
							{...register('email', {
								required: 'Адрес электронной почты обязателен!'
							})}
						/>
						{errors.email && (
							<p role='alert'>{errors.email.message}</p>
						)}
					</div>

					<div className='register__input'>
						<label>Телефон</label>
						<input {...register('phone')} />
					</div>

					<div className='register__input'>
						<label>
							Пароль <p>*</p>
						</label>
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

					<div className='register__input'>
						<label>
							Подтверждение пароля <p>*</p>
						</label>
						<input
							type='password'
							{...register('confirmPassword', {
								validate: (val: string) => {
									if (watch('password') != val) {
										return 'Пароли не совпадают!';
									}
								}
							})}
						/>
						{errors.confirmPassword && (
							<p role='alert'>{errors.confirmPassword.message}</p>
						)}
					</div>

					<div className='register__input register__input--adress'>
						<label>Адрес доставки</label>
						<input {...register('deliveryAdress')} />
					</div>

					<div className='register__input register__input--checkbox'>
						<span>
							<input
								id='checkbox'
								type='checkbox'
								{...register('policy', {
									required: 'Согласие обязательно!'
								})}
							/>
							<label htmlFor='checkbox'>
								Даю согласие на обработку моих персональных
								данных в соответствии с{' '}
								<Link href='/policy'>
									Политикой конфиденциальности.
								</Link>
								<p>*</p>
							</label>
						</span>
						{errors.policy && (
							<p role='alert'>{errors.policy.message}</p>
						)}
					</div>
				</div>

				<div className='register__required'>
					<p>*</p> - обязательные поля
				</div>

				<div className='register__actions'>
					<Button>Зарегистрироваться</Button>

					<p className='register__description'>
						Есть аккаунт?{' '}
						<Link href={'/login'} className='register__link'>
							Войдите
						</Link>
					</p>

					<Link href={'/'} className='register__link'>
						Перейти в магазин
					</Link>
				</div>
			</form>
		</div>
	);
};

export default RegisterForm;
