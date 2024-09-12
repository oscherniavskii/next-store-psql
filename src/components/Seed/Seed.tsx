import { addUsers, createProducts } from '@/services/seeder/seed';
import { FC } from 'react';
import SeedButton from './SeedButton';
import UsersButton from './UsersButton';
import './seed.scss';

const Seed: FC = () => {
	const create = async (start: number, quantity: number) => {
		'use server';
		await createProducts(start, quantity);
	};
	const add = async () => {
		'use server';
		await addUsers();
	};
	return (
		<div className='seed'>
			<div className='seed__item'>
				<UsersButton create={add}>
					Добавить Пользователей!!!
				</UsersButton>
			</div>
			<div className='seed__item'>
				<SeedButton create={create} start={1} quantity={10}>
					Добавить продукты (1-10)
				</SeedButton>
			</div>
			<div className='seed__item'>
				<SeedButton create={create} start={11} quantity={10}>
					Добавить продукты (11-20)
				</SeedButton>
			</div>
			<div className='seed__item'>
				<SeedButton create={create} start={21} quantity={10}>
					Добавить продукты (21-30)
				</SeedButton>
			</div>
			<div className='seed__item'>
				<SeedButton create={create} start={31} quantity={10}>
					Добавить продукты (31-40)
				</SeedButton>
			</div>
			<div className='seed__item'>
				<SeedButton create={create} start={41} quantity={10}>
					Добавить продукты (41-50)
				</SeedButton>
			</div>
			<div className='seed__item'>
				<SeedButton create={create} start={51} quantity={10}>
					Добавить продукты (51-60)
				</SeedButton>
			</div>
			<div className='seed__item'>
				<SeedButton create={create} start={61} quantity={10}>
					Добавить продукты (61-70)
				</SeedButton>
			</div>
			<div className='seed__item'>
				<SeedButton create={create} start={71} quantity={10}>
					Добавить продукты (71-80)
				</SeedButton>
			</div>
			<div className='seed__item'>
				<SeedButton create={create} start={81} quantity={10}>
					Добавить продукты (81-90)
				</SeedButton>
			</div>
			<div className='seed__item'>
				<SeedButton create={create} start={91} quantity={10}>
					Добавить продукты (91-100)
				</SeedButton>
			</div>
			<div className='seed__item'>
				<SeedButton create={create} start={1} quantity={100}>
					Добавить сразу 100 продуктов (1-100)
				</SeedButton>
			</div>
		</div>
	);
};

export default Seed;
