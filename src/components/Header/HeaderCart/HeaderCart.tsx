'use client';

import { useCart } from '@/hooks/useCart';
import { useOutside } from '@/hooks/useOutside';
import { priceConvert } from '@/utils/price-format';
import Link from 'next/link';
import { type FC } from 'react';
import CartItem from './CartItem/CartItem';
import './headerCart.scss';

const HeaderCart: FC = () => {
	const { isShow, setIsShow, ref } = useOutside(false);
	const { items, total } = useCart();

	return (
		<div className='header-cart' ref={ref}>
			<button
				className='header-cart__button cart-btn'
				onClick={() => {
					setIsShow(!isShow);
				}}
				title='Корзина'
			>
				<span className='cart-btn__icon'>
					<svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M3.60006 2.70006C3.15823 2.36869 2.53143 2.45823 2.20006 2.90006C1.86869 3.34189 1.95823 3.96869 2.40006 4.30006L4.10781 5.58087L6.84679 17.4498C7.0562 18.3572 7.86426 19.0001 8.79557 19.0001H17.5001C18.0523 19.0001 18.5001 18.5523 18.5001 18.0001C18.5001 17.4478 18.0523 17.0001 17.5001 17.0001L8.79557 17.0001L8.53605 15.8755L15.8487 15.2661C18.2049 15.0697 20.1016 13.2497 20.3948 10.9035L20.8518 7.24807C21.001 6.05436 20.0702 5 18.8672 5H6.0216C5.89844 4.59417 5.64897 4.23674 5.30781 3.98087L3.60006 2.70006ZM6.48787 7L8.08165 13.9064L15.6826 13.273C17.0964 13.1552 18.2343 12.0632 18.4103 10.6555L18.8672 7H6.48787Z'
							fill='white'
						/>
						<path
							d='M10 21C10 21.5523 9.55228 22 9 22C8.44772 22 8 21.5523 8 21C8 20.4477 8.44772 20 9 20C9.55228 20 10 20.4477 10 21Z'
							fill='white'
						/>
						<path
							d='M16 22C16.5523 22 17 21.5523 17 21C17 20.4477 16.5523 20 16 20C15.4477 20 15 20.4477 15 21C15 21.5523 15.4477 22 16 22Z'
							fill='white'
						/>
					</svg>
					<span className='cart-btn__count'>{items.length}</span>
				</span>
				<span className='cart-btn__text'>Корзина</span>
			</button>

			<div
				className={`header-cart__menu cart-menu ${
					isShow ? 'open-menu' : 'close-menu'
				}`}
			>
				<div className='cart-menu__title'>Моя Корзина</div>
				{items.length ? (
					<div className='cart-menu__list'>
						{items.map(item => (
							<CartItem
								item={item}
								key={item.product.name}
								setShow={setIsShow}
							/>
						))}
					</div>
				) : (
					<div className='cart-menu__empty'>Корзина пуста!</div>
				)}

				{!!items.length && (
					<>
						<div className='cart-menu__total'>
							<div className='cart-menu__name'>Итог:</div>
							<div className='cart-menu__value'>
								{priceConvert(total)}
							</div>
						</div>

						<div className='cart-menu__action'>
							<Link
								className='cart-menu__link'
								href='/checkout'
								onClick={() => setIsShow(false)}
							>
								Перейти к оформлению
							</Link>
						</div>
					</>
				)}
				<button
					className='cart-menu__close'
					onClick={() => setIsShow(false)}
				>
					<svg viewBox='0 0 32 32'>
						<line
							x1='7'
							x2='25'
							y1='7'
							y2='25'
							fill='none'
							stroke='#fff'
							strokeWidth='3px'
						/>
						<line
							x1='7'
							x2='25'
							y1='25'
							y2='7'
							fill='none'
							stroke='#fff'
							strokeWidth='3px'
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default HeaderCart;
