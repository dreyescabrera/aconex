import { createBrowserRouter } from 'react-router-dom';
import { agendaRouter } from './agenda';
import { patientsRouter } from './patients';
import { settingsRouter } from './settings';

const Home = () => import('@/pages/home');
const Login = () => import('@/pages/login');
const NotFound = () => import('@/pages/not-found');
const AppLayout = () => import('@/layouts/app-layout');
const BasicLayout = () => import('@/layouts/basic-layout');

export const router = createBrowserRouter([
	{
		lazy: AppLayout,
		loader: async () => {
			const { appLayoutLoader } = await import('@/layouts/app-layout-loader');
			return appLayoutLoader();
		},
		children: [
			{
				path: '/home',
				lazy: Home,
			},
			...agendaRouter,
			...settingsRouter,
			...patientsRouter,
			{
				path: '*',
				lazy: NotFound,
			},
		],
	},
	{
		lazy: BasicLayout,
		children: [
			{
				path: '/login',
				lazy: Login,
			},
		],
	},
]);
