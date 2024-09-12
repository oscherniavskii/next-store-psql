'use client';

import { logo } from '@/assets/images';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useState } from 'react';
import './adminHeader.scss';

const AdminHeader: FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const pathName = usePathname();

	return (
		<header className='admin-header'>
			<div className='admin-header__container'>
				<div className='admin-header__inner'>
					<Link
						className='admin-header__logo'
						href='/'
						onClick={() => {
							setIsOpen(false);
							document.body.classList.remove('_lock');
						}}
					>
						<Image
							src={logo}
							width={2000}
							height={848}
							alt='Лого'
							priority
						/>
					</Link>
					<nav
						className={`admin-header__nav ${isOpen ? 'open' : ''}`}
					>
						<ul className='admin-header__list'>
							<li className='admin-header__item'>
								<Link
									href='/'
									onClick={() => {
										setIsOpen(false);
										document.body.classList.remove('_lock');
									}}
								>
									В магазин
								</Link>
							</li>
							<li
								className={`admin-header__item ${
									pathName === '/admin' ? 'active' : ''
								}`}
							>
								<Link
									href='/admin'
									onClick={() => {
										setIsOpen(false);
										document.body.classList.remove('_lock');
									}}
								>
									Админка
								</Link>
							</li>
							<li
								className={`admin-header__item ${
									pathName === '/admin/brands' ? 'active' : ''
								}`}
							>
								<Link
									href='/admin/brands'
									onClick={() => {
										setIsOpen(false);
										document.body.classList.remove('_lock');
									}}
								>
									Бренды
								</Link>
							</li>
							<li
								className={`admin-header__item ${
									pathName === '/admin/categories'
										? 'active'
										: ''
								}`}
							>
								<Link
									href='/admin/categories'
									onClick={() => {
										setIsOpen(false);
										document.body.classList.remove('_lock');
									}}
								>
									Категории
								</Link>
							</li>
							<li
								className={`admin-header__item ${
									pathName === '/admin/products'
										? 'active'
										: ''
								}`}
							>
								<Link
									href='/admin/products'
									onClick={() => {
										setIsOpen(false);
										document.body.classList.remove('_lock');
									}}
								>
									Товары
								</Link>
							</li>
							<li
								className={`admin-header__item ${
									pathName === '/admin/orders' ? 'active' : ''
								}`}
							>
								<Link
									href='/admin/orders'
									onClick={() => {
										setIsOpen(false);
										document.body.classList.remove('_lock');
									}}
								>
									Заказы
								</Link>
							</li>
							<li
								className={`admin-header__item ${
									pathName === '/admin/reviews'
										? 'active'
										: ''
								}`}
							>
								<Link
									href='/admin/reviews'
									onClick={() => {
										setIsOpen(false);
										document.body.classList.remove('_lock');
									}}
								>
									Отзывы
								</Link>
							</li>
							<li
								className={`admin-header__item ${
									pathName === '/admin/users' ? 'active' : ''
								}`}
							>
								<Link
									href='/admin/users'
									onClick={() => {
										setIsOpen(false);
										document.body.classList.remove('_lock');
									}}
								>
									Пользователи
								</Link>
							</li>
						</ul>
					</nav>
					<button
						className='admin-header__btn'
						type='button'
						onClick={() => {
							setIsOpen(!isOpen);
							if (document.body.classList.contains('_lock')) {
								document.body.classList.remove('_lock');
							} else {
								document.body.classList.add('_lock');
							}
						}}
					>
						<svg
							x='0px'
							y='0px'
							width='612px'
							height='612px'
							viewBox='0 0 612 612'
							enableBackground='new 0 0 612 612'
						>
							<path
								d='M535.5,0h-459C34.521,0,0,37.657,0,79.656v456.303C0,577.957,34.023,612,76.003,612H532c41.979,0,80-34.502,80-76.5v-459
				C612,34.501,577.479,0,535.5,0z M573.75,535.5c0,20.999-20.77,38.479-41.75,38.479H76.003c-20.98,0-38.001-17.021-38.001-38.021
				V79.656c0-21,17.519-41.406,38.499-41.406h459c20.98,0,38.25,17.251,38.25,38.25V535.5z M459,382.5H153
				c-10.557,0-19.125,8.568-19.125,19.125S142.443,420.75,153,420.75h306c10.557,0,19.125-8.568,19.125-19.125
				S469.557,382.5,459,382.5z M459,267.75H153c-10.557,0-19.125,8.568-19.125,19.125S142.443,306,153,306h306
				c10.557,0,19.125-8.568,19.125-19.125S469.557,267.75,459,267.75z M459,153H153c-10.557,0-19.125,8.568-19.125,19.125
				S142.443,191.25,153,191.25h306c10.557,0,19.125-8.568,19.125-19.125S469.557,153,459,153z'
							/>
						</svg>
					</button>
				</div>
			</div>
		</header>
	);
};

export default AdminHeader;
