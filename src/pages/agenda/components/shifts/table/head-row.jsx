import Divider from '@mui/material/Divider';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export const HeadRow = () => {
	return (
		<TableHead>
			<TableRow>
				<TableCell sx={{ width: '5%', position: 'relative' }} align="center">
					<span>Turno</span>
					<Divider orientation="vertical" absolute sx={{ height: '50%', top: '25%' }} />
				</TableCell>
				<TableCell sx={{ width: '20%' }}>Paciente</TableCell>
				<TableCell sx={{ width: '20%' }}>Presentismo</TableCell>
				<TableCell sx={{ width: '15%' }}>Obra Social</TableCell>
				<TableCell sx={{ width: '20%' }}>Observación</TableCell>
				<TableCell sx={{ minWidth: '115px', width: '20%' }}>Contacto</TableCell>
				<TableCell sx={{ width: '0' }}></TableCell>
			</TableRow>
		</TableHead>
	);
};
