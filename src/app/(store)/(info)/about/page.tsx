import PageAbout from '@/components/PageAbout/PageAbout';
import SectionLayout from '@/components/SectionLayout/SectionLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: `О магазине | ${process.env.SITE_NAME}`
};

export default function AboutPage() {
	return (
		<main>
			<SectionLayout noPadding title='О нашем магазине'>
				<PageAbout />
			</SectionLayout>
		</main>
	);
}
