import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#556cd6',
		},
		secondary: {
			main: '#19857b',
		},
		error: {
			main: red.A400,
		},
	},
	components: {
		MuiButton: {
			defaultProps: { disableRipple: true, disableElevation: true },
			styleOverrides: {
				disabled: true,
			},
		},
	},
});

export default theme;
