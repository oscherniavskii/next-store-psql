import { ICategoryWithProduct } from '@/types/category.interface';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import './categoryCard.scss';

interface ICategoryCard {
	category: ICategoryWithProduct;
	type?: 'default' | 'big';
}

const CategoryCard: FC<ICategoryCard> = ({ category, type = 'default' }) => {
	return (
		<Link
			className={`category-card ${
				type === 'big' ? 'category-card--big' : ''
			}`}
			href={`/categories/${category.slug}`}
		>
			<div className='category-card__icon'>
				{!!category.cover && (
					<Image
						width={200}
						height={200}
						src={`${process.env.FOTO_URL}${category.cover}`}
						alt={category.name}
						priority
					/>
				)}
			</div>
			<h3 className='category-card__title'>{category.name}</h3>
		</Link>
	);
};

export default CategoryCard;
