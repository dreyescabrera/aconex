const User = () => import('@/pages/user');

/**
 * @type {Array<import('react-router-dom').RouteObject>}
 */
export const userRouter = [
	{
		path: '/usuario',
		lazy: User,
	},
];
