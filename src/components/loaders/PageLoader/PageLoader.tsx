import { FC } from 'react';

import './pageLoader.scss';

const PageLoader: FC = () => {
	return (
		<main className='page-loader'>
			<div className='page-loader__inner'>
				<div className='page-loader__icon'>
					<svg
						width='150px'
						height='150px'
						viewBox='0 0 100 100'
						preserveAspectRatio='xMidYMid'
					>
						<circle cx='30' cy='50' fill='#e90c59' r='20'>
							<animate
								attributeName='cx'
								repeatCount='indefinite'
								dur='1.3513513513513513s'
								keyTimes='0;0.5;1'
								values='30;70;30'
								begin='-0.6756756756756757s'
							></animate>
						</circle>
						<circle cx='70' cy='50' fill='#46dff0' r='20'>
							<animate
								attributeName='cx'
								repeatCount='indefinite'
								dur='1.3513513513513513s'
								keyTimes='0;0.5;1'
								values='30;70;30'
								begin='0s'
							></animate>
						</circle>
						<circle cx='30' cy='50' fill='#e90c59' r='20'>
							<animate
								attributeName='cx'
								repeatCount='indefinite'
								dur='1.3513513513513513s'
								keyTimes='0;0.5;1'
								values='30;70;30'
								begin='-0.6756756756756757s'
							></animate>
							<animate
								attributeName='fill-opacity'
								values='0;0;1;1'
								calcMode='discrete'
								keyTimes='0;0.499;0.5;1'
								dur='1.3513513513513513s'
								repeatCount='indefinite'
							></animate>
						</circle>
					</svg>
				</div>
			</div>
		</main>
	);
};

export default PageLoader;
