'use client';

import { logo } from '@/assets/images';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect } from 'react';
import useMedia from 'use-media';
import HeaderAccount from './HeaderAccount/HeaderAccount';
import HeaderCart from './HeaderCart/HeaderCart';
import HeaderFavorites from './HeaderFavorites/HeaderFavorites';
import Search from './Search/Search';
import './header.scss';

const Header: FC = () => {
	const isModile = useMedia({ maxWidth: '768px' });

	const headerFix = () => {
		const header = document.querySelector('.header');
		if (header) {
			if (window.scrollY > 45) {
				header.classList.add('scroll');
			} else {
				header.classList.remove('scroll');
			}
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', headerFix);
		return () => window.removeEventListener('scroll', headerFix);
	}, []);

	return (
		<header className='header'>
			<div className='header__top top-line'>
				<div className='top-line__container'>
					<div className='top-line__inner'>
						<div className='top-line__adress'>
							г.Город, ул.Улица, д. 125
						</div>
						<nav className='top-line__links'>
							<Link href={'/delivery'}>Доставка и оплата</Link>
							<Link href={'/about'}>О магазине</Link>
							<a
								href='tel:+1123123456789'
								className='top-line__tel'
							>
								+1 123 123456789
							</a>
						</nav>
					</div>
				</div>
			</div>
			<div className='header__main main-line'>
				<div className='main-line__container'>
					<div className='main-line__inner'>
						<div className='main-line__top'>
							<Link className='main-line__logo' href='/'>
								<Image
									src={logo}
									width={2000}
									height={848}
									alt='Лого'
									priority
								/>
							</Link>
							<nav className='main-line__nav'>
								{!isModile && (
									<>
										<Link
											className='main-line__catalog header-catalog'
											title='Каталог'
											href='/explorer?searchTerm='
										>
											<span>
												<svg
													width='24'
													height='24'
													viewBox='0 0 24 24'
													fill='none'
												>
													<path
														d='M4 3C3.44772 3 3 3.44772 3 4C3 4.55228 3.44772 5 4 5H20C20.5523 5 21 4.55228 21 4C21 3.44772 20.5523 3 20 3H4Z'
														fill='#FF8D1C'
													/>
													<path
														d='M4 8C3.44772 8 3 8.44772 3 9C3 9.55228 3.44772 10 4 10H14C14.5523 10 15 9.55228 15 9C15 8.44772 14.5523 8 14 8H4Z'
														fill='#FF8D1C'
													/>
													<path
														d='M3 14C3 13.4477 3.44772 13 4 13H20C20.5523 13 21 13.4477 21 14C21 14.5523 20.5523 15 20 15H4C3.44772 15 3 14.5523 3 14Z'
														fill='#FF8D1C'
													/>
													<path
														d='M4 18C3.44772 18 3 18.4477 3 19C3 19.5523 3.44772 20 4 20H14C14.5523 20 15 19.5523 15 19C15 18.4477 14.5523 18 14 18H4Z'
														fill='#FF8D1C'
													/>
												</svg>
											</span>
											Каталог
										</Link>
										<div className='main-line__search'>
											<Search />
										</div>
									</>
								)}
								<div className='main-line__item'>
									<HeaderFavorites />
								</div>
								<div className='main-line__item'>
									<HeaderCart />
								</div>
								<div className='main-line__item'>
									<HeaderAccount />
								</div>
							</nav>
						</div>
						{isModile && (
							<div className='main-line__bottom bottom-line'>
								<Link
									className='bottom-line__catalog header-catalog'
									href={'/explorer'}
									title='Каталог'
								>
									<span>
										<svg
											width='24'
											height='24'
											viewBox='0 0 24 24'
											fill='none'
										>
											<path
												d='M4 3C3.44772 3 3 3.44772 3 4C3 4.55228 3.44772 5 4 5H20C20.5523 5 21 4.55228 21 4C21 3.44772 20.5523 3 20 3H4Z'
												fill='#FF8D1C'
											/>
											<path
												d='M4 8C3.44772 8 3 8.44772 3 9C3 9.55228 3.44772 10 4 10H14C14.5523 10 15 9.55228 15 9C15 8.44772 14.5523 8 14 8H4Z'
												fill='#FF8D1C'
											/>
											<path
												d='M3 14C3 13.4477 3.44772 13 4 13H20C20.5523 13 21 13.4477 21 14C21 14.5523 20.5523 15 20 15H4C3.44772 15 3 14.5523 3 14Z'
												fill='#FF8D1C'
											/>
											<path
												d='M4 18C3.44772 18 3 18.4477 3 19C3 19.5523 3.44772 20 4 20H14C14.5523 20 15 19.5523 15 19C15 18.4477 14.5523 18 14 18H4Z'
												fill='#FF8D1C'
											/>
										</svg>
									</span>
									Каталог
								</Link>
								<div className='bottom-line__search'>
									<Search />
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
