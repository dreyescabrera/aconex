import { SettingsPage } from '@/pages/settings';
import { ParametersPage } from '@/pages/settings/system';
import { UsersPage } from '@/pages/settings/system/users';
import { NewUsersPage } from '@/pages/settings/system/users/new-user';
import { HolidaysPage } from '@/pages/settings/tables/holidays';
import { NewHolidaysPage } from '@/pages/settings/tables/holidays/new-holiday';
import { ProfessionalsPage } from '@/pages/settings/tables/professionals';
import { SpecialtiesPage } from '@/pages/settings/tables/specialties';
import { NewSpecialtiesPage } from '@/pages/settings/tables/specialties/new-specialty';

/**
 * @type {Array<import('react-router-dom').RouteObject>}
 */
export const settingsRouter = [
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
		path: '/configuracion/profesionales',
		element: <ProfessionalsPage />,
	},
	{
		path: '/configuracion/especialidades',
		element: <SpecialtiesPage />,
	},
	{
		path: '/configuracion/especialidades/nuevo',
		element: <NewSpecialtiesPage />,
	},
	{
		path: '/configuracion/feriados',
		element: <HolidaysPage />,
	},
	{
		path: '/configuracion/feriados/nuevo',
		element: <NewHolidaysPage />,
	},
];
