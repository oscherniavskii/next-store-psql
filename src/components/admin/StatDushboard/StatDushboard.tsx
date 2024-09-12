'use client';

import PageLoader from '@/components/loaders/PageLoader/PageLoader';
import { getMain } from '@/helpers/statisticHelpers';
import { priceConvert } from '@/utils/price-format';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import './statDushboard.scss';

const StatDushboard: FC = () => {
	const { data, isFetching } = useQuery({
		queryKey: ['statistic'],
		queryFn: () => getMain(),
		select: data => data
	});

	return (
		<>
			{isFetching ? (
				<PageLoader />
			) : data?.length ? (
				<div className='stat-dushboard'>
					{data.map((item, index) => (
						<div key={item.name} className='stat-dushboard__item'>
							<div className='stat-dushboard__name'>
								{item.name}
							</div>
							<div className='stat-dushboard__value'>
								{index === data.length - 1
									? priceConvert(item.value) ||
									  priceConvert(0)
									: item.value}
							</div>
						</div>
					))}
				</div>
			) : (
				<div className='stat-dushboard__empty'>
					Статистика отсутствует!
				</div>
			)}
		</>
	);
};

export default StatDushboard;
