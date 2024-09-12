'use client';

import ListLoader from '@/components/loaders/ListLoader/ListLoader';
import { getCategoryById, updateCategoryFoto } from '@/helpers/categoryHelpers';
import { deleteFoto, uploadFoto } from '@/helpers/imageHelpers';
import { ICategory } from '@/types/category.interface';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './categoryImageUpload.scss';

interface ICategoryImageUpload {
	categoryId: number;
}

const CategoryImageUpload: FC<ICategoryImageUpload> = ({ categoryId }) => {
	const [photo, setPhoto] = useState<string>('');
	const [categoryName, setCategoryName] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const getCategory = async (id: number) => {
		const product = await getCategoryById(id);
		return product;
	};

	const onPhotoSelect = async (file: File) => {
		setIsFetching(true);
		// Проверяем, что file является изображением
		if (!file.type.startsWith('image/')) {
			setIsError(true);
			setIsFetching(false);
			return;
		}

		// Проверяем, что размер файла менее 2 МБ
		if (file.size > 2 * 1024 * 1024) {
			setIsError(true);
			setIsFetching(false);
			return;
		}

		setIsError(false);

		const newFotoUrl = await uploadFoto(file);

		if (newFotoUrl) {
			if (photo.length === 0) {
				await updateCategoryFoto(+categoryId, newFotoUrl)
					.then((res: ICategory | undefined) => {
						if (res) {
							if (res.cover) {
								setPhoto(res.cover);
							}
						}
					})
					.catch(e =>
						toast.error(
							'Ошибка сохранения! Возможно данная категория уже удалена!'
						)
					)
					.finally(() => setIsFetching(false));
			} else {
				const oldUrl = photo;

				await deleteFoto(oldUrl)
					.then(async () => {
						await updateCategoryFoto(+categoryId, newFotoUrl)
							.then((res: ICategory | undefined) => {
								if (res) {
									if (res.cover) {
										setPhoto(res.cover);
									}
								}
							})
							.catch(e =>
								toast.error(
									'Ошибка сохранения! Возможно данная категория уже удалена!'
								)
							)
							.finally(() => setIsFetching(false));
					})
					.catch(e => console.log(e));
			}
		} else {
			setIsFetching(false);
		}
	};

	const onPhotoDelete = async () => {
		setIsFetching(true);
		const fileUrl = photo;

		if (fileUrl !== '/not-found/not-found.webp') {
			await deleteFoto(fileUrl)
				.then(async () => {
					const newFotoUrl = '/not-found/not-found.webp';

					await updateCategoryFoto(+categoryId, newFotoUrl)
						.then((res: ICategory | undefined) => {
							if (res) {
								if (res.cover) {
									setPhoto(res.cover);
								}
							}
						})
						.catch(e => console.log(e));
				})
				.catch(e => console.log(e))
				.finally(() => setIsFetching(false));
		} else {
			setIsFetching(false);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		getCategory(categoryId)
			.then((res: ICategory | undefined) => {
				if (res) {
					const photo = res.cover;

					if (photo) {
						if (photo === '/not-found/not-found.webp') {
							setPhoto('');
						} else {
							setPhoto(photo);
						}
					}
					setCategoryName(res.name);
				}
			})
			.catch(e => console.log(e))
			.finally(() => setIsLoading(false));
	}, [categoryId]);

	return (
		<div className='category-foto-editor'>
			{isLoading ? (
				<ListLoader />
			) : (
				<>
					<h2 className='category-foto-editor__title'>
						<span>{'Категория: '}</span>
						<span>{categoryName}</span>
					</h2>
					<div className='category-foto-editor__info'>
						(ℹ) Возможно добавить 1 фото размером до 2 мб. Выбранное
						фото автоматически сохраняется в карточке товара!
					</div>

					<div className='category-foto-editor__inner'>
						<div className='category-foto-editor__field'>
							<span>Фото</span>
							<label>
								{photo.length > 0 && (
									<span className='category-foto-editor__preview'>
										<Image
											width={160}
											height={160}
											src={`${process.env.FOTO_URL}${photo}`}
											alt='Фото категории'
											priority
										/>
									</span>
								)}

								{photo.length === 0 && (
									<span role='button' tabIndex={0}>
										Выбрать фото
									</span>
								)}
								<input
									type='file'
									accept='image/*'
									tabIndex={-1}
									onChange={e => {
										if (
											e.target.files &&
											e.target.files[0]
										) {
											onPhotoSelect(e.target.files[0]);
										}
									}}
								/>
							</label>
							{photo.length > 0 &&
								photo !==
									'/not-found/category-not-found.webp' && (
									<button
										className='category-foto-editor__delete'
										type='button'
										onClick={() => onPhotoDelete()}
									>
										Удалить
									</button>
								)}
						</div>

						{isError && (
							<p role='alert'>
								Ошибка! Допустимы только файлы изображений
								размером до 2 мб!
							</p>
						)}
					</div>
				</>
			)}
			<div
				className={`category-foto-editor__overlay ${
					isFetching ? 'active' : ''
				}`}
			></div>
		</div>
	);
};

export default CategoryImageUpload;
