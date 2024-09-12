import { updatePriority } from '@/helpers/categoryHelpers';
import { ICategory } from '@/types/category.interface';
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './priorityInput.scss';

interface IPriorityInput {
	refetch: () => void;
	item: ICategory;
}

const PriorityInput: FC<IPriorityInput> = ({ refetch, item }) => {
	const [value, setValue] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const onSubmit = async () => {
		setIsLoading(true);
		await updatePriority(item.id, value)
			.then((res: ICategory | undefined) => {
				if (res) {
					if (res.id === 2123456789) {
						toast.error(
							'Ошибка сохранения! Возможно данная категория уже удалена!'
						);
					} else {
						refetch();
					}
				}
			})
			.catch(e => {
				console.log(e);
			})
			.finally(() => setIsLoading(false));
	};

	useEffect(() => {
		if (item) setValue(+item.priority);
	}, [item]);
	return (
		<div className='priority-input'>
			<div
				className={`priority-input__inner ${
					value > 0 ? 'priority-input__inner--ok' : ''
				}`}
			>
				<span>{'Приоритет: '}</span>
				<input
					type='number'
					value={value}
					onChange={e => {
						if (+e.target.value >= 0) {
							setValue(+e.target.value);
						} else {
							setValue(0);
						}
					}}
					disabled={isLoading}
				/>
			</div>
			{value !== item.priority && (
				<button type='button' onClick={onSubmit} disabled={isLoading}>
					Сохранить
				</button>
			)}
		</div>
	);
};

export default PriorityInput;
