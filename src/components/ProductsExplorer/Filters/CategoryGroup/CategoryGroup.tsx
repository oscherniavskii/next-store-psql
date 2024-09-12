import ListLoader from '@/components/loaders/ListLoader/ListLoader';
import Checkbox from '@/components/ui/Checkbox/Checkbox';
import { useCategories } from '@/hooks/useCategories';
import { useFilters } from '@/hooks/useFilters';
import type { FC } from 'react';
import FilterWrapper from '../FilterWrapper/FilterWrapper';

const CategoryGroup: FC = () => {
	const { queryParams, handleUpdateQueryParams } = useFilters();
	const { data, isLoading } = useCategories();

	return (
		<FilterWrapper title='Выберите категорию'>
			{isLoading ? (
				<ListLoader />
			) : data?.length ? (
				data.map(category => {
					const isChecked =
						queryParams.categoryId === category.id.toString();

					return (
						<Checkbox
							isChecked={isChecked}
							onClick={() =>
								handleUpdateQueryParams(
									'categoryId',
									isChecked ? '' : category.id.toString()
								)
							}
							key={category.id}
						>
							{category.name}
						</Checkbox>
					);
				})
			) : (
				<p>Категории отсутствуют!</p>
			)}
		</FilterWrapper>
	);
};

export default CategoryGroup;
