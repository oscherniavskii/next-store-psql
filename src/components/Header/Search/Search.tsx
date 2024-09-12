'use client';

import { useRouter } from 'next/navigation';
import { useState, type ChangeEvent, type FC, type KeyboardEvent } from 'react';
import './search.scss';

const Search: FC = () => {
	const [searchInput, setSearchInput] = useState('');
	const { push } = useRouter();

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			push(`/explorer?searchTerm=${searchInput}&page=1`);
			setSearchInput('');
		}
	};

	return (
		<div className='search-form'>
			<input
				type='search'
				className='search-form__input'
				placeholder='Поиск...'
				value={searchInput}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setSearchInput(e.target.value)
				}
				onKeyDown={handleKeyDown}
			/>

			<button
				className='search-form__button'
				onClick={() => {
					push(`/explorer?searchTerm=${searchInput}`);
					setSearchInput('');
				}}
			>
				<svg
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						id='Vector'
						d='M21 21L15 15M3 10C3 10.9193 3.18106 11.8295 3.53284 12.6788C3.88463 13.5281 4.40024 14.2997 5.05025 14.9497C5.70026 15.5998 6.47194 16.1154 7.32122 16.4672C8.1705 16.8189 9.08075 17 10 17C10.9193 17 11.8295 16.8189 12.6788 16.4672C13.5281 16.1154 14.2997 15.5998 14.9497 14.9497C15.5998 14.2997 16.1154 13.5281 16.4672 12.6788C16.8189 11.8295 17 10.9193 17 10C17 9.08075 16.8189 8.1705 16.4672 7.32122C16.1154 6.47194 15.5998 5.70026 14.9497 5.05025C14.2997 4.40024 13.5281 3.88463 12.6788 3.53284C11.8295 3.18106 10.9193 3 10 3C9.08075 3 8.1705 3.18106 7.32122 3.53284C6.47194 3.88463 5.70026 4.40024 5.05025 5.05025C4.40024 5.70026 3.88463 6.47194 3.53284 7.32122C3.18106 8.1705 3 9.08075 3 10Z'
						stroke='white'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</button>
		</div>
	);
};
export default Search;
