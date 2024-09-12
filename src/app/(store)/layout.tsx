import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: `${process.env.SITE_NAME} | Лучший онлайн магазин`,
	description: 'Онлайн магазин электроники...'
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}
