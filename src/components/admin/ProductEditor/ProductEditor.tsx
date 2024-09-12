'use client';

import ListLoader from '@/components/loaders/ListLoader/ListLoader';
import {
	createProduct,
	getProductById,
	updateProduct
} from '@/helpers/productHelpers';
import { useBrands } from '@/hooks/useBrands';
import { useCategories } from '@/hooks/useCategories';
import { IProduct } from '@/types/product.interface';
import { TypeProductData, TypeProductEditData } from '@/types/product.types';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { useFieldArray, useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import './productEditor.scss';

interface IProductEditor {
	productId?: number;
	type: 'edit' | 'new';
}

const ProductEditor: FC<IProductEditor> = ({ productId, type }) => {
	const {
		register,
		formState: { errors, defaultValues },
		handleSubmit,
		reset,
		setValue,
		getValues,
		control,
		setError,
		clearErrors
	} = useForm<TypeProductEditData>({
		defaultValues: {
			name: '',
			description: '',
			price: 0,
			oldPrice: 0,
			availability: true,
			options: [{ char: '', value: '' }]
		}
	});

	const {
		fields: optionFields,
		append: optionAppend,
		remove: optionRemove
	} = useFieldArray({
		control,
		name: 'options'
	});

	const [product, setProduct] = useState<IProduct | null>(null);

	const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isSubmitError, setIsSubmitError] = useState<boolean>(false);
	const { data: categories, isLoading: categoriesLoading } = useCategories();
	const { data: brands, isLoading: brandsLoading } = useBrands();
	const router = useRouter();

	const onSubmit: SubmitHandler<TypeProductEditData> = async data => {
		if (
			!data.options.length ||
			(data.options.length > 0 && data.options[0].char.length === 0)
		) {
			setError('options', {
				message: 'Укажите минимум 1 характеристику!'
			});
		} else {
			setIsSubmiting(true);

			const optionsString = JSON.stringify(data.options);

			let imagesArray: string[] = [];

			if (product && product.images) {
				const currentImages = JSON.parse(product.images);

				if (currentImages.length > 0) {
					imagesArray = currentImages;
				} else {
					imagesArray = ['/not-found/not-found.webp'];
				}
			} else {
				imagesArray = ['/not-found/not-found.webp'];
			}

			const imagesString = JSON.stringify(imagesArray);

			const reqestData: TypeProductData = {
				name: data.name,
				description: data.description,
				price: +data.price,
				oldPrice: +data.oldPrice,
				availability: data.availability,
				categoryId: +data.categoryId,
				brandId: +data.brandId,
				options: optionsString,
				images: imagesString
			};

			if (type === 'edit') {
				if (productId) {
					await updateProduct(+productId, reqestData)
						.then((res: IProduct | undefined) => {
							if (res) {
								if (res.id === 2123456789) {
									setIsSubmitError(true);
								} else {
									reset();
									router.push('/admin/products');
								}
							}
						})
						.catch((error: unknown) =>
							toast.error(
								'Ошибка сохранения! Возможно товар был удален!'
							)
						)
						.finally(() => setIsSubmiting(false));
				}
			} else {
				await createProduct(reqestData)
					.then((res: IProduct | undefined) => {
						if (res) {
							if (res.id === 2123456789) {
								setIsSubmitError(true);
							} else {
								reset();
								router.push('/admin/products');
							}
						}
					})
					.catch((error: unknown) =>
						toast.error(
							'Ошибка сохранения! Проверьте введенные данные!'
						)
					)
					.finally(() => setIsSubmiting(false));
			}
		}
	};

	const onReset = () => {
		if (type === 'edit') {
			if (product) {
				setValue('name', product.name);
				setValue('description', product.description);
				setValue('price', product.price);
				setValue('oldPrice', product.oldPrice);
				setValue('availability', product.availability);

				if (product.category)
					setValue('categoryId', product.category.id);
				if (product.brand) setValue('brandId', product.brand.id);

				let existingOptions;
				if (product.options)
					existingOptions = JSON.parse(product.options);
				if (existingOptions) {
					setValue('options', existingOptions);
				}
			}
		} else {
			reset();
		}
	};

	const getProduct = async (id: number) => {
		const product = await getProductById(id);
		return product;
	};

	useEffect(() => {
		if (type === 'edit' && productId) {
			setIsLoading(true);
			getProduct(productId)
				.then((res: IProduct | undefined) => {
					if (res) {
						setValue('name', res.name);
						setValue('description', res.description);
						setValue('price', res.price);
						setValue('oldPrice', res.oldPrice);
						setValue('availability', res.availability);

						if (res.category)
							setValue('categoryId', res.category.id);
						if (res.brand) setValue('brandId', res.brand.id);

						let existingOptions;
						if (res.options)
							existingOptions = JSON.parse(res.options);
						if (existingOptions) {
							setValue('options', existingOptions);
						}

						setProduct(res);
					}
				})
				.catch(e => console.log(e))
				.finally(() => setIsLoading(false));
		} else {
			setIsLoading(false);
		}
	}, [productId, type]);

	useEffect(() => {
		if (!categoriesLoading && categories) {
			setValue('categoryId', categories[0].id);
		}
	}, [categoriesLoading, categories]);

	useEffect(() => {
		if (!brandsLoading && brands) {
			setValue('brandId', brands[0].id);
		}
	}, [brandsLoading, brands]);

	return (
		<div className='product-editor'>
			{isLoading ? (
				<ListLoader />
			) : (
				<>
					{type === 'edit' && (
						<h2 className='product-editor__title'>
							<span>{'Позиция: '}</span>
							<span>{getValues('name')}</span>
						</h2>
					)}

					<div className='product-editor__inner'>
						<form
							className='product-editor__form'
							onSubmit={handleSubmit(onSubmit)}
						>
							<h3 className='product-editor__subtitle'>
								Основное
							</h3>
							<div className='product-editor__block product-editor__block--main'>
								<div className='product-editor__field'>
									<label>
										<span>Название* </span>
										<input
											type='text'
											placeholder='Введите название'
											{...register('name', {
												required:
													'Название товара обязательно!',
												onChange: () =>
													setIsSubmitError(false)
											})}
											disabled={isSubmiting}
										/>
									</label>
									{errors.name && (
										<p role='alert'>
											{errors.name.message}
										</p>
									)}
									{isSubmitError && (
										<p role='alert'>
											Ошибка сохранения! Название товара
											должно быть уникальным!
										</p>
									)}
								</div>

								<div className='product-editor__field'>
									<label>
										<span>Описание* </span>
										<textarea
											placeholder='Введите описание'
											{...register('description', {
												required:
													'Описание товара обязательно!'
											})}
											disabled={isSubmiting}
											rows={5}
										/>
									</label>
									{errors.description && (
										<p role='alert'>
											{errors.description.message}
										</p>
									)}
								</div>

								<div className='product-editor__field'>
									<label>
										<span>Текущая цена* </span>
										<input
											type='text'
											{...register('price', {
												required:
													'Цена товара обязательна!',
												pattern: {
													value: /^\d*\.?\d*$/,
													message:
														'Разрешены только цифры и точка'
												}
											})}
											disabled={isSubmiting}
										/>
									</label>
									{errors.price && (
										<p role='alert'>
											{errors.price.message}
										</p>
									)}
								</div>

								<div className='product-editor__field'>
									<label>
										<span>Цена до скидки* </span>
										<input
											type='text'
											{...register('oldPrice', {
												required:
													'Цена товара обязательна!',
												pattern: {
													value: /^\d*\.?\d*$/,
													message:
														'Разрешены только цифры и точка'
												}
											})}
											disabled={isSubmiting}
										/>
									</label>
									{errors.oldPrice && (
										<p role='alert'>
											{errors.oldPrice.message}
										</p>
									)}
									<div className='product-editor__info'>
										(ℹ) Если скидки нет то нужно указывать
										одинаковые цены
									</div>
								</div>

								<div className='product-editor__field'>
									<label>
										<span>В наличии </span>
										<input
											type='checkbox'
											{...register('availability', {})}
											disabled={isSubmiting}
										/>
									</label>
									{errors.availability && (
										<p role='alert'>
											{errors.availability.message}
										</p>
									)}
								</div>

								<div className='product-editor__field'>
									<label>
										<span>Категория* </span>
										<select
											{...register('categoryId', {
												required:
													'Категория товара обязательна!'
											})}
											disabled={isSubmiting}
										>
											{categoriesLoading ? (
												<option>ЗАГРУЗКА</option>
											) : (
												categories?.map(category => (
													<option
														key={category.id}
														value={category.id}
													>
														{category.name}
													</option>
												))
											)}
										</select>
									</label>
									{errors.categoryId && (
										<p role='alert'>
											{errors.categoryId.message}
										</p>
									)}
								</div>

								<div className='product-editor__field'>
									<label>
										<span>Бренд* </span>
										<select
											{...register('brandId', {
												required:
													'Бренд товара обязателен!'
											})}
											disabled={isSubmiting}
										>
											{brandsLoading ? (
												<option>ЗАГРУЗКА</option>
											) : (
												brands?.map(brand => (
													<option
														key={brand.id}
														value={brand.id}
													>
														{brand.name}
													</option>
												))
											)}
										</select>
									</label>
									{errors.brandId && (
										<p role='alert'>
											{errors.brandId.message}
										</p>
									)}
								</div>
							</div>

							<h3 className='product-editor__subtitle'>
								Характеристики товара
							</h3>

							<div className='product-editor__block product-editor__block--options'>
								{optionFields.map((field, index) => (
									<div
										className='product-editor__option'
										key={field.id}
									>
										<label>
											<span>Наименование</span>
											<input
												{...register(
													`options.${index}.char`,
													{
														onChange: () =>
															clearErrors(
																'options'
															)
													}
												)}
												placeholder='Наименование характеристики'
											/>
										</label>
										<label>
											<span>Значение</span>
											<input
												{...register(
													`options.${index}.value`,
													{
														onChange: () =>
															clearErrors(
																'options'
															)
													}
												)}
												placeholder='Значение характеристики'
											/>
										</label>
										<button
											type='button'
											onClick={() => optionRemove(index)}
										>
											Удалить
										</button>
									</div>
								))}
								{errors.options && (
									<p role='alert'>{errors.options.message}</p>
								)}
								<div className='product-editor__add'>
									<button
										type='button'
										onClick={() =>
											optionAppend({
												char: '',
												value: ''
											})
										}
									>
										Добавить характеристику
									</button>
								</div>
							</div>

							<div className='product-editor__actions'>
								<button
									className={`product-editor__btn ${
										isSubmiting ? 'product-editor--dis' : ''
									}`}
									type='submit'
									disabled={isSubmiting}
								>
									Сохранить
								</button>
								<button
									className={`product-editor__btn ${
										isSubmiting ? 'product-editor--dis' : ''
									}`}
									type='button'
									disabled={isSubmiting}
									onClick={onReset}
									title='Кроме фото'
								>
									Сброс несохраненных изменений
								</button>
							</div>
						</form>
					</div>
				</>
			)}
		</div>
	);
};

export default ProductEditor;
