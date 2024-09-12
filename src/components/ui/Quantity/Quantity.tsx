import type { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';

import './quantity.scss';

interface IQuantity {
	count: number;
	setCount: Dispatch<SetStateAction<number>>;
	disabled?: boolean;
}

const Quantity: FC<IQuantity> = ({ count, setCount, disabled }) => {
	const onPlusClick = () => {
		setCount((prev: number) => prev + 1);
	};

	const onMinusClick = () => {
		if (count > 1) {
			setCount((prev: number) => prev - 1);
		}
	};

	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setCount(+e.target.value);
	};

	return (
		<div className='quantity'>
			<button
				className='quantity__btn quantity__btn--minus'
				onClick={onMinusClick}
				disabled={disabled}
			>
				-
			</button>
			<input
				className='quantity__input'
				type='number'
				value={count}
				onChange={onChangeInput}
				disabled={disabled}
			/>
			<button
				className='quantity__btn quantity__btn--plus'
				onClick={onPlusClick}
				disabled={disabled}
			>
				+
			</button>
		</div>
	);
};

export default Quantity;
