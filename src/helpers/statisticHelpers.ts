import { instance } from '@/api/api.interceptor';
import { IStatisticResponse } from '@/types/statistic.interface';

const STATISTICS = '/statistics';

export async function getMain() {
	try {
		const res = await instance<IStatisticResponse[]>({
			url: `${STATISTICS}/main`,
			method: 'GET'
		});

		return res.data;
	} catch (error) {
		console.error('Get all statistics:', error);
	}
}
