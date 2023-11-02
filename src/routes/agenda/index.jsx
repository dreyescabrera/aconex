import { AgendaPage } from '@/pages/agenda';
import { NewOvertimePage } from '@/pages/agenda/new-overtime';
import { NewShiftPage } from '@/pages/agenda/new-shift';

/**
 * @type {Array<import('react-router-dom').RouteObject>}
 */
export const agendaRouter = [
	{
		path: '/agenda',
		element: <AgendaPage />,
	},
	{
		path: '/agenda/nuevo_turno',
		element: <NewShiftPage />,
	},
	{
		path: '/agenda/nuevo_sobreturno',
		element: <NewOvertimePage />,
	},
];
