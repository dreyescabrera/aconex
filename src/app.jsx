import { router } from '@/routes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/es-us';
import { Helmet } from 'react-helmet';
import { RouterProvider } from 'react-router-dom';

dayjs.locale('es-us');
const queryClient = new QueryClient();

export function App() {
	return (
		<>
			<Helmet
				titleTemplate="%s | AConex - Boot & Calendar"
				defaultTitle="AConex - Boot & Calendar"
			/>
			<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-us">
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
				</QueryClientProvider>
			</LocalizationProvider>
		</>
	);
}
