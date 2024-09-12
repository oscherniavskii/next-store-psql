import SectionLayout from '@/components/SectionLayout/SectionLayout';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import AdminButton from '@/components/Seed/AdminButton';
import { addAdminUser } from '@/services/seeder/seed';

export default function AddAdminPage() {
	const addUser = async () => {
		'use server';
		await addAdminUser();
	};
	return (
		<SectionLayout noPadding>
			<SectionTitle>
				Добавление учетной записи администратора!!!
			</SectionTitle>
			<AdminButton create={addUser}>-=Добавить=-</AdminButton>
		</SectionLayout>
	);
}
