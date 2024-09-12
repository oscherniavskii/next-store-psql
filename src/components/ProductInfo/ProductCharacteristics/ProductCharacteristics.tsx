import type { FC } from 'react';
import './productCharacteristics.scss';

interface IProductCharacteristics {
	options: { char: string; value: string }[];
}

const ProductCharacteristics: FC<IProductCharacteristics> = ({ options }) => {
	return (
		<ul className='product-characteristics'>
			{options.map(option => (
				<li key={option.char} className='product-characteristics__item'>
					<span className='product-characteristics__title'>
						{option.char}
						{': '}
					</span>
					<span>{option.value}</span>
				</li>
			))}
		</ul>
	);
};

export default ProductCharacteristics;
