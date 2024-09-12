'use client';

import { useProfile } from '@/hooks/useProfile';
import Link from 'next/link';
import { FC } from 'react';
import './headerFavorites.scss';

const HeaderFavorites: FC = () => {
	const { profile } = useProfile();
	const favoritesLength = profile?.favorites.length;

	return (
		<Link href='/favorites' title='Избранное' className='header-favorites'>
			<div className='header-favorites__icon'>
				<svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
					<g>
						<path
							id='Vector'
							d='M16.95 2C15.036 2 13.199 2.88283 12 4.27248C10.801 2.88283 8.964 2 7.05 2C3.6565 2 1 4.63215 1 7.99455C1 12.109 4.74 15.4714 10.405 20.5668L12 22L13.595 20.5668C19.26 15.4714 23 12.109 23 7.99455C23 4.63215 20.3435 2 16.95 2ZM12.1155 18.9537L12 19.0572L11.8845 18.9537C6.654 14.2507 3.2 11.1444 3.2 7.99455C3.2 5.82016 4.8555 4.17984 7.05 4.17984C8.744 4.17984 10.394 5.26431 10.9715 6.75204H13.023C13.606 5.26431 15.256 4.17984 16.95 4.17984C19.1445 4.17984 20.8 5.82016 20.8 7.99455C20.8 11.1444 17.346 14.2507 12.1155 18.9537Z'
							fill='white'
						/>
					</g>
				</svg>
				<span className='header-favorites__count'>
					{profile?.favorites.length ? favoritesLength : '0'}
				</span>
			</div>
			<span className='header-favorites__text'>Избранное</span>
		</Link>
	);
};

export default HeaderFavorites;
