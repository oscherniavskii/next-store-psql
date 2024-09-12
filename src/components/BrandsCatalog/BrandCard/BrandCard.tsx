import { IBrand } from '@/types/brand.interface';
import Link from 'next/link';
import { FC } from 'react';
import './brandCard.scss';

interface IBrandCard {
	brand: IBrand;
}

const BrandCard: FC<IBrandCard> = ({ brand }) => {
	return (
		<Link className='brand-card' href={`/brands/${brand.slug}`}>
			<h3 className='brand-card__title'>{brand.name}</h3>
		</Link>
	);
};

export default BrandCard;
