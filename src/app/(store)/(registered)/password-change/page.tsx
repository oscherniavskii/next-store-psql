import PasswordChange from '@/components/PasswordChange/PasswordChange';
import SectionLayout from '@/components/SectionLayout/SectionLayout';
import SectionTitle from '@/components/SectionTitle/SectionTitle';

export default function PasswordChangePage() {
	return (
		<SectionLayout noPadding>
			<SectionTitle>Смена пароля профиля</SectionTitle>
			<PasswordChange />
		</SectionLayout>
	);
}
