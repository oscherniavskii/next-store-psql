import { aboutImage } from '@/assets/images';
import Image from 'next/image';
import { FC } from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import './pageAbout.scss';

const PageAbout: FC = () => {
	return (
		<div className='about-page'>
			<div className='about-page__main-section about-main-section'>
				<div className='about-main-section__content'>
					<p>
						Магазин электроники Next-Store — ваш надежный партнер в
						обновлении технологий для вашего дома! Мы сотрудничаем с
						ведущими производителями электроники по всему миру,
						предоставляя вам широкий выбор высококачественных
						товаров.
					</p>
					<p>
						В нашем ассортименте вы найдете современные гаджеты,
						бытовую технику и электронику последнего поколения. Мы
						гордимся тем, что предлагаем продукцию, изготовленную из
						передовых материалов с использованием инновационных
						технологий.
					</p>
					<p>
						Наши эксперты помогут вам выбрать идеальное решение для
						ваших потребностей. Самый важный критерий при выборе
						электроники — это ее надежность и функциональность.
						Поэтому мы рекомендуем вам ознакомиться с нашим
						ассортиментом, включающим в себя продукцию от ведущих
						брендов в индустрии.
					</p>
					<p>
						Обновляйте ваш дом с лучшей электроникой вместе с
						магазином <span>Next-Store!</span>
					</p>
				</div>
				<div className='about-main-section__cover'>
					<Image
						src={aboutImage}
						alt='Store cover'
						width={800}
						height={400}
						priority
					/>
				</div>
			</div>
			<div className='about-page__contact-section about-contact-section'>
				<SectionTitle>Наши контакты</SectionTitle>
				<div className='about-contact-section__content'>
					<div className='about-contact-section__block'>
						<div className='about-contact-section__title'>
							Телефоны:
						</div>
						<ul className='about-contact-section__list'>
							<li className='about-contact-section__item'>
								<a
									href='tel:+11231234567'
									className='about-contact-section__link'
								>
									+1 123 1234567
								</a>
							</li>
							<li className='about-contact-section__item'>
								<a
									href='tel:+1234567890'
									className='about-contact-section__link'
								>
									+1 234 5678900
								</a>
							</li>
						</ul>
					</div>
					<div className='about-contact-section__block'>
						<div className='about-contact-section__title'>
							Почта:
						</div>
						<ul className='about-contact-section__list'>
							<li className='about-contact-section__item'>
								<a
									href='mailto:mail01@mail.com'
									className='about-contact-section__link'
								>
									mail01@mail.com
								</a>
							</li>
							<li className='about-contact-section__item'>
								<a
									href='mailto:mail02@mail.com'
									className='about-contact-section__link'
								>
									mail02@mail.com
								</a>
							</li>
						</ul>
					</div>
					<div className='about-contact-section__block'>
						<div className='about-contact-section__title'>
							Социальные сети:
						</div>
						<ul className='about-contact-section__list'>
							<li className='about-contact-section__item'>
								<a
									href='#'
									target='_blank'
									className='about-contact-section__link'
								>
									Telegram
								</a>
							</li>
							<li className='about-contact-section__item'>
								<a
									href='#'
									target='_blank'
									className='about-contact-section__link'
								>
									Instagram
								</a>
							</li>
							<li className='about-contact-section__item'>
								<a
									href='#'
									target='_blank'
									className='about-contact-section__link'
								>
									WhatsApp
								</a>
							</li>
						</ul>
					</div>
					<div className='about-contact-section__block'>
						<div className='about-contact-section__title'>
							Адрес:
						</div>
						<p className='about-contact-section__text'>
							г.Город, ул.Улица, д. 125 г.Город, ул.Улица, д. 125
							г.Город, ул.Улица, д. 125
						</p>
					</div>
				</div>
			</div>
			<div className='about-page__map-section about-map-section'>
				<SectionTitle>Местоположение</SectionTitle>
				<div className='about-map-section__content'>
					<iframe
						src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11278.929319019415!2d168.66694171867886!3d-45.030358917292965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sua!4v1704978177412!5m2!1sru!2sua'
						allowFullScreen
						loading='lazy'
						referrerPolicy='no-referrer-when-downgrade'
					></iframe>
				</div>
			</div>
		</div>
	);
};

export default PageAbout;
