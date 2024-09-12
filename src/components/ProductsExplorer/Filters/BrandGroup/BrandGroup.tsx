import ListLoader from '@/components/loaders/ListLoader/ListLoader';
import Checkbox from '@/components/ui/Checkbox/Checkbox';
import { useBrands } from '@/hooks/useBrands';
import { useFilters } from '@/hooks/useFilters';
import type { FC } from 'react';
import FilterWrapper from '../FilterWrapper/FilterWrapper';

const BrandGroup: FC = () => {
	const { queryParams, handleUpdateQueryParams } = useFilters();
	const { data, isLoading } = useBrands();

	return (
		<FilterWrapper title='Выберите бренд'>
			{isLoading ? (
				<ListLoader />
			) : data?.length ? (
				data.map(brand => {
					const isChecked =
						queryParams.brandId === brand.id.toString();

					return (
						<Checkbox
							isChecked={isChecked}
							onClick={() =>
								handleUpdateQueryParams(
									'brandId',
									isChecked ? '' : brand.id.toString()
								)
							}
							key={brand.id}
						>
							{brand.name}
						</Checkbox>
					);
				})
			) : (
				<p>Бренды отсутствуют!</p>
			)}
		</FilterWrapper>
	);
};

export default BrandGroup;
