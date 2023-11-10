import { queryClient } from '@/libs/tanstack-query';
import { router } from '@/routes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/es-us';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { Helmet } from 'react-helmet';
import { RouterProvider } from 'react-router-dom';

dayjs.locale('es-us');
dayjs.extend(utc);
dayjs.extend(timezone);

export function App() {
	return (
		<>
			<Helmet
				titleTemplate="%s | AConex - Boot & Calendar"
				defaultTitle="AConex - Boot & Calendar"
			/>
			<QueryClientProvider client={queryClient}>
				<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-us">
					<RouterProvider router={router} />
				</LocalizationProvider>
			</QueryClientProvider>
		</>
	);
}
