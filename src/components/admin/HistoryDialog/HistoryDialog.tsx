import { IHistory } from '@/types/history.interface';
import { Dispatch, FC, SetStateAction } from 'react';
import './historyDialog.scss';

interface IHistoryDialog {
	setIsOpenDialog: Dispatch<SetStateAction<boolean>>;
	history: IHistory[];
	name?: string;
}

const HistoryDialog: FC<IHistoryDialog> = ({
	setIsOpenDialog,
	history,
	name
}) => {
	return (
		<div className='history-dialog'>
			<div
				className='history-dialog__overlay'
				onClick={() => {
					setIsOpenDialog(false);
					document.body.classList.remove('_lock');
				}}
			></div>
			<div className='history-dialog__inner'>
				<h3 className='history-dialog__title'>
					История изменений
					{name && <span>{name}</span>}
				</h3>
				<div className='history-dialog__wrapper'>
					{history.map((item, i) => (
						<div className='history-dialog__item' key={i}>
							<div className='history-dialog__num'>{`${
								i + 1
							}`}</div>
							<div className='history-dialog__name'>
								{item.email}
							</div>
							<div className='history-dialog__time'>
								{item.time}
							</div>
						</div>
					))}
				</div>
				<button
					className='history-dialog__close'
					type='button'
					onClick={() => {
						setIsOpenDialog(false);
						document.body.classList.remove('_lock');
					}}
				>
					+
				</button>
			</div>
		</div>
	);
};

export default HistoryDialog;
