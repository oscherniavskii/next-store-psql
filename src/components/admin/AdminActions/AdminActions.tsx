import { IHistory } from '@/types/history.interface';
import Link from 'next/link';
import { FC, useState } from 'react';
import { createPortal } from 'react-dom';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
import HistoryDialog from '../HistoryDialog/HistoryDialog';
import './adminActions.scss';

interface IAdminActions {
	removeHandler?: () => void;
	editUrl?: string;
	imageUrl?: string;
	viewUrl?: string;
	variants?: 'brand' | 'category' | 'product' | 'review' | 'user';
	name?: string;
	history?: IHistory[];
}

const AdminActions: FC<IAdminActions> = ({
	editUrl,
	removeHandler,
	viewUrl,
	variants = 'product',
	name,
	history,
	imageUrl
}) => {
	const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
	const [isOpenHistoryDialog, setIsOpenHistoryDialog] =
		useState<boolean>(false);

	return (
		<>
			<div className='admin-actions'>
				{viewUrl && (
					<Link
						className='admin-actions__icon'
						href={viewUrl}
						target='_blank'
						title='Просмотр'
						prefetch={false}
					>
						<svg viewBox='0 0 24 24'>
							<path d='M18,10a8,8,0,1,0-3.1,6.31l6.4,6.4,1.41-1.41-6.4-6.4A8,8,0,0,0,18,10Zm-8,6a6,6,0,1,1,6-6A6,6,0,0,1,10,16Z' />
						</svg>
					</Link>
				)}
				{editUrl && (
					<Link
						className='admin-actions__icon admin-actions__icon--edit'
						href={editUrl}
						title='Редактировать описание'
						prefetch={false}
					>
						<svg
							x='0px'
							y='0px'
							width='128px'
							height='128px'
							viewBox='0 0 128 128'
							enableBackground='new 0 0 128 128'
						>
							<path
								d='M8,112V16c0-4.414,3.594-8,8-8h80c4.414,0,8,3.586,8,8v47.031l8-8V16c0-8.836-7.164-16-16-16H16C7.164,0,0,7.164,0,16v96
			c0,8.836,7.164,16,16,16h44v-8H16C11.594,120,8,116.414,8,112z M88,24H24v8h64V24z M88,40H24v8h64V40z M88,56H24v8h64V56z M24,80
			h32v-8H24V80z M125.656,72L120,66.344c-1.563-1.563-3.609-2.344-5.656-2.344s-4.094,0.781-5.656,2.344l-34.344,34.344
			C72.781,102.25,68,108.293,68,110.34L64,128l17.656-4c0,0,8.094-4.781,9.656-6.344l34.344-34.344
			C128.781,80.188,128.781,75.121,125.656,72z M88.492,114.82c-0.453,0.43-2.02,1.488-3.934,2.707l-10.363-10.363
			c1.063-1.457,2.246-2.922,2.977-3.648l25.859-25.859l11.313,11.313L88.492,114.82z'
							/>
						</svg>
					</Link>
				)}
				{imageUrl && (
					<Link
						className='admin-actions__icon admin-actions__icon--foto'
						href={imageUrl}
						title='Редактировать фото'
						prefetch={false}
					>
						<svg viewBox='0 0 32 32'>
							<path d='M26,27H6a3,3,0,0,1-3-3V8A3,3,0,0,1,6,5H26a3,3,0,0,1,3,3V24A3,3,0,0,1,26,27ZM6,7A1,1,0,0,0,5,8V24a1,1,0,0,0,1,1H26a1,1,0,0,0,1-1V8a1,1,0,0,0-1-1Z' />
							<path d='M21,15a3,3,0,1,1,3-3A3,3,0,0,1,21,15Zm0-4a1,1,0,1,0,1,1A1,1,0,0,0,21,11Z' />
							<path d='M26,27a1,1,0,0,1-.83-.45l-4.34-6.5a1,1,0,0,0-1.66,0l-.34.5a1,1,0,0,1-1.66-1.1l.33-.51a3,3,0,0,1,5,0l4.33,6.51a1,1,0,0,1-.28,1.38A.94.94,0,0,1,26,27Z' />
							<path d='M6,27a1,1,0,0,1-.54-.16,1,1,0,0,1-.3-1.38l6.23-9.62a3,3,0,0,1,2.5-1.37h0a3,3,0,0,1,2.5,1.34l6.42,9.64a1,1,0,0,1-1.66,1.1l-6.43-9.63a1,1,0,0,0-.83-.45h0a1,1,0,0,0-.83.46L6.84,26.54A1,1,0,0,1,6,27Z' />
						</svg>
					</Link>
				)}
				{removeHandler && (
					<button
						className='admin-actions__icon'
						onClick={() => {
							setIsOpenDialog(true);
							document.body.classList.add('_lock');
						}}
						title='Удалить'
					>
						<svg
							width='16'
							height='16'
							fill='currentColor'
							viewBox='0 0 16 16'
						>
							<path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
							<path
								fillRule='evenodd'
								d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
							/>
						</svg>
					</button>
				)}
				{history && history.length > 0 && (
					<button
						className='admin-actions__icon'
						onClick={() => {
							setIsOpenHistoryDialog(true);
							document.body.classList.add('_lock');
						}}
						title='История изменений'
					>
						<svg width='21px' height='18px' viewBox='0 0 21 18'>
							<g
								stroke='none'
								strokeWidth='1'
								fill='none'
								fillRule='evenodd'
							>
								<g transform='translate(-441.000000, -289.000000)'>
									<g transform='translate(100.000000, 100.000000)'>
										<g transform='translate(340.000000, 186.000000)'>
											<g transform='translate(0.000000, 0.000000)'>
												<polygon points='0 0 24 0 24 24 0 24'></polygon>
												<path
													d='M13.26,3 C8.17,2.86 4,6.95 4,12 L2.21,12 C1.76,12 1.54,12.54 1.86,12.85 L4.65,15.65 C4.85,15.85 5.16,15.85 5.36,15.65 L8.15,12.85 C8.46,12.54 8.24,12 7.79,12 L6,12 C6,8.1 9.18,4.95 13.1,5 C16.82,5.05 19.95,8.18 20,11.9 C20.05,15.81 16.9,19 13,19 C11.39,19 9.9,18.45 8.72,17.52 C8.32,17.21 7.76,17.24 7.4,17.6 C6.98,18.02 7.01,18.73 7.48,19.09 C9,20.29 10.91,21 13,21 C18.05,21 22.14,16.83 22,11.74 C21.87,7.05 17.95,3.13 13.26,3 Z M12.75,8 C12.34,8 12,8.34 12,8.75 L12,12.43 C12,12.78 12.19,13.11 12.49,13.29 L15.61,15.14 C15.97,15.35 16.43,15.23 16.64,14.88 C16.85,14.52 16.73,14.06 16.38,13.85 L13.5,12.14 L13.5,8.74 C13.5,8.34 13.16,8 12.75,8 Z'
													fill='#1D1D1D'
												></path>
											</g>
										</g>
									</g>
								</g>
							</g>
						</svg>
					</button>
				)}
			</div>
			{isOpenDialog &&
				createPortal(
					<DeleteDialog
						removeHandler={removeHandler}
						setIsOpenDialog={setIsOpenDialog}
						variants={variants}
						name={name ? name : 'отзыва'}
					/>,
					document.getElementById('dialog-container') as HTMLElement
				)}
			{history &&
				history.length &&
				isOpenHistoryDialog &&
				createPortal(
					<HistoryDialog
						setIsOpenDialog={setIsOpenHistoryDialog}
						history={history}
						name={name}
					/>,
					document.getElementById('dialog-container') as HTMLElement
				)}
		</>
	);
};

export default AdminActions;
