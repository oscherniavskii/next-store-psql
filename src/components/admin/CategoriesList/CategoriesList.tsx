'use client';

import PageLoader from '@/components/loaders/PageLoader/PageLoader';
import { deleteCategory, getAllCategories } from '@/helpers/categoryHelpers';
import { IHistory } from '@/types/history.interface';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import AdminActions from '../AdminActions/AdminActions';
import AddNewCategory from './AddNewCategory/AddNewCategory';
import CategoryInput from './CategoryInput/CategoryInput';
import PriorityInput from './PriorityInput/PriorityInput';
import './categoriesList.scss';

const CategoriesList: FC = () => {
	const { data, isFetching, refetch } = useQuery({
		queryKey: ['get admin categories'],
		queryFn: () => getAllCategories(),
		select: data => data
	});

	const { mutate } = useMutation({
		mutationKey: ['delete category'],
		mutationFn: (id: number) => deleteCategory(id),
		onSuccess() {
			refetch();
		}
	});
	return (
		<div className='categories-list'>
			<AddNewCategory refetch={refetch} />

			{isFetching ? (
				<PageLoader />
			) : data?.length ? (
				<>
					{data.map(item => {
						const itemHistory: IHistory[] = JSON.parse(
							item.history
						);
						return (
							<article
								className='categories-list__item'
								key={item.id}
							>
								<div className='categories-list__name'>
									<CategoryInput
										refetch={refetch}
										item={item}
									/>
								</div>
								<div className='categories-list__priority'>
									<PriorityInput
										item={item}
										refetch={refetch}
									/>
								</div>
								<div className='categories-list__counter'>
									<span>Товаров: </span>
									<span>{item.products.length}</span>
								</div>
								<div className='categories-list__actions'>
									<AdminActions
										removeHandler={() => mutate(item.id)}
										viewUrl={`/categories/${item.slug}`}
										imageUrl={`/admin/categories/images/${item.id}`}
										name={item.name}
										variants='category'
										history={itemHistory}
									/>
								</div>
							</article>
						);
					})}
				</>
			) : (
				<div className='categories-list__empty'>Список пуст!</div>
			)}
		</div>
	);
};

export default CategoriesList;
