'use client';

import { checkAndUpdateAuthentication } from '@/helpers/authHelpers';
import { getProfile } from '@/helpers/userHelpers';
import { IFullUser } from '@/types/user.interface';
import { useEffect, useState } from 'react';

export function useCurrentUserCheck() {
	const [currentUser, setCurrentUser] = useState<IFullUser | undefined>(
		undefined
	);
	const [isCurrentUserLoading, setIsCurrentUserLoading] = useState(true);

	useEffect(() => {
		const getCurrentUser = async () => {
			const isAuth = await checkAndUpdateAuthentication();

			if (isAuth) {
				await getProfile()
					.then(res => setCurrentUser(res))
					.catch(error => console.log(error))
					.finally(() => setIsCurrentUserLoading(false));
			} else {
				setCurrentUser(undefined);
				setIsCurrentUserLoading(false);
			}
		};

		getCurrentUser();
	}, []);

	return { currentUser, isCurrentUserLoading };
}
