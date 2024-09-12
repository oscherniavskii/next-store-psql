'use client';

import { logout } from '@/helpers/authHelpers';
import { useActions } from '@/hooks/useActions';
import { useAuth } from '@/hooks/useAuth';
import { useOutside } from '@/hooks/useOutside';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type FC } from 'react';
import './headerAccount.scss';

const HeaderAccount: FC = () => {
	const { isShow, setIsShow, ref } = useOutside(false);
	const { user } = useAuth();
	const router = useRouter();
	const { removeUser } = useActions();

	const handleLogout = () => {
		logout();
		removeUser();
		setIsShow(false);
		router.replace(`/`);
	};

	if (!user) {
		return (
			<Link className='acc-btn' title='Вход' href='/login'>
				<span className='acc-btn__icon'>
					<svg viewBox='0 0 24 24'>
						<path d='M23.673,10.26l-11-10a1,1,0,0,0-1.346,0l-11,10A1,1,0,0,0,1,12H3V23a1,1,0,0,0,1,1H20a1,1,0,0,0,1-1V12h2a1,1,0,0,0,.673-1.74ZM10,22V18h4v4ZM20,10a1,1,0,0,0-1,1V22H16V18a2,2,0,0,0-2-2H10a2,2,0,0,0-2,2v4H5V11a1,1,0,0,0-1-1H3.587L12,2.352,20.413,10Z' />
						<path d='M9,11a3,3,0,1,0,3-3A3,3,0,0,0,9,11Zm4,0a1,1,0,1,1-1-1A1,1,0,0,1,13,11Z' />
					</svg>
				</span>
				<span className='acc-btn__text'>Вход</span>
			</Link>
		);
	}

	return (
		<div className='header-acc' ref={ref}>
			<button
				className='header-acc__button acc-btn'
				onClick={() => {
					setIsShow(!isShow);
				}}
				title='Кабинет'
			>
				<span className='acc-btn__icon'>
					<svg viewBox='0 0 24 24'>
						<path d='M23.673,10.26l-11-10a1,1,0,0,0-1.346,0l-11,10A1,1,0,0,0,1,12H3V23a1,1,0,0,0,1,1H20a1,1,0,0,0,1-1V12h2a1,1,0,0,0,.673-1.74ZM10,22V18h4v4ZM20,10a1,1,0,0,0-1,1V22H16V18a2,2,0,0,0-2-2H10a2,2,0,0,0-2,2v4H5V11a1,1,0,0,0-1-1H3.587L12,2.352,20.413,10Z' />
						<path d='M9,11a3,3,0,1,0,3-3A3,3,0,0,0,9,11Zm4,0a1,1,0,1,1-1-1A1,1,0,0,1,13,11Z' />
					</svg>
				</span>
				<span className='acc-btn__text'>Кабинет</span>
			</button>

			<div
				className={`header-acc__menu ${
					isShow ? 'open-menu' : 'close-menu'
				}`}
			>
				<div className='header-acc__item'>
					<Link href='/user-orders' onClick={() => setIsShow(false)}>
						История покупок
					</Link>
				</div>
				<div className='header-acc__item'>
					<Link href='/user-info' onClick={() => setIsShow(false)}>
						Информация профиля
					</Link>
				</div>
				<div className='header-acc__item'>
					<Link
						href='/password-change'
						onClick={() => setIsShow(false)}
					>
						Смена пароля
					</Link>
				</div>
				<div className='header-acc__item'>
					<button type='button' onClick={handleLogout}>
						Выход
					</button>
				</div>
			</div>
		</div>
	);
};

export default HeaderAccount;
