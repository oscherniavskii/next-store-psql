export interface IMockUser {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phone: string;
	adress: string;
}

export const users = [
	{
		firstName: 'Аркадий',
		lastName: 'Паровозов',
		email: 'ark@test.com',
		password: '12345678',
		phone: '+123456789',
		adress: 'Adress'
	},
	{
		firstName: 'Лев',
		lastName: 'Толстой',
		email: 'lev@test.com',
		password: '12345678',
		phone: '+234567891',
		adress: 'Adress'
	},
	{
		firstName: 'Анна',
		lastName: 'Каренина',
		email: 'ann@test.com',
		password: '12345678',
		phone: '+345678912',
		adress: 'Adress'
	},
	{
		firstName: 'Юлия',
		lastName: 'Скворцова',
		email: 'yul@test.com',
		password: '12345678',
		phone: '+456789123',
		adress: 'Adress'
	},
	{
		firstName: 'Петр',
		lastName: 'Петров',
		email: 'pet@test.com',
		password: '12345678',
		phone: '+567891234',
		adress: 'Adress'
	},
	{
		firstName: 'Тест',
		lastName: 'Тест',
		email: 'test@test.com',
		password: '12345678',
		phone: '+1234567890',
		adress: 'Adress'
	}
];
