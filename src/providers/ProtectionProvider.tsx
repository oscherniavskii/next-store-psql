'use client';

import PageLoader from '@/components/loaders/PageLoader/PageLoader';
import { useCurrentUserCheck } from '@/hooks/useCurrentUserCheck';
import { useRouter } from 'next/navigation';

const ProtectionProvider = ({ children }: { children: React.ReactNode }) => {
	const { push } = useRouter();
	const { currentUser, isCurrentUserLoading } = useCurrentUserCheck();

	if (!currentUser && !isCurrentUserLoading) {
		setTimeout(() => {
			push('/login');
		}, 0);
		return;
	}

	if (!currentUser?.isAdmin && !isCurrentUserLoading) {
		setTimeout(() => {
			push('/');
		}, 0);
		return;
	}

	if (isCurrentUserLoading) return <PageLoader />;

	return <>{children}</>;
};

export default ProtectionProvider;
