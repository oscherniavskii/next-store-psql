import { ISelectItem } from '@/components/ui/Select/select.interface';

export const SORT_SELECT_DATA: ISelectItem<
	| 'high-price'
	| 'low-price'
	| 'newest'
	| 'oldest'
	| 'low-rating'
	| 'high-rating'
>[] = [
	{
		key: 'high-price',
		label: 'Сначала дорогие'
	},
	{
		key: 'low-price',
		label: 'Сначала дешевые'
	},
	{
		key: 'high-rating',
		label: 'Высокий рейтинг'
	},
	{
		key: 'low-rating',
		label: 'Низкий рейтинг'
	},
	{
		key: 'newest',
		label: 'Сначала новые'
	},
	{
		key: 'oldest',
		label: 'Сначала старые'
	}
];
