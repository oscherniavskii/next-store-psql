'use client';

import { instance } from '@/api/api.interceptor';
import { useAuth } from '@/hooks/useAuth';
import { ChangePasswordFormData } from '@/types/auth.interface';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ListLoader from '../loaders/ListLoader/ListLoader';
import Button from '../ui/Button/Button';
import './passwordChange.scss';

const PasswordChange: FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useAuth();

	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
		reset
	} = useForm<ChangePasswordFormData>({
		defaultValues: {
			oldPassword: '',
			newPassword: '',
			confirmNewPassword: ''
		}
	});

	const onSubmit: SubmitHandler<ChangePasswordFormData> = async data => {
		setIsLoading(true);
		await instance<{ status: string }>({
			url: '/auth/change-pass',
			method: 'Post',
			data: JSON.stringify(data)
		})
			.then(({ data }) => {
				if (data.status === 'ok') {
					toast.success('Пароль успешно изменен!');
				}
				if (data.status === 'error') {
					toast.error('Старый пароль введен неверно!');
				}
			})
			.catch((errors: unknown) =>
				toast.error('Что-то пошло не так! Попробуйте еще раз!')
			)
			.finally(() => {
				reset();
				setIsLoading(false);
			});
	};

	return (
		<div className='change-pass'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='change-pass__form'
			>
				<div className='change-pass__fields'>
					<div className='change-pass__input'>
						<label>Старый пароль</label>
						<input
							disabled={!user?.isActivate}
							type='password'
							{...register('oldPassword', {
								required: 'Введите пароль!',
								minLength: {
									value: 8,
									message: 'Минимальный пароль - 8 символов!'
								}
							})}
						/>
						{errors.oldPassword && (
							<p role='alert'>{errors.oldPassword.message}</p>
						)}
					</div>

					<div className='change-pass__input'>
						<label>Новый пароль</label>
						<input
							disabled={!user?.isActivate}
							type='password'
							{...register('newPassword', {
								required: 'Введите пароль!',
								minLength: {
									value: 8,
									message: 'Минимальный пароль - 8 символов!'
								}
							})}
						/>
						{errors.newPassword && (
							<p role='alert'>{errors.newPassword.message}</p>
						)}
					</div>

					<div className='change-pass__input'>
						<label>Подтверждение нового пароля</label>
						<input
							disabled={!user?.isActivate}
							type='password'
							{...register('confirmNewPassword', {
								validate: (val: string) => {
									if (watch('newPassword') != val) {
										return 'Пароли не совпадают!';
									}
								}
							})}
						/>
						{errors.confirmNewPassword && (
							<p role='alert'>
								{errors.confirmNewPassword.message}
							</p>
						)}
					</div>
				</div>

				<div className='change-pass__actions'>
					{user?.isActivate && <Button>Сохранить</Button>}
				</div>
			</form>
			{!user?.isActivate && (
				<p className='change-pass__activate error'>
					*Для смены пароля подтвердите Вашу электронную почту!
				</p>
			)}
			{isLoading && (
				<div className='change-pass__loader'>
					<ListLoader />
				</div>
			)}
		</div>
	);
};

export default PasswordChange;
