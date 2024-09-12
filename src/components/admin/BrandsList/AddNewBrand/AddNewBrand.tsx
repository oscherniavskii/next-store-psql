import Button from '@/components/ui/Button/Button';
import { createBrand } from '@/helpers/brandHelpers';
import { IBrand } from '@/types/brand.interface';
import { FC, useState } from 'react';
import './addNewBrand.scss';

interface IAddNewBrand {
	refetch: () => void;
}

const AddNewBrand: FC<IAddNewBrand> = ({ refetch }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [newBrand, setNewBrand] = useState<string>('');
	const [isError, setIsError] = useState<boolean>(false);
	const [isSubmitError, setIsSubmitError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const onSubmit = async () => {
		if (newBrand) {
			setIsLoading(true);
			await createBrand(newBrand)
				.then((res: IBrand | undefined) => {
					if (res) {
						if (res.id === 2123456789) {
							setIsSubmitError(true);
						} else {
							setNewBrand('');
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
		<div className='add-brand'>
			<div className='add-brand__head'>
				<Button
					onClick={() => {
						setIsOpen(!isOpen);
						setNewBrand('');
						setIsError(false);
						setIsSubmitError(false);
					}}
					type='button'
				>
					{!isOpen ? 'Добавить бренд' : 'Отменить добавление'}
				</Button>
			</div>
			{isOpen && (
				<div className='add-brand__content'>
					<form className='add-brand__form'>
						<label>
							<span>Название* </span>
							<input
								type='text'
								placeholder='Введите название'
								value={newBrand}
								onChange={e => setNewBrand(e.target.value)}
								onInput={() => {
									setIsError(false);
									setIsSubmitError(false);
								}}
								disabled={isLoading}
							/>
						</label>
						<button
							className={`add-brand__btn ${
								isLoading ? 'add-brand__btn--dis' : ''
							}`}
							type='button'
							onClick={onSubmit}
							disabled={isLoading}
						>
							Добавить
						</button>
					</form>
					{isError && (
						<p className='add-brand__error'>
							Заполните все обязательные поля!
						</p>
					)}
					{isSubmitError && (
						<p className='add-brand__error'>
							Ошибка создания бренда! Название бренда должно быть
							уникальным!
						</p>
					)}
				</div>
			)}
		</div>
	);
};

export default AddNewBrand;
