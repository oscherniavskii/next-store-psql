import { useDebounce } from '@/hooks/useDebounce';
import { FC, useEffect, useState } from 'react';
import './range.scss';

interface IRange {
	min?: number;
	max?: number;
	fromInitial?: string;
	toInitial?: string;
	onChangeFrom: (value: string) => void;
	onChangeTo: (value: string) => void;
}

const Range: FC<IRange> = ({
	max,
	min = 0,
	fromInitial,
	toInitial,
	onChangeFrom,
	onChangeTo
}) => {
	const [fromValue, setFromValue] = useState(fromInitial || '');
	const [toValue, setToValue] = useState(toInitial || '');

	const debouncedFromValue = useDebounce(fromValue, 500);
	const debouncedToValue = useDebounce(toValue, 500);

	useEffect(() => {
		onChangeFrom(debouncedFromValue);
	}, [debouncedFromValue]);

	useEffect(() => {
		onChangeTo(debouncedToValue);
	}, [debouncedToValue]);

	return (
		<div className='range'>
			<input
				type='number'
				min={min}
				max={max}
				placeholder='От'
				value={fromValue}
				onChange={e => setFromValue(e.target.value)}
			/>
			{' - '}
			<input
				type='number'
				min={min}
				max={max}
				placeholder='До'
				value={toValue}
				onChange={e => setToValue(e.target.value)}
			/>
		</div>
	);
};

export default Range;
