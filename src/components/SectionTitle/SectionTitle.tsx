import type { FC, PropsWithChildren } from 'react';

import './SectionTitle.scss';

interface ISectionTitle {
	noLayout?: boolean;
}

const SectionTitle: FC<PropsWithChildren<ISectionTitle>> = ({
	children,
	noLayout = false
}) => {
	return (
		<h2 className={`${noLayout ? '' : 'layout__title'} section-title`}>
			{children}
		</h2>
	);
};

export default SectionTitle;
