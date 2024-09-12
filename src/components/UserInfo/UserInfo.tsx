'use client';

import { instance } from '@/api/api.interceptor';
import { deleteProfile } from '@/helpers/userHelpers';
import { useActions } from '@/hooks/useActions';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { RegistrationFormData } from '@/types/auth.interface';
import { IAuthResponse } from '@/types/user.interface';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import SectionTitle from '../SectionTitle/SectionTitle';
import InfinityLoader from '../loaders/InfinityLoader/InfinityLoader';
import ListLoader from '../loaders/ListLoader/ListLoader';
import Button from '../ui/Button/Button';

import { logout } from '@/helpers/authHelpers';
import './userInfo.scss';

const UserInfo: FC = () => {
	const { profile } = useProfile();
	const { user } = useAuth();
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const router = useRouter();

	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue
	} = useForm<RegistrationFormData>();
	const { saveUser, removeUser } = useActions();

	useEffect(() => {
		if (profile) {
			setValue('firstName', profile?.firstName);
			setValue('lastName', profile?.lastName);
			setValue('phone', profile?.phone);
			setValue('deliveryAdress', profile?.deliveryAdress);
		}
	}, [profile]);

	const onSubmit: SubmitHandler<RegistrationFormData> = async data => {
		setIsLoading(true);
		await instance<IAuthResponse>({
			url: '/users/profile',
			method: 'PUT',
			data: JSON.stringify(data)
		})
			.then(({ data }) => {
				localStorage.setItem('user', JSON.stringify(data.user));
				saveUser(data);
			})
			.catch((errors: unknown) =>
				toast.error('Что-то пошло не так! Попробуйте еще раз!')
			)
			.finally(() => {
				setIsEdit(false);
				setIsLoading(false);
			});
	};

	const onResendEmail = async () => {
		setIsLoading(true);
		await instance<{ status: string }>({
			url: '/auth/resend-email'
		})
			.then(({ data }) => {
				if (data.status === 'ok') {
					toast.success('Ссылка успешно отправлена!');
				}
			})
			.catch((errors: unknown) =>
				toast.error('Что-то пошло не так! Попробуйте еще раз!')
			)
			.finally(() => {
				setIsLoading(false);
			});
	};

	const onHandleDelete = async () => {
		setIsDeleting(true);

		if (user?.id)
			await deleteProfile(user.id)
				.then(res => {
					res && toast.success('Ваш профиль успешно удален!');
					logout();
					removeUser();
					setIsDeleteOpen(false);
					router.replace(`/`);
				})
				.catch(e =>
					toast.error('Что-то пошло не так! Попробуйте еще раз!')
				)
				.finally(() => setIsDeleting(false));
	};

	return (
		<div className='user-info'>
			<form onSubmit={handleSubmit(onSubmit)} className='user-info__form'>
				<div className='user-info__block'>
					<span className='user-info__title'>Электронная почта:</span>
					<span className='user-info__value'>{profile?.email}</span>
				</div>
				<div className='user-info__block'>
					<span className='user-info__title'>Статус профиля:</span>
					<span
						className={`user-info__value ${
							!user?.isActivate && 'error'
						}`}
					>
						{user?.isActivate ? 'Активный' : 'Email не подтвержден'}
					</span>
					{!user?.isActivate && (
						<span
							className='user-info__repeat'
							role='button'
							onClick={onResendEmail}
						>
							Отправить ссылку повторно
						</span>
					)}
				</div>
				<div className='user-info__fields'>
					<div
						className={`user-info__input ${
							isEdit ? 'user-info__input--edit' : ''
						}`}
					>
						<label>Имя: </label>
						<input
							disabled={!user?.isActivate || !isEdit}
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

					<div
						className={`user-info__input ${
							isEdit ? 'user-info__input--edit' : ''
						}`}
					>
						<label>Фамилия: </label>
						<input
							disabled={!user?.isActivate || !isEdit}
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

					<div
						className={`user-info__input ${
							isEdit ? 'user-info__input--edit' : ''
						}`}
					>
						<label>Телефон: </label>
						<input
							disabled={!user?.isActivate || !isEdit}
							{...register('phone')}
						/>
					</div>

					<div
						className={`user-info__input ${
							isEdit ? 'user-info__input--edit' : ''
						}`}
					>
						<label>Адрес доставки: </label>
						<input
							disabled={!user?.isActivate || !isEdit}
							{...register('deliveryAdress')}
						/>
					</div>
				</div>

				<div className='user-info__actions'>
					{user?.isActivate && isEdit && (
						<>
							<Button>Сохранить</Button>
							<span
								className='user-info__abort'
								onClick={() => {
									setIsEdit(false);
									if (profile) {
										setValue(
											'firstName',
											profile?.firstName
										);
										setValue('lastName', profile?.lastName);
										setValue('phone', profile?.phone);
										setValue(
											'deliveryAdress',
											profile?.deliveryAdress
										);
									}
								}}
								role='button'
							>
								Отмена
							</span>
						</>
					)}
				</div>
			</form>
			{user?.isActivate && !isEdit && (
				<Button onClick={() => setIsEdit(true)} type='button'>
					Изменить данные
				</Button>
			)}
			{!user?.isActivate && (
				<p className='user-info__activate error'>
					*Для редактирования данных профиля подтвердите Вашу
					электронную почту!
				</p>
			)}
			{isLoading && (
				<div className='user-info__loader'>
					<ListLoader />
				</div>
			)}
			<div className='user-info__delete user-delete'>
				<SectionTitle>Удаление профиля</SectionTitle>

				{user?.id === 1 ? (
					<div className='user-delete__empty'>
						Удаление профиля для главного администратора не доступно
						в целях безопасности функционирования сайта!!!
					</div>
				) : (
					<>
						<div className='user-delete__inner'>
							<div className='user-delete__text'>
								<p>
									<span>ВНИМАНИЕ!!! </span>Удаление профиля
									невозможно отменить! Если снова захотите
									воспользоваться нашими услугами, Вам
									прийдется заново пройти процедуру
									регистрации и подтверждения электронной
									почты!
								</p>
								<p>
									Если Вы совершали покупки, Ваши имя, фамилия
									и адрес электронной почты сохранятся в
									данных заказа до истечения срока хранения!
								</p>
							</div>
							<div className='user-delete__actions'>
								<button
									className='user-delete__btn'
									onClick={() => setIsDeleteOpen(true)}
								>
									Удалить профиль
								</button>
							</div>
						</div>
						<div
							className={`user-delete__message user-delete-message ${
								isDeleteOpen ? 'open' : ''
							}`}
						>
							<div
								className='user-delete-message__overlay'
								onClick={() => setIsDeleteOpen(false)}
							></div>
							<div className='user-delete-message__inner'>
								<div className='user-delete-message__window'>
									{isDeleting ? (
										<div className='user-delete-message__loader'>
											<InfinityLoader />
										</div>
									) : (
										<>
											<h4 className='user-delete-message__title'>
												Вы действительно хотите удалить
												данные Вашего профиля!
											</h4>
											<div className='user-delete-message__actions'>
												<button
													className='user-delete-message__btn'
													onClick={() =>
														setIsDeleteOpen(false)
													}
												>
													Отмена
												</button>
												<button
													className='user-delete-message__btn'
													onClick={onHandleDelete}
												>
													Удалить
												</button>
											</div>
										</>
									)}
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default UserInfo;
