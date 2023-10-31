import { router } from '@/routes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'dayjs/locale/es';
import { Helmet } from 'react-helmet';
import { RouterProvider } from 'react-router-dom';

const queryClient = new QueryClient();

export function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Helmet
					titleTemplate="%s | AConex - Boot & Calendar"
					defaultTitle="AConex - Boot & Calendar"
				/>
				<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
					<RouterProvider router={router} />
				</LocalizationProvider>
			</QueryClientProvider>
		</>
	);
}
