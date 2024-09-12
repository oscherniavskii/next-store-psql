import type { FC, PropsWithChildren } from 'react';

import SectionTitle from '../SectionTitle/SectionTitle';
import './SectionLayout.scss';

interface ISectionLayout {
	title?: string;
	id?: string;
	noPadding?: boolean;
}

const SectionLayout: FC<PropsWithChildren<ISectionLayout>> = ({
	children,
	title,
	id,
	noPadding = false
}) => {
	return (
		<section className='layout' id={id}>
			<div className='layout__container'>
				<div
					className={`layout__inner ${
						noPadding ? 'layout__inner--nopadding' : ''
					}`}
				>
					{!!title && <SectionTitle>{title}</SectionTitle>}
					{children}
				</div>
			</div>
		</section>
	);
};

export default SectionLayout;
