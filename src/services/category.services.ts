import prisma from '@/libs/prismadb';
import { CategoryData } from '@/types/category.interface';
import { IHistory } from '@/types/history.interface';
import { formatDateTime } from '@/utils/format-date';
import { generateSlug } from '@/utils/generate-slug';
import { notFoundCategory } from '@/utils/not-found-objects';

export async function getAllCategories() {
	return prisma.category.findMany({
		select: {
			id: true,
			name: true,
			slug: true,
			cover: true,
			priority: true,
			products: {
				select: {
					name: true
				}
			},
			history: true
		},
		orderBy: {
			nameS: 'asc'
		}
	});
}

export async function getCategoryById(id: number) {
	const category = await prisma.category.findUnique({
		where: {
			id
		},
		select: {
			id: true,
			name: true,
			slug: true,
			cover: true,
			priority: true,
			history: true
		}
	});

	if (!category) return notFoundCategory;

	return category;
}

export async function getCategoryBySlug(slug: string) {
	const category = await prisma.category.findUnique({
		where: {
			slug
		},
		select: {
			id: true,
			name: true,
			slug: true,
			cover: true,
			priority: true,
			history: true
		}
	});

	if (!category) return notFoundCategory;

	return category;
}

export async function updateCategory(
	id: number,
	data: CategoryData,
	userId: number,
	userEmail: string
) {
	try {
		const currentCategory = await getCategoryById(id);

		if (currentCategory && currentCategory.id === 2123456789)
			return notFoundCategory;

		let historyArray: IHistory[] = [];

		if (currentCategory.history)
			historyArray = JSON.parse(currentCategory.history);

		const newHistory = {
			id: userId,
			email: userEmail,
			time: formatDateTime()
		};

		historyArray.push(newHistory);

		const category = await prisma.category.update({
			where: {
				id
			},
			data: {
				name: data.name,
				slug: generateSlug(data.name),
				nameS: data.name.toLowerCase(),
				cover: data.cover,
				priority: data.priority,
				history: JSON.stringify(historyArray)
			}
		});

		return category;
	} catch (error: any) {
		if (
			(error.code === 'P2002' && error.meta.target.includes('name')) ||
			(error.code === 'P2002' && error.meta.target.includes('slug'))
		) {
			return notFoundCategory;
		} else {
			console.log('Update category error:', error);
		}
	}
}

export async function updatePriority(
	id: number,
	data: number,
	userId: number,
	userEmail: string
) {
	const currentCategory = await getCategoryById(id);

	if (currentCategory && currentCategory.id === 2123456789)
		return notFoundCategory;

	let historyArray: IHistory[] = [];

	if (currentCategory.history)
		historyArray = JSON.parse(currentCategory.history);

	const newHistory = {
		id: userId,
		email: userEmail,
		time: formatDateTime()
	};

	historyArray.push(newHistory);

	return prisma.category.update({
		where: {
			id
		},
		data: {
			priority: data,
			history: JSON.stringify(historyArray)
		}
	});
}

export async function updateCategoryFoto(
	id: number,
	data: string,
	userId: number,
	userEmail: string
) {
	const currentCategory = await getCategoryById(id);

	if (currentCategory && currentCategory.id === 2123456789)
		throw new Error('Category not found!');

	let historyArray: IHistory[] = [];

	if (currentCategory.history)
		historyArray = JSON.parse(currentCategory.history);

	const newHistory = {
		id: userId,
		email: userEmail,
		time: formatDateTime()
	};

	historyArray.push(newHistory);

	return prisma.category.update({
		where: {
			id
		},
		data: {
			cover: data,
			history: JSON.stringify(historyArray)
		}
	});
}

export async function createCategory(
	data: { name: string; cover: string },
	userId: number,
	userEmail: string
) {
	try {
		const historyArray = [
			{ id: userId, email: userEmail, time: formatDateTime() }
		];

		const newCategory = await prisma.category.create({
			data: {
				name: data.name,
				slug: generateSlug(data.name),
				nameS: data.name.toLowerCase(),
				cover: data.cover,
				history: JSON.stringify(historyArray)
			}
		});

		return newCategory;
	} catch (error: any) {
		if (
			(error.code === 'P2002' && error.meta.target.includes('name')) ||
			(error.code === 'P2002' && error.meta.target.includes('slug'))
		) {
			return notFoundCategory;
		} else {
			console.log('Create category service error:', error);
		}
	}
}

export async function deleteCategory(id: number) {
	const deletedCategory = await prisma.category.delete({
		where: {
			id
		}
	});

	return deletedCategory;
}
