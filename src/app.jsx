import { router } from '@/routes';
import { Helmet } from 'react-helmet';
import { RouterProvider } from 'react-router-dom';

export function App() {
	return (
		<>
			<Helmet
				titleTemplate="%s | AConex - Boot & Calendar"
				defaultTitle="AConex - Boot & Calendar"
			/>
			<RouterProvider router={router} />
		</>
	);
}
