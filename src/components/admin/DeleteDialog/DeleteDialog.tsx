import { Dispatch, FC, SetStateAction } from 'react';
import './deleteDialog.scss';

interface IDeleteDialog {
	removeHandler?: () => void;
	setIsOpenDialog: Dispatch<SetStateAction<boolean>>;
	variants?: 'brand' | 'category' | 'product' | 'review' | 'user';
	name: string;
}

const DeleteDialog: FC<IDeleteDialog> = ({
	removeHandler,
	setIsOpenDialog,
	variants,
	name
}) => {
	const title = <span>{name}</span>;

	return (
		<div className='delete-dialog'>
			<div
				className='delete-dialog__overlay'
				onClick={() => {
					setIsOpenDialog(false);
					document.body.classList.remove('_lock');
				}}
			></div>
			<div className='delete-dialog__inner'>
				<h3 className='delete-dialog__title'>
					{variants === 'brand'
						? 'Удаление бренда '
						: variants === 'category'
						? 'Удаление категории '
						: variants === 'product'
						? 'Удаление товара '
						: variants === 'user'
						? 'Удаление пользователя '
						: 'Удаление '}
					{title}
					{'!'}
				</h3>
				<p className='delete-dialog__text'>
					{variants === 'brand'
						? 'Удаление бренда повлечет за собой удаление всех товаров данного бренда. Отменить данное действие будет невозможно!'
						: variants === 'category'
						? 'Удаление категории повлечет за собой удаление всех товаров данной категории. Отменить данное действие будет невозможно!'
						: 'Отменить данное действие будет невозможно!'}
				</p>
				<div className='delete-dialog__actions'>
					<button
						type='button'
						onClick={() => {
							setIsOpenDialog(false);
							document.body.classList.remove('_lock');
						}}
					>
						Отмена
					</button>
					<button
						type='button'
						onClick={() => {
							if (removeHandler) removeHandler();
							setIsOpenDialog(false);
							document.body.classList.remove('_lock');
						}}
					>
						Удалить
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteDialog;
