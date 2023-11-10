const PatientPage = () => import('@/pages/patients/patient-page');

/**
 * @type {Array<import('react-router-dom').RouteObject>}
 */
export const patientsRouter = [
	{
		path: '/pacientes',
		lazy: PatientPage,
	},
];
