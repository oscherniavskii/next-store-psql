import { IBrand } from '@/types/brand.interface';
import { type FC } from 'react';
import BrandCard from './BrandCard/BrandCard';
import './brandsCatalog.scss';

interface IBrandsCatalog {
	brands: IBrand[];
}

const BrandsCatalog: FC<IBrandsCatalog> = ({ brands }) => {
	const brandsItems = brands.map(brand => (
		<div className='brands-catalog__item' key={brand.name}>
			<BrandCard brand={brand} />
		</div>
	));

	return (
		<>
			<div className='brands-catalog'>
				{brands ? (
					brandsItems
				) : (
					<p className='brands-catalog__empty'>
						Бренды в каталоге отсутствуют!
					</p>
				)}
			</div>
		</>
	);
};

export default BrandsCatalog;
