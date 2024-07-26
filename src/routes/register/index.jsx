const RegisterPage = () => import('@/pages/register');
const RegisterClinicPage = () => import('@/pages/register/register-clinic');
const RegisterUserPage = () => import('@/pages/register/register-user');

/**
 * @type {Array<import('react-router-dom').RouteObject>}
 */
export const registerRoutes = [
	{
		path: 'register',
		lazy: RegisterPage,
	},
	{
		path: 'register/clinic',
		lazy: RegisterClinicPage,
	},
	{
		path: 'register/user',
		lazy: RegisterUserPage,
	},
];
