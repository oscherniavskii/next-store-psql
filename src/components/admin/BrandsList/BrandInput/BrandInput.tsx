import { updateBrand } from '@/helpers/brandHelpers';
import { IBrand, IBrandWithProducts } from '@/types/brand.interface';
import { FC, useEffect, useState } from 'react';
import './brandInput.scss';

interface IBrandInput {
	refetch: () => void;
	item: IBrandWithProducts;
}

const BrandInput: FC<IBrandInput> = ({ refetch, item }) => {
	const [value, setValue] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [isSubmitError, setIsSubmitError] = useState<boolean>(false);

	const onSubmit = async () => {
		if (value) {
			setIsLoading(true);
			await updateBrand(item.id, value)
				.then((res: IBrand | undefined) => {
					if (res) {
						if (res.id === 2123456789) {
							setIsSubmitError(true);
						} else {
							refetch();
						}
					}
				})
				.catch(e => {
					console.log('FRONT', e);
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
		<div className='brand-input'>
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
			{isError && <p className='brand-input__error'>Заполните поле!</p>}
			{isSubmitError && (
				<p className='brand-input__error'>
					Ошибка сохранения! Либо бренд с таким названием уже
					существует либо он удален!
				</p>
			)}
		</div>
	);
};

export default BrandInput;
