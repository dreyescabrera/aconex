import { HomePage } from '@/pages/home';
import { NotFoundPage } from '@/pages/not-found';
import { SettingsPage } from '@/pages/settings';
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
			{
				path: '/configuracion',
				element: <SettingsPage />,
			},
			{
				path: '*',
				element: <NotFoundPage />,
			},
		],
	},
]);
