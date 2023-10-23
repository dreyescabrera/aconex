import { HomePage } from '@/pages/home';
import { NotFoundPage } from '@/pages/not-found';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/layouts/main-layout';
import { patientsRouter } from './patients';
import { settingsRouter } from './settings';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			...settingsRouter,
			...patientsRouter,
			{
				path: '*',
				element: <NotFoundPage />,
			},
		],
	},
]);
