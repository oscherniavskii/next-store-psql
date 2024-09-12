import Button from '@/components/ui/Button/Button';

export default function NotFound() {
	return (
		<div className='not-found'>
			<div className='not-found__404'>404</div>
			<h2 className='not-found__title'>Страница не найдена</h2>
			<p className='not-found__text'>
				Неправильно набран адрес или такой страницы не существует
			</p>
			<Button variant='link'>Вернуться в магазин</Button>
		</div>
	);
}
