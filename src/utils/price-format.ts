export const priceConvert = (price: number) => {
	const currency = process.env.CURRENCY;
	return `${price.toFixed(2).replace('.', ',')} ${currency}`;
};
