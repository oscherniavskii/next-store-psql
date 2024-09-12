import { getProfile } from '@/helpers/userHelpers';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from './useAuth';

export const useProfile = () => {
	const { user } = useAuth();

	const { data } = useQuery({
		queryKey: ['get profile'],
		queryFn: () => getProfile(),
		enabled: !!user
	});

	return { profile: data };
};
