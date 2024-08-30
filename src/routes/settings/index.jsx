const SettingsPage = () => import('@/pages/settings');
const ParametersPage = () => import('@/pages/settings/system');
const UsersPage = () => import('@/pages/settings/system/users');
const EditUserPage = () => import('@/pages/settings/system/users/edit-user');
const NewUsersPage = () => import('@/pages/settings/system/users/new-user');
const HolidaysPage = () => import('@/pages/settings/tables/holidays');
const NewHolidaysPage = () => import('@/pages/settings/tables/holidays/new-holiday');
const ProfessionalsPage = () => import('@/pages/settings/tables/professionals');
const SpecialtiesPage = () => import('@/pages/settings/tables/specialties');
const NewSpecialtiesPage = () => import('@/pages/settings/tables/specialties/new-specialty');

/**
 * @type {Array<import('react-router-dom').RouteObject>}
 */
export const settingsRouter = [
	{
		path: '/configuracion',
		lazy: SettingsPage,
	},
	{
		path: '/configuracion/parametros',
		lazy: ParametersPage,
	},
	{
		path: '/configuracion/usuarios',
		lazy: UsersPage,
	},
	{
		path: '/configuracion/usuarios/nuevo',
		loader: async () => {
			const { protectionAdminRoute } = await import('../protection/protection-admin');
			return protectionAdminRoute();
		},
		lazy: NewUsersPage,
	},
	{
		path: '/configuracion/usuarios/editar',
		lazy: EditUserPage,
	},
	{
		path: '/configuracion/profesionales',
		lazy: ProfessionalsPage,
	},
	{
		path: '/configuracion/especialidades',
		lazy: SpecialtiesPage,
	},
	{
		path: '/configuracion/especialidades/nuevo',
		lazy: NewSpecialtiesPage,
	},
	{
		path: '/configuracion/feriados',
		lazy: HolidaysPage,
	},
	{
		path: '/configuracion/feriados/nuevo',
		lazy: NewHolidaysPage,
	},
];
