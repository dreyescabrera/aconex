import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import { Form, TextInput } from '@/components/form';
import { useNewUser } from '../context/new-user.context';

export const UserData = () => {
	const { view } = useNewUser();

	return (
		<Slide direction="left" in={view === 'USER_DATA'} timeout={450} mountOnEnter>
			<Box sx={{ width: view === 'USER_DATA' ? '100%' : 0 }}>
				<Fade in={view === 'USER_DATA'} appear={false} timeout={200}>
					<div>
						<Form
							onSubmit={console.info}
							defaultValues={{
								username: '',
								password: '',
							}}
						>
							<Stack gap={4}>
								<TextInput fullWidth name="username" label="Nombre de usuario" />
								<TextInput fullWidth name="password" label="Constraseña" type="password" />
								<Button variant="contained" type="submit">
									Completar
								</Button>
							</Stack>
						</Form>
					</div>
				</Fade>
			</Box>
		</Slide>
	);
};
