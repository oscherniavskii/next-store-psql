import { useActions } from '@/hooks/useActions';
import { useCart } from '@/hooks/useCart';
import { IProduct } from '@/types/product.interface';
import { FC } from 'react';
import './addToCartButton.scss';

const AddToCartButton: FC<{ product: IProduct }> = ({ product }) => {
	const { addToCart, removeFromCart } = useActions();
	const { items } = useCart();

	const currentElement = items.find(
		cartItem => cartItem.product.id === product.id
	);

	//Для исправления ошибки сериализации в Redux с redux-persist
	//Заменяем объект даты на строку
	let productForCart: IProduct;

	if (product.createAt) {
		productForCart = {
			...product,
			createAt: (product.createAt as Date).toString(),
			reviews: product.reviews.map(review => ({
				...review,
				createAt: (review.createAt as Date).toString()
			}))
		};
	} else {
		productForCart = product;
	}

	return (
		<div className='add-cart-btn'>
			<button
				className='add-cart-btn__btn'
				onClick={() =>
					currentElement
						? removeFromCart({ id: currentElement.id })
						: addToCart({
								product: productForCart,
								quantity: 1,
								price: product.price
						  })
				}
				title={
					currentElement ? 'Удалить из корзины' : 'Добавить в корзину'
				}
			>
				{currentElement ? (
					<svg
						className='add-cart-btn__added'
						width='16'
						height='16'
						fill='currentColor'
						viewBox='0 0 16 16'
					>
						<path d='M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z' />
					</svg>
				) : (
					<svg
						width='16'
						height='16'
						fill='currentColor'
						viewBox='0 0 16 16'
					>
						<path d='M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z' />
					</svg>
				)}
			</button>
		</div>
	);
};

export default AddToCartButton;
