'use client';

import PageLoader from '@/components/loaders/PageLoader/PageLoader';
import { useAuthCheck } from '@/hooks/useAuthCheck';
import { useRouter } from 'next/navigation';

const RegistrationProvider = ({ children }: { children: React.ReactNode }) => {
	const { push } = useRouter();
	const { isAuth, isAuthLoading } = useAuthCheck();

	if (isAuthLoading) return <PageLoader />;

	if (!isAuth) {
		setTimeout(() => {
			push('/login');
		}, 0);
		return;
	}

	return <>{children}</>;
};

export default RegistrationProvider;
