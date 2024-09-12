import prisma from '@/libs/prismadb';
import { BrandData } from '@/types/brand.interface';
import { IHistory } from '@/types/history.interface';
import { formatDateTime } from '@/utils/format-date';
import { generateSlug } from '@/utils/generate-slug';
import { notFoundBrand } from '@/utils/not-found-objects';

export async function getAllBrands() {
	return prisma.brand.findMany({
		select: {
			id: true,
			name: true,
			slug: true,
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

export async function getBrandById(id: number) {
	const brand = await prisma.brand.findUnique({
		where: {
			id
		},
		select: {
			id: true,
			name: true,
			slug: true,
			history: true
		}
	});

	if (!brand) return notFoundBrand;

	return brand;
}

export async function getBrandBySlug(slug: string) {
	const brand = await prisma.brand.findUnique({
		where: {
			slug
		},
		select: {
			id: true,
			name: true,
			slug: true,
			history: true
		}
	});

	if (!brand) return notFoundBrand;

	return brand;
}

export async function updateBrand(
	id: number,
	data: BrandData,
	userId: number,
	userEmail: string
) {
	try {
		const currentBrand = await getBrandById(id);

		if (currentBrand && currentBrand.id === 2123456789)
			return notFoundBrand;

		let historyArray: IHistory[] = [];

		if (currentBrand.history)
			historyArray = JSON.parse(currentBrand.history);

		const newHistory = {
			id: userId,
			email: userEmail,
			time: formatDateTime()
		};

		historyArray.push(newHistory);

		const brand = await prisma.brand.update({
			where: {
				id
			},
			data: {
				name: data.name,
				slug: generateSlug(data.name),
				nameS: data.name.toLowerCase(),
				history: JSON.stringify(historyArray)
			}
		});

		return brand;
	} catch (error: any) {
		if (
			(error.code === 'P2002' && error.meta.target.includes('name')) ||
			(error.code === 'P2002' && error.meta.target.includes('slug'))
		) {
			return notFoundBrand;
		} else {
			console.log('Update brand error:', error);
		}
	}
}

export async function createBrand(
	data: string,
	userId: number,
	userEmail: string
) {
	try {
		const historyArray = [
			{ id: userId, email: userEmail, time: formatDateTime() }
		];

		const newBrand = await prisma.brand.create({
			data: {
				name: data,
				slug: generateSlug(data),
				nameS: data.toLowerCase(),
				history: JSON.stringify(historyArray)
			}
		});

		return newBrand;
	} catch (error: any) {
		if (
			(error.code === 'P2002' && error.meta.target.includes('name')) ||
			(error.code === 'P2002' && error.meta.target.includes('slug'))
		) {
			return notFoundBrand;
		} else {
			console.log('Create brand error:', error);
		}
	}
}

export async function deleteBrand(id: number) {
	const deletedBrand = await prisma.brand.delete({
		where: {
			id
		}
	});

	return deletedBrand;
}
