import { FC } from 'react';
import Button from '../ui/Button/Button';
import './notFound.scss';

interface INotFound {
	variant: 'product' | 'brand' | 'category';
}

const NotFound: FC<INotFound> = ({ variant }) => {
	let title: string;

	if (variant === 'product') {
		title = 'товар, который';
	} else if (variant === 'brand') {
		title = 'бренд, который';
	} else {
		title = 'категория, которую';
	}

	return (
		<main className='prod-not-foun'>
			<div className='prod-not-foun__container'>
				<div className='prod-not-foun__inner'>
					<h3 className='prod-not-foun__title'>
						Запрошенная страница отсутствует!
					</h3>
					<p className='prod-not-foun__text'>{`Скорее всего ${title} Вы ищете, более не существует!`}</p>
					<p className='prod-not-foun__text'>
						Перейдите на главную страницу или в каталог для поиска!
					</p>
					<div className='prod-not-foun__actions'>
						<Button variant='link' href='/'>
							Главная
						</Button>
						<Button variant='link' href='/explorer?searchTerm='>
							Каталог
						</Button>
					</div>
				</div>
			</div>
		</main>
	);
};

export default NotFound;
