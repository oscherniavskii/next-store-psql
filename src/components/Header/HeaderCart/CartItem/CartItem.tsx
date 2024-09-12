import { ICartItem } from '@/types/cart.interface';
import { priceConvert } from '@/utils/price-format';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Dispatch, FC, SetStateAction } from 'react';
import CartActions from './CartActions/CartActions';
import './cartItem.scss';

interface ICartItemProps {
	item: ICartItem;
	setShow: Dispatch<SetStateAction<boolean>>;
}

const CartItem: FC<ICartItemProps> = ({ item, setShow }) => {
	const cover = JSON.parse(item.product.images)[0];
	const router = useRouter();

	const onClick = () => {
		setShow(false);
		router.push(`/product/${item.product.slug}`);
	};

	return (
		<div className='cart-item'>
			<button className='cart-item__icon' onClick={onClick}>
				<Image
					src={cover}
					width={100}
					height={100}
					alt={item.product.name}
				/>
			</button>

			<div className='cart-item__content'>
				<button className='cart-item__name' onClick={onClick}>
					{item.product.name}
				</button>
				<div className='cart-item__price'>
					{priceConvert(item.product.price * item.quantity)}
				</div>
				<CartActions item={item} />
			</div>
		</div>
	);
};

export default CartItem;
