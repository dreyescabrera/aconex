import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export const ColoriconPresentism = ({ presentism }) => {
	switch (presentism) {
		case 'Presente':
			return <FiberManualRecordIcon sx={{ color: '#63db8b' }} />;
		case 'Atendido':
			return <FiberManualRecordIcon sx={{ color: '#6ad3ee' }} />;
		case 'Ausento con aviso':
			return <FiberManualRecordIcon sx={{ color: '#d9e25d' }} />;
		case 'Ausento sin aviso':
			return <FiberManualRecordIcon sx={{ color: '#ee1919' }} />;
		case 'Confirmado':
			return <FiberManualRecordIcon sx={{ color: '#0f8519' }} />;
		case 'Cancelado':
			return <FiberManualRecordIcon sx={{ color: '#000000' }} />;
		default:
			return <FiberManualRecordIcon sx={{ color: 'transparent' }} />;
	}
};
