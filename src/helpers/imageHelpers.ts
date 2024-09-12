import { axiosClassic } from '@/api/api.interceptor';

//сохранение фото
export async function uploadFoto(photo: File) {
	try {
		const formData = new FormData();
		formData.append('photo', photo);

		const res = await axiosClassic<{ url: string }>({
			url: `${process.env.FOTO_URL}/upload`,
			method: 'POST',
			data: formData,
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});

		return res.data.url;
	} catch (error) {
		console.log(error);
	}
}

//удаление фото
export async function deleteFoto(photo: string) {
	try {
		const res = await axiosClassic<{ message: string }>({
			url: `${process.env.FOTO_URL}/delete${photo}`,
			method: 'DELETE'
		});

		return res.data.message;
	} catch (error) {
		console.log(error);
	}
}
