'use client';

import { FC, PropsWithChildren } from 'react';

interface ISeedButton {
	create: (start: number, quantity: number) => void;
	start: number;
	quantity: number;
}

const SeedButton: FC<PropsWithChildren<ISeedButton>> = ({
	create,
	start,
	quantity,
	children
}) => {
	return <button onClick={() => create(start, quantity)}>{children}</button>;
};

export default SeedButton;
