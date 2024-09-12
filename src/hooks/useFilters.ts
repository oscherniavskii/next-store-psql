import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { TypeProductDataFilters } from '@/types/product.types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const useFilters = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { updateQueryParam } = useActions();
	const { replace } = useRouter();

	const { queryParams, isFilterUpdated } = useTypedSelector(
		state => state.filters
	);

	useEffect(() => {
		searchParams.forEach((value, key) => {
			updateQueryParam({
				key: key as keyof TypeProductDataFilters,
				value
			});
		});
	}, [searchParams, updateQueryParam]);

	const handleUpdateQueryParams = (
		key: keyof TypeProductDataFilters,
		value: string
	) => {
		const newParams = new URLSearchParams(searchParams.toString());

		if (value) {
			newParams.set(key, String(value));
			if (key !== 'page') newParams.set('page', '1');
		} else {
			newParams.delete(key);
		}

		replace(pathname + `?${newParams.toString()}`);

		updateQueryParam({ key, value });
	};

	return {
		handleUpdateQueryParams,
		queryParams,
		isFilterUpdated
	};
};
