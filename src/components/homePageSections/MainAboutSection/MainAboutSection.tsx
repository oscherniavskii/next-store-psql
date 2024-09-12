import { aboutImage } from '@/assets/images';
import Button from '@/components/ui/Button/Button';
import Image from 'next/image';
import { FC } from 'react';
import './mainAboutSection.scss';

const MainAboutSection: FC = () => {
	return (
		<div className='main-about-section'>
			<div className='main-about-section__content'>
				<p>
					Магазин электроники Next-Store — ваш надежный партнер в
					обновлении технологий для вашего дома! Мы сотрудничаем с
					ведущими производителями электроники по всему миру,
					предоставляя вам широкий выбор высококачественных товаров.
				</p>
				<p>
					В нашем ассортименте вы найдете современные гаджеты, бытовую
					технику и электронику последнего поколения. Мы гордимся тем,
					что предлагаем продукцию, изготовленную из передовых
					материалов с использованием инновационных технологий.
				</p>
				<p>
					Наши эксперты помогут вам выбрать идеальное решение для
					ваших потребностей. Самый важный критерий при выборе
					электроники — это ее надежность и функциональность. Поэтому
					мы рекомендуем вам ознакомиться с нашим ассортиментом,
					включающим в себя продукцию от ведущих брендов в индустрии.
				</p>
				<p>
					Обновляйте ваш дом с лучшей электроникой вместе с магазином{' '}
					<span>Next-Store!</span>
				</p>
				<div className='main-about-section__btn'>
					<Button href='/about' variant='link'>
						Подробнее
					</Button>
				</div>
			</div>
			<div className='main-about-section__cover'>
				<Image
					src={aboutImage}
					alt='Store cover'
					width={800}
					height={400}
				/>
			</div>
		</div>
	);
};

export default MainAboutSection;
