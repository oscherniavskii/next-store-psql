import Button from '@/components/ui/Button/Button';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import BrandGroup from './BrandGroup/BrandGroup';
import CategoryGroup from './CategoryGroup/CategoryGroup';
import PriceGroup from './PriceGroup/PriceGroup';
import './filters.scss';

const Filters: FC = () => {
	const router = useRouter();

	return (
		<div className='filters-panel'>
			<h3 className='filters-panel__title'>Фильтры товаров</h3>

			<div className='filters-panel__inner'>
				<PriceGroup />
				<CategoryGroup />
				<BrandGroup />
			</div>

			<div className='filters-panel__btn'>
				<Button
					variant='button'
					onClick={() =>
						router.push(
							'/explorer?searchTerm=&categoryId=&brandId=&page=1'
						)
					}
				>
					Сброс фильтров
				</Button>
			</div>
		</div>
	);
};

export default Filters;
