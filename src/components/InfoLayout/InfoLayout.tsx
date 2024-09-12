import type { FC, PropsWithChildren } from 'react';
import './infoLayout.scss';

const InfoLayout: FC<PropsWithChildren> = ({ children }) => {
	return <div className='info-layout'>{children}</div>;
};

export default InfoLayout;
