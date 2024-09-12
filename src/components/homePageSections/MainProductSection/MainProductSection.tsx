import ProductCard from '@/components/ProductCard/ProductCard';
import Button from '@/components/ui/Button/Button';
import { IProduct } from '@/types/product.interface';
import { type FC } from 'react';
import './mainProductSection.scss';

interface IMainProductSection {
	products: IProduct[];
}

const MainProductSection: FC<IMainProductSection> = ({ products }) => {
	const productItems = products?.map(product => (
		<ProductCard product={product} key={product.slug} />
	));

	return (
		<div className='new-product-section'>
			<div className='new-product-section__content'>
				{products ? (
					productItems
				) : (
					<p className='new-product-section__empty'>
						Товары отсутствуют!
					</p>
				)}
			</div>
			<div className='new-product-section__action'>
				<Button variant='link' href='/explorer?searchTerm='>
					Все товары
				</Button>
			</div>
		</div>
	);
};

export default MainProductSection;
