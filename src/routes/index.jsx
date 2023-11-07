import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';
import { NotFoundPage } from '@/pages/not-found';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/layouts/main-layout';
import { agendaRouter } from './agenda';
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
			...agendaRouter,
			...settingsRouter,
			...patientsRouter,
			{
				path: '*',
				element: <NotFoundPage />,
			},
		],
	},
	{
		path: '/login',
		element: <LoginPage />,
	},
]);
