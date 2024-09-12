'use client';

import { FC, PropsWithChildren, useState } from 'react';
import './faq.scss';

interface IFaq {
	question: string;
}

const Faq: FC<PropsWithChildren<IFaq>> = ({ children, question }) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className='spoller'>
			<button
				className='spoller__title'
				onClick={() => setIsOpen(!isOpen)}
			>
				<span>{question}</span>
				<div
					className={`spoller__icon ${
						isOpen && 'spoller__icon--open'
					}`}
				>
					<svg width='32' height='32' viewBox='0 0 32 32' fill='none'>
						<circle cx='16' cy='16' r='16' fill='white' />
						<path
							d='M10 16H22'
							stroke='#FF8D1C'
							strokeWidth='2'
							strokeLinecap='round'
						/>
						<path
							d='M16 10L16 22'
							stroke='#FF8D1C'
							strokeWidth='2'
							strokeLinecap='round'
						/>
					</svg>
				</div>
			</button>
			<div className={`spoller__body ${isOpen && 'spoller__body--open'}`}>
				{children}
			</div>
		</div>
	);
};

export default Faq;
