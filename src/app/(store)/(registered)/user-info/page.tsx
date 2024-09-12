import SectionLayout from '@/components/SectionLayout/SectionLayout';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import UserInfo from '@/components/UserInfo/UserInfo';

export default function UserInfoPage() {
	return (
		<SectionLayout noPadding>
			<SectionTitle>Информация профиля</SectionTitle>
			<UserInfo />
		</SectionLayout>
	);
}
