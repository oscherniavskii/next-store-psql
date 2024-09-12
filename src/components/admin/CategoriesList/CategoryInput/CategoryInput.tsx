import { updateCategory } from '@/helpers/categoryHelpers';
import {
	CategoryData,
	ICategory,
	ICategoryWithProduct
} from '@/types/category.interface';
import { FC, useEffect, useState } from 'react';
import './categoryInput.scss';

interface ICategoryInput {
	refetch: () => void;
	item: ICategoryWithProduct;
}

const CategoryInput: FC<ICategoryInput> = ({ refetch, item }) => {
	const [value, setValue] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [isSubmitError, setIsSubmitError] = useState<boolean>(false);

	const onSubmit = async () => {
		if (value) {
			setIsLoading(true);
			const data: CategoryData = {
				name: value,
				cover: item.cover || '/not-found/not-found.webp',
				priority: item.priority
			};
			await updateCategory(item.id, data)
				.then((res: ICategory | undefined) => {
					if (res) {
						if (res.id === 2123456789) {
							setIsSubmitError(true);
						} else {
							refetch();
						}
					}
				})
				.catch(e => {
					console.log(e);
				})
				.finally(() => setIsLoading(false));
		} else {
			setIsError(true);
		}
	};

	useEffect(() => {
		if (item) setValue(item.name);
	}, [item]);
	return (
		<div className='category-input'>
			<input
				type='text'
				value={value}
				onChange={e => setValue(e.target.value)}
				disabled={isLoading}
				onInput={() => {
					setIsError(false);
					setIsSubmitError(false);
				}}
			/>
			{value !== item.name && (
				<button type='button' onClick={onSubmit} disabled={isLoading}>
					Сохранить
				</button>
			)}
			{isError && (
				<p className='category-input__error'>Заполните поле!</p>
			)}
			{isSubmitError && (
				<p className='category-input__error'>
					Ошибка сохранения! Либо категория с таким названием уже
					существует либо она удалена!
				</p>
			)}
		</div>
	);
};

export default CategoryInput;
