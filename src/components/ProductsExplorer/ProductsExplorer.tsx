'use client';

import { getAllProducts } from '@/helpers/productHelpers';
import { useFilters } from '@/hooks/useFilters';
import { TypePaginationProducts } from '@/types/product.interface';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import SectionTitle from '../SectionTitle/SectionTitle';
import Filters from './Filters/Filters';
import { Pagination } from './Pagination/Pagination';
import SortDropdown from './SortDropdown/SortDropdown';
import './productsExplorer.scss';

interface IProductsExplorer {
	initialProducts: TypePaginationProducts;
}

const ProductsExplorer: FC<IProductsExplorer> = ({ initialProducts }) => {
	const { isFilterUpdated, queryParams, handleUpdateQueryParams } =
		useFilters();

	const { data, isFetching } = useQuery({
		queryKey: ['product explorer', queryParams],
		queryFn: () => getAllProducts(queryParams),
		initialData: initialProducts,
		enabled: isFilterUpdated //Загрузка при обновлении фильтров
	});
	return (
		<div className='products-explorer'>
			<div className='products-explorer__heading'>
				<SectionTitle noLayout>
					{queryParams.searchTerm
						? `Результаты по запросу "${queryParams.searchTerm}"`
						: 'Каталог товаров'}
				</SectionTitle>
				<SortDropdown />
			</div>

			<div className='products-explorer__content'>
				<aside className='products-explorer__aside'>
					<Filters />
				</aside>
				<div className='products-explorer__inner'>
					<div className='products-explorer__catalog'>
						{data?.products.length ? (
							<>
								{data.products.map(product => (
									<ProductCard
										key={product.name}
										product={product}
									/>
								))}
							</>
						) : (
							<div className='products-explorer__empty'>
								Товары по Вашему запросу отсутствуют!
							</div>
						)}
					</div>
					{data && (
						<Pagination
							changePage={page =>
								handleUpdateQueryParams('page', page.toString())
							}
							currentPage={queryParams.page}
							numberPage={Math.ceil(
								data.length / +queryParams.perPage
							)}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductsExplorer;
