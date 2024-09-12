import { getAllBrands } from '@/helpers/brandHelpers';
import { useQuery } from '@tanstack/react-query';

export const useBrands = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['get brands'],
		queryFn: () => getAllBrands(),
		select: data => data
	});

	return { data, isLoading };
};
