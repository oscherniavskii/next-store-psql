'use client';

import { useProfile } from '@/hooks/useProfile';
import { FC } from 'react';
import Catalog from '../Catalog/Catalog';

const Favorites: FC = () => {
	const { profile } = useProfile();
	const products = profile?.favorites || [];

	return (
		<>
			<Catalog products={products} />
		</>
	);
};

export default Favorites;
