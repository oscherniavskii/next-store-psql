import ProductCard from '@/components/ProductCard/ProductCard';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import { IProduct } from '@/types/product.interface';
import './similarProducts.scss';

interface ISimilarProducts {
	similarProducts: IProduct[];
}

export default function SimilarProducts({ similarProducts }: ISimilarProducts) {
	return (
		<div className='similar-products'>
			<SectionTitle>Похожие товары</SectionTitle>
			{similarProducts.length ? (
				<div className='similar-products__inner'>
					{similarProducts.map(product => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			) : (
				<div>Похожие товары отсутствуют</div>
			)}
		</div>
	);
}
