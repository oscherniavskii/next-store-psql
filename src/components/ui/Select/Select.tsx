import { useState } from 'react';
import { ISelect } from './select.interface';
import './select.scss';

function Select<K>({ data, onChange, value, title }: ISelect<K>) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className='select'>
			<button onClick={() => setIsOpen(!isOpen)} className='select__btn'>
				{title && <b>{title}:</b>}
				{value?.label || 'Default'}
				<svg width='10px' height='5px' viewBox='0 0 10 5'>
					<g transform='translate(-223.000000, -368.000000)'>
						<g transform='translate(216.000000, 360.000000)'>
							<polygon
								fill='#000000'
								points='7 8 17 8 12 13'
							></polygon>
						</g>
					</g>
				</svg>
			</button>
			{isOpen && (
				<ul className='select__list'>
					{data.map(item => (
						<li
							key={item.key?.toString()}
							className={`select__item ${
								item.key === value?.key
									? 'select__item--active'
									: ''
							}`}
						>
							<button
								onClick={() => {
									onChange(item);
									setIsOpen(false);
								}}
								disabled={item.key === value?.key}
							>
								{item.label}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default Select;
