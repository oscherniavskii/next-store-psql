import RegisterForm from '../../../components/RegisterForm/RegisterForm';

export default function RegisterPage() {
	return (
		<main>
			{/* <div className='message'>
				<p className='text'>У вас нет прав на данное действие!</p>
				<Link
					href={'/'}
					className='link'
				>{`Перейти на страницу онлайн-магазина ${process.env.SITE_NAME}`}</Link>
			</div> */}

			<RegisterForm />
		</main>
	);
}
