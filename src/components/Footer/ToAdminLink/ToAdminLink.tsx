'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { FC } from 'react';

const ToAdminLink: FC = () => {
	const { user } = useAuth();

	if (!user) return;
	if (user && !user?.isAdmin) return;

	return (
		<Link className='footer__link' href='/admin'>
			Администраторам
		</Link>
	);
};

export default ToAdminLink;
