import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { LinkBehavior } from './link-behavior';

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
		MuiLink: { defaultProps: { component: LinkBehavior } },
		MuiButtonBase: {
			defaultProps: {
				LinkComponent: LinkBehavior,
			},
		},
		MuiContainer: { defaultProps: { maxWidth: 'xl' } },
	},
});

export default theme;
