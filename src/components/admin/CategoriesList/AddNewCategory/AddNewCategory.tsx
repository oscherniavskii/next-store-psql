import Button from '@/components/ui/Button/Button';
import { createCategory } from '@/helpers/categoryHelpers';
import { ICategory } from '@/types/category.interface';
import { FC, useState } from 'react';
import './addNewCategory.scss';

interface IAddNewCategory {
	refetch: () => void;
}

const AddNewCategory: FC<IAddNewCategory> = ({ refetch }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [newCategory, setNewCategory] = useState<string>('');
	const [isError, setIsError] = useState<boolean>(false);
	const [isSubmitError, setIsSubmitError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const onSubmit = async () => {
		if (newCategory) {
			setIsLoading(true);
			await createCategory({
				name: newCategory,
				cover: '/not-found/not-found.webp'
			})
				.then((res: ICategory | undefined) => {
					if (res) {
						if (res.id === 2123456789) {
							setIsSubmitError(true);
						} else {
							setNewCategory('');
							setIsOpen(false);
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

	return (
		<div className='add-category'>
			<div className='add-category__head'>
				<Button
					onClick={() => {
						setIsOpen(!isOpen);
						setNewCategory('');
						setIsError(false);
						setIsSubmitError(false);
					}}
					type='button'
				>
					{!isOpen ? 'Добавить категорию' : 'Отменить добавление'}
				</Button>
			</div>
			{isOpen && (
				<div className='add-category__content'>
					<form className='add-category__form'>
						<label>
							<span>Название* </span>
							<input
								type='text'
								placeholder='Введите название'
								value={newCategory}
								onChange={e => setNewCategory(e.target.value)}
								onInput={() => {
									setIsError(false);
									setIsSubmitError(false);
								}}
								disabled={isLoading}
							/>
						</label>
						<button
							className={`add-category__btn ${
								isLoading ? 'add-category__btn--dis' : ''
							}`}
							type='button'
							onClick={onSubmit}
							disabled={isLoading}
						>
							Добавить
						</button>
					</form>
					{isError && (
						<p className='add-category__error'>
							Заполните все обязательные поля!
						</p>
					)}
					{isSubmitError && (
						<p className='add-category__error'>
							Ошибка создания категории! Название категории должно
							быть уникальным!
						</p>
					)}
				</div>
			)}
		</div>
	);
};

export default AddNewCategory;
