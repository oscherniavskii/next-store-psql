import Select from '@/components/ui/Select/Select';
import { useFilters } from '@/hooks/useFilters';
import { FC } from 'react';
import { SORT_SELECT_DATA } from './sort-select.data';

const SortDropdown: FC = () => {
	const { queryParams, handleUpdateQueryParams } = useFilters();

	return (
		<div className='sort-dropdown'>
			<Select<
				| 'high-price'
				| 'low-price'
				| 'newest'
				| 'oldest'
				| 'low-rating'
				| 'high-rating'
			>
				data={SORT_SELECT_DATA}
				onChange={value =>
					handleUpdateQueryParams('sort', value.key.toString())
				}
				value={SORT_SELECT_DATA.find(
					value => value.key === queryParams.sort
				)}
				title='Сортировка'
			/>
		</div>
	);
};

export default SortDropdown;
