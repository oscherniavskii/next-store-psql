'use client';

import { axiosClassic } from '@/api/api.interceptor';
import PageLoader from '@/components/loaders/PageLoader/PageLoader';
import { useEffect, useState } from 'react';
import './activation.scss';

interface TypeParamSlug {
	link: string;
}

interface IPageSlugParam {
	params: TypeParamSlug;
}

export default function ActivationPage({ params }: IPageSlugParam) {
	const [isActive, setIsActive] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axiosClassic(`/auth/activate/${params.link}`)
			.then(res => setIsActive(res.data.isActive))
			.catch((error: unknown) => console.log(error))
			.finally(() => setIsLoading(false));
	}, [params.link]);

	return (
		<main className='activation'>
			<div className='activation__container'>
				{isLoading ? (
					<PageLoader />
				) : isActive ? (
					<>
						<span>
							Вы успешно активировали свою учетную запись!
						</span>
						<span>
							Спасибо, что присоединились к нам! Хороших покупок!
						</span>
					</>
				) : (
					<>
						<span className='error'>Ошибка активации!</span>
						<span className='error'>Что-то пошло не так!</span>
					</>
				)}
			</div>
		</main>
	);
}
