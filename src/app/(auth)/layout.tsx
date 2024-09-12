import { Metadata } from 'next';

export const metadata: Metadata = {
	title: `Авторизация | ${process.env.SITE_NAME}`,
	robots: { index: false, follow: false }
};

export default function ProtectedLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return <main>{children}</main>;
}
