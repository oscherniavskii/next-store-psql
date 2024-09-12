'use client';

import PageLoader from '@/components/loaders/PageLoader/PageLoader';
import { deleteBrand, getAllBrands } from '@/helpers/brandHelpers';
import { IHistory } from '@/types/history.interface';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import AdminActions from '../AdminActions/AdminActions';
import AddNewBrand from './AddNewBrand/AddNewBrand';
import BrandInput from './BrandInput/BrandInput';
import './brandsList.scss';

const BrandsList: FC = () => {
	const { data, isFetching, refetch } = useQuery({
		queryKey: ['get admin brands'],
		queryFn: () => getAllBrands(),
		select: data => data
	});

	const { mutate } = useMutation({
		mutationKey: ['delete brand'],
		mutationFn: (id: number) => deleteBrand(id),
		onSuccess() {
			refetch();
		}
	});
	return (
		<div className='brands-list'>
			<AddNewBrand refetch={refetch} />

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
								className='brands-list__item'
								key={item.id}
							>
								<div className='brands-list__name'>
									<BrandInput item={item} refetch={refetch} />
								</div>
								<div className='brands-list__counter'>
									<span>Товаров: </span>
									<span>{item.products.length}</span>
								</div>
								<div className='brands-list__actions'>
									<AdminActions
										removeHandler={() => mutate(item.id)}
										viewUrl={`/brands/${item.slug}`}
										variants='brand'
										name={item.name}
										history={itemHistory}
									/>
								</div>
							</article>
						);
					})}
				</>
			) : (
				<div className='brands-list__empty'>Список пуст!</div>
			)}
		</div>
	);
};

export default BrandsList;
