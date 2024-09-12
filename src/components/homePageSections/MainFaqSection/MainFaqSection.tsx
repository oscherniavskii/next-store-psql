import { FC } from 'react';

import Faq from '@/components/Faq/Faq';
import { faqData } from './faqData';
import './mainFaqSection.scss';

const MainFaqSection: FC = () => {
	const data = faqData;
	return (
		<div className='main-faq-section'>
			{data.map(item => (
				<Faq key={item.question} question={item.question}>
					{item.answer}
				</Faq>
			))}
		</div>
	);
};

export default MainFaqSection;
