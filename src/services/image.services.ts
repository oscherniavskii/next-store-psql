import { axiosClassic } from '@/api/api.interceptor';
import https from 'https';

//удаление фото (несколько)
export async function deleteFotos(photos: string[]) {
	try {
		const res = await axiosClassic<{ message: string }>({
			url: `${process.env.FOTO_URL}/delete-multiple`,
			method: 'POST',
			data: { filenames: photos },
			httpsAgent: new https.Agent({ rejectUnauthorized: false })
		});

		return res.data.message;
	} catch (error) {
		console.log(error);
	}
}
