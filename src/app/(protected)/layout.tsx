import AdminHeader from '@/components/admin/AdminHeader/AdminHeader';
import ProtectionProvider from '@/providers/ProtectionProvider';

export default function ProtectedLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<ProtectionProvider>
			<AdminHeader />
			<main id='dialog-container' style={{ paddingTop: 45 }}>
				{children}
			</main>
		</ProtectionProvider>
	);
}
