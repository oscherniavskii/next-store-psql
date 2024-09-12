import Range from '@/components/ui/Range/Range';
import { useFilters } from '@/hooks/useFilters';
import type { FC } from 'react';
import FilterWrapper from '../FilterWrapper/FilterWrapper';

interface IPriceGroup {}

const PriceGroup: FC<IPriceGroup> = () => {
	const { queryParams, handleUpdateQueryParams } = useFilters();

	return (
		<FilterWrapper title='Цена от/до'>
			<Range
				fromInitial={queryParams.minPrice}
				toInitial={queryParams.maxPrice}
				onChangeFrom={value =>
					handleUpdateQueryParams('minPrice', value)
				}
				onChangeTo={value => handleUpdateQueryParams('maxPrice', value)}
			/>
		</FilterWrapper>
	);
};

export default PriceGroup;
