'use client';

import CategoryCard from '@/components/CategoriesCatalog/CategoryCard/CategoryCard';
import Button from '@/components/ui/Button/Button';
import { ICategoryWithProduct } from '@/types/category.interface';
import { type FC } from 'react';
import { useMedia } from 'use-media';
import './mainCategoriesSection.scss';

interface IMainCategoriesSection {
	categories: ICategoryWithProduct[];
}

const MainCategoriesSection: FC<IMainCategoriesSection> = ({ categories }) => {
	const isModile = useMedia({ maxWidth: '992px' });

	const categoryItems = categories.map((category, i) => {
		if (!isModile && (i === 0 || i === 5 || i === 6 || i === 11)) {
			return (
				<div
					className='categories-section__item categories-section__item--big'
					key={category.name}
				>
					<CategoryCard category={category} type='big' />
				</div>
			);
		} else {
			return (
				<div className='categories-section__item' key={category.name}>
					<CategoryCard category={category} />
				</div>
			);
		}
	});
	return (
		<div className='categories-section'>
			<div className='categories-section__inner'>
				{categories ? (
					categoryItems
				) : (
					<p className='categories-section__empty'>
						Категории отсутствуют!
					</p>
				)}
			</div>
			<div className='categories-section__btn'>
				<Button variant='link' href='/categories'>
					Все категории
				</Button>
			</div>
		</div>
	);
};

export default MainCategoriesSection;
