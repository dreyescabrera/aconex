import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@/layouts/main-layout';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
	},
]);

export function App() {
	return <RouterProvider router={router} />;
}
