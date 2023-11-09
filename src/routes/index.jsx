import { HomePage } from '@/pages/home';
import { loginLoader, LoginPage } from '@/pages/login';
import { NotFoundPage } from '@/pages/not-found';
import { createBrowserRouter } from 'react-router-dom';
import { AppLayout, appLayoutLoader, BasicLayout } from '@/layouts';
import { agendaRouter } from './agenda';
import { patientsRouter } from './patients';
import { settingsRouter } from './settings';

export const router = createBrowserRouter([
	{
		element: <AppLayout />,
		loader: appLayoutLoader,
		children: [
			{
				path: '/home',
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
		element: <BasicLayout />,
		children: [
			{
				path: '/login',
				element: <LoginPage />,
				loader: loginLoader,
			},
		],
	},
]);
