'use client';
import type { FC } from 'react';
import { useEffect } from 'react';
import { initSlider } from './swiper';

import { logo } from '@/assets/images';
import Button from '@/components/ui/Button/Button';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './mainSection.scss';
import { sliderData } from './sliderData';

const MainSection: FC = () => {
	const data = sliderData;
	useEffect(() => {
		initSlider(`.main-slider`);
	}, []);

	const slidesContent = data.map((item, i) => (
		<div className='main-slider__slide main-slide swiper-slide' key={i}>
			<div className='main-slide__image'>
				<Image
					src={item.cover}
					alt='Slider image'
					width={1250}
					height={500}
					priority
				/>
			</div>
			<div className='main-slide__content'>
				<p className='main-slide__text'>{item.text}</p>
				<Button variant='link' href={item.link}>
					{item.button}
				</Button>
			</div>
			<div className='main-slide__logo'>
				<Image
					src={logo}
					width={2000}
					height={848}
					alt='Лого'
					priority
				/>
			</div>
		</div>
	));

	return (
		<div className='main-section'>
			<div className='main-section__container'>
				<div className='main-section__slider main-slider swiper'>
					<div className='main-slider__wrapper swiper-wrapper'>
						{slidesContent}
					</div>
					<div className='main-slider__pagination swiper-pagination'></div>
					<div className='main-slider__btn main-slider__btn--prev swiper-button-prev'></div>
					<div className='main-slider__btn main-slider__btn--next swiper-button-next'></div>
				</div>
			</div>
		</div>
	);
};

export default MainSection;
