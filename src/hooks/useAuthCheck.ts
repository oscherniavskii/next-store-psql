'use client';

import { checkAndUpdateAuthentication } from '@/helpers/authHelpers';
import { useEffect, useState } from 'react';

export function useAuthCheck() {
	const [isAuth, setIsAuth] = useState(false);
	const [isAuthLoading, setIsAuthLoading] = useState(true);

	useEffect(() => {
		(async () => {
			await checkAndUpdateAuthentication()
				.then(res => setIsAuth(res))
				.catch((error: any) => console.log(error))
				.finally(() => setIsAuthLoading(false));
		})();
	}, []);

	return { isAuth, isAuthLoading };
}
