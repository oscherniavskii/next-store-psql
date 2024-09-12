'use client';

import PageLoader from '@/components/loaders/PageLoader/PageLoader';
import Button from '@/components/ui/Button/Button';
import { deleteProduct, getAllProducts } from '@/helpers/productHelpers';
import { IHistory } from '@/types/history.interface';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import AdminActions from '../AdminActions/AdminActions';
import './productsList.scss';

const ProductsList: FC = () => {
	const { data, isFetching, refetch } = useQuery({
		queryKey: ['get admin products'],
		queryFn: () =>
			getAllProducts({
				perPage: '1000'
			}),
		select: data => data
	});

	const { mutate } = useMutation({
		mutationKey: ['delete product'],
		mutationFn: (id: number) => deleteProduct(id),
		onSuccess() {
			refetch();
		}
	});

	return (
		<div className='products-list'>
			<div className='products-list__add'>
				<Button variant='link' href='/admin/products/add'>
					Добавить новый товар
				</Button>
			</div>

			{isFetching ? (
				<PageLoader />
			) : data?.products.length ? (
				<>
					{data.products.map(item => {
						const itemHistory: IHistory[] = JSON.parse(
							item.history
						);
						return (
							<article
								className='products-list__item'
								key={item.id}
							>
								<div className='products-list__name'>
									{item.name}
								</div>
								<div className='products-list__category'>
									{item.category?.name}
								</div>
								<div
									className={`products-list__availability ${
										item.availability
											? 'products-list__availability--in'
											: ''
									}`}
								>
									{item.availability
										? 'В наличии'
										: 'Отсутствует'}
								</div>
								<div className='products-list__actions'>
									<AdminActions
										removeHandler={() => mutate(item.id)}
										editUrl={`/admin/products/edit/${item.id}`}
										imageUrl={`/admin/products/images/${item.id}`}
										viewUrl={`/product/${item.slug}`}
										name={item.name}
										history={itemHistory}
									/>
								</div>
							</article>
						);
					})}
				</>
			) : (
				<div className='products-list__empty'>Список пуст!</div>
			)}
		</div>
	);
};

export default ProductsList;
