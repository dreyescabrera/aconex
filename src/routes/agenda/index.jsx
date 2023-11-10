const AgendaPage = () => import('@/pages/agenda');
const EditShiftPage = () => import('@/pages/agenda/edit-shift');
const NewOvertimePage = () => import('@/pages/agenda/new-overtime');
const NewShiftPage = () => import('@/pages/agenda/new-shift');

/**
 * @type {Array<import('react-router-dom').RouteObject>}
 */
export const agendaRouter = [
	{
		path: '/agenda',
		lazy: AgendaPage,
	},
	{
		path: '/agenda/nuevo_turno',
		lazy: NewShiftPage,
	},
	{
		path: '/agenda/nuevo_sobreturno',
		lazy: NewOvertimePage,
	},
	{
		path: '/agenda/editar_turno',
		lazy: EditShiftPage,
	},
];
