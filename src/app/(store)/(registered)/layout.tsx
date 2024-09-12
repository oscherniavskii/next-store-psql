import RegistrationProvider from '@/providers/RegistrationProvider';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: `Личный кабинет | ${process.env.SITE_NAME}`,
	robots: { index: false, follow: false }
};

export default function RegisteredLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<RegistrationProvider>
			<main>{children}</main>
		</RegistrationProvider>
	);
}
