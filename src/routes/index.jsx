import { HomePage } from '@/pages/home';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/layouts/main-layout';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
		],
	},
]);
