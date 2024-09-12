'use client';

import type { FC, PropsWithChildren } from 'react';

interface IUsersButton {
	create: () => void;
}

const UsersButton: FC<PropsWithChildren<IUsersButton>> = ({
	create,
	children
}) => {
	return <button onClick={() => create()}>{children}</button>;
};

export default UsersButton;
