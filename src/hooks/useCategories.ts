import { getAllCategories } from '@/helpers/categoryHelpers';
import { useQuery } from '@tanstack/react-query';

export const useCategories = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['get categories'],
		queryFn: () => getAllCategories(),

		select: data => data
	});

	return { data, isLoading };
};
