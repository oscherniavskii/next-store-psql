import type { FC, PropsWithChildren } from 'react';
import './checkbox.scss';

interface ICheckbox {
	isChecked: boolean;
	onClick: () => void;
}

const Checkbox: FC<PropsWithChildren<ICheckbox>> = ({
	isChecked,
	onClick,
	children
}) => {
	return (
		<button className='checkbox' onClick={onClick}>
			<span
				className={`checkbox__inner ${
					isChecked && 'checkbox__inner--active'
				}`}
			/>
			<span className='checkbox__label'>{children}</span>
		</button>
	);
};

export default Checkbox;
