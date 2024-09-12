import BrandsCatalog from '@/components/BrandsCatalog/brandsCatalog';
import SectionLayout from '@/components/SectionLayout/SectionLayout';
import { getAllBrands } from '@/services/brand.services';
import { Metadata } from 'next';

//Data revalidate every 60 sec
export const revalidate = 60;

async function getBrands() {
	const brands = await getAllBrands();
	return brands;
}

export const metadata: Metadata = {
	title: `Каталог брендов | ${process.env.SITE_NAME}`
};

export default async function BrandsPage() {
	const data = await getBrands();

	return (
		<main>
			<SectionLayout title={`Каталог брендов`} noPadding>
				<BrandsCatalog brands={data} />
			</SectionLayout>
		</main>
	);
}
