import { ICategoryWithProduct } from '@/types/category.interface';
import { type FC } from 'react';
import CategoryCard from './CategoryCard/CategoryCard';
import './categoriesCatalog.scss';

interface ICategoriesCatalog {
	categories: ICategoryWithProduct[];
}

const CategoriesCatalog: FC<ICategoriesCatalog> = ({ categories }) => {
	const categoryItems = categories.map(category => (
		<div className='categories-catalog__item' key={category.name}>
			<CategoryCard category={category} />
		</div>
	));

	return (
		<>
			<div className='categories-catalog'>
				{categories ? (
					categoryItems
				) : (
					<p className='categories-catalog__empty'>
						Категории отсутствуют!
					</p>
				)}
			</div>
		</>
	);
};

export default CategoriesCatalog;
