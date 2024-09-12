import StoreProvider from '@/providers/StoreProvider';
// import { Roboto } from 'next/font/google';
import localFont from 'next/font/local';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.scss';

// const roboto = Roboto({
// 	weight: ['300', '400', '500', '700', '900'],
// 	style: ['normal'],
// 	subsets: ['latin'],
// 	variable: '--font-roboto',
// 	display: 'swap'
// });

const roboto = localFont({
	src: [
		{
			path: '../assets/fonts/Roboto-Regular.woff2',
			weight: '400',
			style: 'normal'
		},
		{
			path: '../assets/fonts/Roboto-Medium.woff2',
			weight: '500',
			style: 'normal'
		},
		{
			path: '../assets/fonts/Roboto-Bold.woff2',
			weight: '700',
			style: 'normal'
		},
		{
			path: '../assets/fonts/Roboto-Black.woff2',
			weight: '900',
			style: 'normal'
		}
	],
	variable: '--font-roboto',
	display: 'swap'
});

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='ru' className={`${roboto.variable}`}>
			<body>
				<StoreProvider>
					<div className='wrapper'>{children}</div>
					<ToastContainer
						position='top-center'
						autoClose={5000}
						hideProgressBar={true}
						newestOnTop={false}
						closeOnClick
						theme='colored'
					/>
				</StoreProvider>
			</body>
		</html>
	);
}
