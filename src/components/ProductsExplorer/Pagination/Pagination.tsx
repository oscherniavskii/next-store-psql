import { FC } from 'react';
import './pagination.scss';

interface IPagination {
	numberPage: number;
	changePage: (page: string) => void;
	currentPage?: number | string;
}

export const Pagination: FC<IPagination> = ({
	numberPage,
	changePage,
	currentPage
}) => {
	return (
		<div className='pagination'>
			{Array.from({ length: numberPage > 1 ? numberPage : 0 }).map(
				(_, index) => {
					const pageNumber = (index + 1).toString();

					return (
						<button
							key={pageNumber}
							onClick={() => changePage(pageNumber)}
							className={`pagination__btn ${
								currentPage === pageNumber
									? 'pagination__btn--current'
									: ''
							}`}
							disabled={currentPage === pageNumber}
						>
							{pageNumber}
						</button>
					);
				}
			)}
		</div>
	);
};
