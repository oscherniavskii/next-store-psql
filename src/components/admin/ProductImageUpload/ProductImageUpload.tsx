'use client';

import ListLoader from '@/components/loaders/ListLoader/ListLoader';
import { deleteFoto, uploadFoto } from '@/helpers/imageHelpers';
import { getProductById, updateProductFoto } from '@/helpers/productHelpers';
import { IProduct } from '@/types/product.interface';
import Image from 'next/image';
import { useEffect, useState, type FC } from 'react';
import { toast } from 'react-toastify';
import './productImageUpload.scss';

interface IProductImageUpload {
	productId: number;
}

const ProductImageUpload: FC<IProductImageUpload> = ({ productId }) => {
	const [photoList, setPhotoList] = useState<string[]>([]);
	const [productName, setProductName] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const onPhotoSelect = async (index: number, file: File) => {
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
			if (photoList[index].length === 0) {
				const newPhotoList = photoList.filter(item => item !== '');
				newPhotoList.push(newFotoUrl);

				const photoData = JSON.stringify(newPhotoList);

				await updateProductFoto(+productId, photoData)
					.then((res: IProduct | undefined) => {
						if (res) {
							const photoList = JSON.parse(res.images);
							if (photoList) {
								setPhotoList(photoList);
							}
						}
					})
					.catch(e =>
						toast.error(
							'Ошибка сохранения! Возможно товар был удален!'
						)
					)
					.finally(() => setIsFetching(false));
			} else {
				const oldUrl = photoList[index];

				await deleteFoto(oldUrl)
					.then(async () => {
						const newPhotoList = photoList;
						newPhotoList[index] = newFotoUrl;

						const newPhotoListFiltered = newPhotoList.filter(
							item => item !== ''
						);

						const photoData = JSON.stringify(newPhotoListFiltered);

						await updateProductFoto(+productId, photoData)
							.then((res: IProduct | undefined) => {
								if (res) {
									const photoList = JSON.parse(res.images);
									if (photoList) {
										setPhotoList(photoList);
									}
								}
							})
							.catch(e =>
								toast.error(
									'Ошибка сохранения! Возможно товар был удален!'
								)
							);
					})
					.catch(e => toast.error('Ошибка удаления старого фото!'))
					.finally(() => setIsFetching(false));
			}
		} else {
			toast.error('Ошибка загрузки нового фото!');
			setIsFetching(false);
		}
	};

	const onPhotoDelete = async (index: number) => {
		setIsFetching(true);
		const fileUrl = photoList[index];

		await deleteFoto(fileUrl)
			.then(async () => {
				const newPhotoList = photoList;
				newPhotoList.splice(index, 1);

				const newPhotoListFiltered = newPhotoList.filter(
					item => item !== ''
				);

				if (
					!newPhotoListFiltered.length ||
					newPhotoListFiltered.length === 0
				) {
					newPhotoListFiltered.push('/not-found/not-found.webp');
				}

				const photoData = JSON.stringify(newPhotoListFiltered);

				await updateProductFoto(+productId, photoData)
					.then((res: IProduct | undefined) => {
						if (res) {
							const photoList = JSON.parse(res.images);
							if (photoList) {
								setPhotoList(photoList);
							}
						}
					})
					.catch(e =>
						toast.error(
							'Ошибка сохранения! Возможно товар был удален!'
						)
					);
			})
			.catch(e => toast.error('Ошибка удаления фото!'))
			.finally(() => setIsFetching(false));
	};

	const setPhotoToMain = async (index: number) => {
		setIsFetching(true);
		if (index && index !== 0) {
			const newPhotoList = photoList;
			const removedItem = newPhotoList.splice(index, 1)[0];
			newPhotoList.unshift(removedItem);

			const newPhotoListFiltered = newPhotoList.filter(
				item => item !== ''
			);

			const photoData = JSON.stringify(newPhotoListFiltered);

			await updateProductFoto(+productId, photoData)
				.then((res: IProduct | undefined) => {
					if (res) {
						const photoList = JSON.parse(res.images);
						if (photoList) {
							setPhotoList(photoList);
						}
					}
				})
				.catch(e =>
					toast.error('Ошибка сохранения! Возможно товар был удален!')
				)
				.finally(() => setIsFetching(false));
		} else {
			setIsFetching(false);
		}
	};

	const getProduct = async (id: number) => {
		const product = await getProductById(id);
		return product;
	};

	useEffect(() => {
		setIsLoading(true);
		getProduct(productId)
			.then((res: IProduct | undefined) => {
				if (res) {
					const photoList = JSON.parse(res.images);
					if (photoList) {
						if (
							photoList.length === 1 &&
							photoList[0] === '/not-found/not-found.webp'
						) {
							setPhotoList(['']);
						} else {
							setPhotoList(photoList);
						}
					}

					setProductName(res.name);
				}
			})
			.catch(e => console.log(e))
			.finally(() => setIsLoading(false));
	}, [productId]);

	return (
		<div className='product-foto-editor'>
			{isLoading ? (
				<ListLoader />
			) : (
				<>
					<h2 className='product-foto-editor__title'>
						<span>{'Позиция: '}</span>
						<span>{productName}</span>
					</h2>
					<div className='product-foto-editor__info'>
						(ℹ) Возможно добавить от 1 до 10 фото. Рразмер до 2 мб.
						Выбранные фото автоматически сохраняются в карточке
						товара!
					</div>

					<div className='product-foto-editor__inner'>
						{photoList.map((item, i) => (
							<div className='product-foto-editor__field' key={i}>
								{i === 0 ? (
									<span>Главное фото</span>
								) : (
									<span>{`Фото №${i + 1}`}</span>
								)}
								<label>
									{item.length > 0 && (
										<span className='product-foto-editor__preview'>
											<Image
												width={160}
												height={160}
												src={`${process.env.FOTO_URL}${item}`}
												alt={`Фото №${i + 1}`}
												priority
											/>
										</span>
									)}
									{item.length === 0 && (
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
												onPhotoSelect(
													i,
													e.target.files[0]
												);
											}
										}}
									/>
								</label>
								{item.length === 0 && i !== 0 && (
									<button
										className='product-foto-editor__dis'
										type='button'
										onClick={() =>
											setPhotoList(prevPaths => {
												const newPaths =
													prevPaths.filter(
														item => item !== ''
													);
												return newPaths;
											})
										}
									>
										Отмена
									</button>
								)}
								{item.length > 0 &&
									item !== '/not-found/not-found.webp' && (
										<button
											className='product-foto-editor__delete'
											type='button'
											onClick={() => onPhotoDelete(i)}
										>
											Удалить
										</button>
									)}
								{item.length > 0 && i !== 0 && (
									<button
										className='product-foto-editor__main'
										type='button'
										onClick={() => setPhotoToMain(i)}
									>
										Сделать главным
									</button>
								)}
							</div>
						))}
						{isError && (
							<p role='alert'>
								Ошибка! Допустимы только файлы изображений
								размером до 2 мб!
							</p>
						)}

						<div className='product-foto-editor__actions'>
							{photoList.length &&
								photoList.length < 10 &&
								photoList[photoList.length - 1].length > 0 && (
									<button
										type='button'
										onClick={() =>
											setPhotoList(prevPaths => {
												const newPaths = [...prevPaths];
												newPaths.push('');
												return newPaths;
											})
										}
									>
										Добавить еще фото
									</button>
								)}
						</div>
					</div>
				</>
			)}
			<div
				className={`product-foto-editor__overlay ${
					isFetching ? 'active' : ''
				}`}
			></div>
		</div>
	);
};

export default ProductImageUpload;
