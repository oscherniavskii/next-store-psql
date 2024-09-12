'use client';

import { FC, PropsWithChildren } from 'react';

interface IAdminButton {
	create: () => void;
}

const AdminButton: FC<PropsWithChildren<IAdminButton>> = ({
	create,
	children
}) => {
	return <button onClick={() => create()}>{children}</button>;
};

export default AdminButton;
