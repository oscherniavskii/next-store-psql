import { FC } from 'react';

import { insta, logo, telegram, wp } from '@/assets/images';
import Image from 'next/image';
import Link from 'next/link';
import ToAdminLink from './ToAdminLink/ToAdminLink';
import './footer.scss';

const Footer: FC = () => {
	return (
		<div className='footer'>
			<div className='footer__container'>
				<div className='footer__inner'>
					<div className='footer__head'>
						<Link className='footer__logo' href='/'>
							<Image
								src={logo}
								width={2000}
								height={848}
								alt='Лого'
							/>
						</Link>
						<p className='footer__descr'>
							Магазин электроники Next-Store — ваш надежный
							партнер в обновлении технологий для вашего дома!
						</p>
					</div>
					<div className='footer__nav'>
						<div className='footer__column'>
							<h3 className='footer__title'>Контактный номер:</h3>
							<a href='tel:+12345678900' className='footer__link'>
								+1 234 567 89 00
							</a>
							<h3 className='footer__title'>Адрес:</h3>
							<p className='footer__text'>
								г.Город, ул.Улица, д. 125
							</p>
							<h3 className='footer__title'>Время работы:</h3>
							<p className='footer__text'>
								Ежедневно, с 09:00 до 21:00
							</p>
							<h3 className='footer__title'>
								Мы в социальных сетях:
							</h3>
							<div className='footer__social footer-social'>
								<div className='footer-social__item'>
									<a className='footer-social__icon' href='#'>
										<Image
											src={wp}
											width={24}
											height={24}
											alt='Социальная сеть'
										/>
									</a>
								</div>
								<div className='footer-social__item'>
									<a className='footer-social__icon' href='#'>
										<Image
											src={insta}
											width={24}
											height={24}
											alt='Социальная сеть'
										/>
									</a>
								</div>
								<div className='footer-social__item'>
									<a className='footer-social__icon' href='#'>
										<Image
											src={telegram}
											width={24}
											height={24}
											alt='Социальная сеть'
										/>
									</a>
								</div>
							</div>
						</div>
						<nav className='footer__column'>
							<h3 className='footer__title'>
								Популярные категории
							</h3>
							<Link
								className='footer__link'
								href='/explorer?searchTerm=&categoryId=1'
							>
								Смартфоны
							</Link>
							<Link
								className='footer__link'
								href='/explorer?searchTerm=&categoryId=12'
							>
								Мониторы
							</Link>
							<Link
								className='footer__link'
								href='/explorer?searchTerm=&categoryId=7'
							>
								Телевизоры
							</Link>
							<Link
								className='footer__link'
								href='/explorer?searchTerm=&categoryId=5'
							>
								Компьютеры
							</Link>
							<Link
								className='footer__link'
								href='/explorer?searchTerm=&categoryId=3'
							>
								Наушники
							</Link>
							<Link
								className='footer__link'
								href='/explorer?searchTerm=&categoryId=20'
							>
								ТВ и аудио
							</Link>
							<Link
								className='footer__link'
								href='/explorer?searchTerm=&categoryId=10'
							>
								Умный дом
							</Link>
						</nav>
						<nav className='footer__column'>
							<h3 className='footer__title'>Информация</h3>
							<Link className='footer__link' href='/about'>
								О магазине
							</Link>
							<Link className='footer__link' href='/delivery'>
								Доставка и оплата
							</Link>
							<Link className='footer__link' href='/policy'>
								Политика конфиденциальности
							</Link>
							<Link className='footer__link' href='/rules'>
								Условия использования
							</Link>
							<ToAdminLink />
						</nav>
					</div>
				</div>
				<div className='footer__bottom-line'>
					<div className='footer__copy'>Next-Store.site</div>
					<div className='footer__year'>© 2024</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
