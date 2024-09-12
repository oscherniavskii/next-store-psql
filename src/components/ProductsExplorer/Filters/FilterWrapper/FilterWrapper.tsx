import { FC, PropsWithChildren } from 'react';
import './filterWrapper.scss';

interface IFilterWrapper {
	title: string;
}

const FilterWrapper: FC<PropsWithChildren<IFilterWrapper>> = ({
	title,
	children
}) => {
	return (
		<div className='filter-wrapper'>
			<div className='filter-wrapper__title'>{title}</div>
			<div className='filter-wrapper__inner filters-scroll'>
				{children}
			</div>
		</div>
	);
};

export default FilterWrapper;
