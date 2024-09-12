import { IProduct } from '@/types/product.interface';
import { FC } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './catalog.scss';

interface ICatalog {
	products: IProduct[];
}

const Catalog: FC<ICatalog> = ({ products }) => {
	return (
		<>
			{products.length ? (
				<div className='catalog'>
					{products.map(product => (
						<ProductCard key={product.name} product={product} />
					))}
				</div>
			) : (
				<div className='catalog__empty'>Товары отсутствуют!</div>
			)}
		</>
	);
};

export default Catalog;
