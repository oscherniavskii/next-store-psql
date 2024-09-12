import Image from 'next/image';
import { useState, type FC } from 'react';
import './productGallery.scss';

interface IProductGallery {
	images: string[];
}

const ProductGallery: FC<IProductGallery> = ({ images }) => {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<div className='product-gallery'>
			<div className='product-gallery__cover'>
				<Image
					src={`${process.env.FOTO_URL}${images[activeIndex]}`}
					alt='Активный слайд'
					width={500}
					height={500}
					priority
					draggable={false}
				/>
			</div>

			<div className='product-gallery__thumbs gallery-scroll'>
				{images.map((image, index) => (
					<button
						key={index}
						onClick={() => setActiveIndex(index)}
						className={`product-gallery__item ${
							index === activeIndex
								? 'product-gallery__item--active'
								: ''
						}`}
					>
						<Image
							draggable={false}
							src={`${process.env.FOTO_URL}${image}`}
							alt={`gallery image #${index}`}
							width={80}
							height={80}
							priority
						/>
					</button>
				))}
			</div>
		</div>
	);
};

export default ProductGallery;
