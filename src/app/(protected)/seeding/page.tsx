import SectionLayout from '@/components/SectionLayout/SectionLayout';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import Seed from '@/components/Seed/Seed';

export default function TestPage() {
	return (
		<SectionLayout noPadding>
			<SectionTitle>Добавление тестовых данных</SectionTitle>
			<Seed />
		</SectionLayout>
	);
}
