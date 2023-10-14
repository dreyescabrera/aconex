import { HomePage } from '@/pages/home';
import { NotFoundPage } from '@/pages/not-found';
import { SettingsPage } from '@/pages/settings';
import { ParametersPage } from '@/pages/settings/system';
import { UsersPage } from '@/pages/settings/system/users';
import { NewUsersPage } from '@/pages/settings/system/users/new-user';
import { HolidaysPage } from '@/pages/settings/tables/holidays';
import { NewHolidaysPage } from '@/pages/settings/tables/holidays/new-holiday';
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
				path: '/configuracion/parametros',
				element: <ParametersPage />,
			},
			{
				path: '/configuracion/usuarios',
				element: <UsersPage />,
			},
			{
				path: '/configuracion/usuarios/nuevo',
				element: <NewUsersPage />,
			},
			{
				path: '/configuracion/feriados',
				element: <HolidaysPage />,
			},
			{
				path: '/configuracion/feriados/nuevo',
				element: <NewHolidaysPage />,
			},
			{
				path: '*',
				element: <NotFoundPage />,
			},
		],
	},
]);
