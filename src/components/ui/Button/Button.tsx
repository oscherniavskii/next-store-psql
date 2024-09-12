import type { FC, PropsWithChildren } from 'react';

import Link from 'next/link';
import './button.scss';

interface IButton {
	type?: 'button' | 'submit' | 'reset' | undefined;
	disabled?: boolean;
	variant?: 'button' | 'link';
	onClick?: () => void;
	href?: string;
	prefetch?: boolean;
}

const Button: FC<PropsWithChildren<IButton>> = ({
	type = 'submit',
	children,
	disabled = false,
	variant = 'button',
	onClick,
	href = '/',
	prefetch = true
}) => {
	if (variant === 'link') {
		return (
			<Link className='button' href={href} prefetch={prefetch}>
				{children}
			</Link>
		);
	}

	return (
		<button
			className='button'
			type={type}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
