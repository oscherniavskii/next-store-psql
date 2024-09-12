import NotFound from '@/components/NotFound/NotFound';
import SectionLayout from '@/components/SectionLayout/SectionLayout';
import CategoryImageUpload from '@/components/admin/CategoryImageUpload/CategoryImageUpload';
import {
	getAllCategories,
	getCategoryById
} from '@/services/category.services';
import { IPageIdParam } from '@/types/page-params';
import { Metadata } from 'next';

export async function generateStaticParams(): Promise<IPageIdParam[] | any> {
	const categories = await getAllCategories();

	if (categories) {
		return categories.map(category => {
			return {
				params: { id: category.id }
			};
		});
	}
}

export async function generateMetadata({
	params
}: IPageIdParam): Promise<Metadata> {
	const category = await getCategoryById(Number(params?.id));

	return {
		title: `Редактирование изображения категории ${category?.name} | ${process.env.SITE_NAME}`,
		robots: { index: false, follow: false }
	};
}

export default async function CategoryPage({ params }: IPageIdParam) {
	const category = await getCategoryById(Number(params?.id));

	//Обработка отсутствующих категорий
	if (category.id === 2123456789) return <NotFound variant='category' />;

	return (
		<main>
			<SectionLayout noPadding title='Редактирование фото категории'>
				<CategoryImageUpload categoryId={Number(params?.id)} />
			</SectionLayout>
		</main>
	);
}
