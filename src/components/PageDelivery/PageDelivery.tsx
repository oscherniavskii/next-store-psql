import { deliveryImage } from '@/assets/images';
import Image from 'next/image';
import { FC } from 'react';
import './pageDelivery.scss';

const PageDelivery: FC = () => {
	return (
		<div className='delivery-page'>
			<div className='delivery-page__content'>
				<h3 className='delivery-page__title'>Бесплатная доставка</h3>
				<p className='delivery-page__text'>
					Бесплатная доставка осуществляется в черте города (Город).
					Минимальная сумма заказа — 5000 вал. Заказы на сумму менее
					5000 вал доставляются платно. Доставка производится в
					течении дня с 10:00 до 20:00 (Заранее перед доставкой с Вами
					свяжется водитель и предупредит о выезде на ваш адрес).
				</p>
				<h3 className='delivery-page__title'>Подъем до двери</h3>
				<p className='delivery-page__text'>
					Подъем до двери — Бесплатный, при наличии и исправности
					лифта. В ином случае подъем 500 вал за каждый этаж.
				</p>
				<h3 className='delivery-page__title'>
					Доставка в пригородные зоны
				</h3>
				<p className='delivery-page__text'>
					Доставка в пригородные зоны. Стоимость доставки от 1000 вал
					(в зависимости от расстояния). Точную сумму Вы можете узнать
					у менеджера при оформлении Вашего заказа.
				</p>
				<h3 className='delivery-page__title'>
					Доставка по всем городам
				</h3>
				<p className='delivery-page__text'>
					Доставка по всем городам. Доставим Ваш заказ в любой город
					страны. Стоимость доставки рассчитывается индивидуально при
					оформлении заказа.
				</p>
			</div>
			<div className='delivery-page__cover'>
				<Image
					src={deliveryImage}
					alt='Store cover'
					width={800}
					height={533}
					priority
				/>
			</div>
		</div>
	);
};

export default PageDelivery;
