export function formatDate(dateString: string) {
	const date = new Date(dateString);

	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();

	return `${day}.${month}.${year}`;
}

export function formatDateTime(dateString?: string) {
	let date;

	if (dateString) {
		date = new Date(dateString);
	} else {
		date = new Date();
	}

	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();

	const hour = date.getHours().toString();
	const minute = date.getMinutes().toString();

	return `${day}.${month}.${year} ${hour.length === 1 ? '0' + hour : hour}:${
		minute.length === 1 ? '0' + minute : minute
	}`;
}
