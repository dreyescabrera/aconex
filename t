[1mdiff --git a/src/pages/agenda/components/shifts/empty-shift-options.jsx b/src/pages/agenda/components/shifts/empty-shift-options.jsx[m
[1mindex c3416e1..290a86e 100644[m
[1m--- a/src/pages/agenda/components/shifts/empty-shift-options.jsx[m
[1m+++ b/src/pages/agenda/components/shifts/empty-shift-options.jsx[m
[36m@@ -1,15 +1,6 @@[m
 import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';[m
[31m-import Alert from '@mui/material/Alert';[m
[31m-import Button from '@mui/material/Button';[m
[31m-import CircularProgress from '@mui/material/CircularProgress';[m
 import Container from '@mui/material/Container';[m
[31m-import Dialog from '@mui/material/Dialog';[m
[31m-import DialogActions from '@mui/material/DialogActions';[m
[31m-import DialogContent from '@mui/material/DialogContent';[m
[31m-import DialogContentText from '@mui/material/DialogContentText';[m
[31m-import DialogTitle from '@mui/material/DialogTitle';[m
 import MuiDrawer from '@mui/material/Drawer';[m
[31m-import Grow from '@mui/material/Grow';[m
 import List from '@mui/material/List';[m
 import ListItem from '@mui/material/ListItem';[m
 import ListItemButton from '@mui/material/ListItemButton';[m
[36m@@ -17,11 +8,10 @@[m [mimport ListItemIcon from '@mui/material/ListItemIcon';[m
 import ListItemText from '@mui/material/ListItemText';[m
 import { styled } from '@mui/material/styles';[m
 import Typography from '@mui/material/Typography';[m
[31m-import dayjs from 'dayjs';[m
 import { useState } from 'react';[m
 import { Link } from 'react-router-dom';[m
 import { useAgendaContext } from '../../context/agenda.context';[m
[31m-import { useEditShifts } from '../../hooks/use-edit-shifts';[m
[32m+[m[32mimport { DisableShift } from '../dialogs';[m
 [m
 const Drawer = styled(MuiDrawer)(({ theme }) => ({[m
 	'& .MuiDrawer-paper': {[m
[36m@@ -39,19 +29,11 @@[m [mconst Drawer = styled(MuiDrawer)(({ theme }) => ({[m
 export const EmptyShiftOptions = ({ open, onClose }) => {[m
 	const { shiftInView } = useAgendaContext();[m
 	const [isDialogOpen, setIsDialogOpen] = useState(false);[m
[31m-	const { mutate, isLoading, isSuccess } = useEditShifts();[m
 [m
 	const closeDialog = () => {[m
 		setIsDialogOpen(false);[m
 	};[m
 [m
[31m-	const disableShift = () => {[m
[31m-		mutate([m
[31m-			{ shiftId: shiftInView?.id, habilitado: false },[m
[31m-			{ onSuccess: () => setTimeout(closeDialog, 2_000) }[m
[31m-		);[m
[31m-	};[m
[31m-[m
 	const options = [[m
 		{[m
 			text: 'Nuevo turno',[m
[36m@@ -82,7 +64,7 @@[m [mexport const EmptyShiftOptions = ({ open, onClose }) => {[m
 								onClick={option.onClick}[m
 								to={option.href}[m
 								state={{ shift: shiftInView }}[m
[31m-								component={Link}[m
[32m+[m								[32mcomponent={option.href ? Link : 'button'}[m
 							>[m
 								<ListItemText primary={option.text} />[m
 								<ListItemIcon>[m
[36m@@ -93,42 +75,7 @@[m [mexport const EmptyShiftOptions = ({ open, onClose }) => {[m
 					))}[m
 				</List>[m
 			</Container>[m
[31m-			<Dialog open={isDialogOpen} onClose={closeDialog}>[m
[31m-				<DialogTitle>Deshabilitar turno</DialogTitle>[m
[31m-				<DialogContent>[m
[31m-					<DialogContentText>[m
[31m-						Si confirmas, deshabilitarás el turno seleccionado. Quieres continuar?[m
[31m-					</DialogContentText>[m
[31m-					<DialogContentText[m
[31m-						sx={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 20, mt: 1 }}[m
[31m-					>[m
[31m-						{dayjs(shiftInView?.date).format('MMMM DD | HH:mm   ')}[m
[31m-					</DialogContentText>[m
[31m-				</DialogContent>[m
[31m-				<DialogActions>[m
[31m-					<Button variant="outlined" onClick={closeDialog} disabled={isLoading}>[m
[31m-						No, cerrar[m
[31m-					</Button>[m
[31m-					<Button variant="contained" onClick={disableShift} disabled={isLoading}>[m
[31m-						Sí, continuar[m
[31m-						{isLoading && ([m
[31m-							<CircularProgress[m
[31m-								size={24}[m
[31m-								sx={{[m
[31m-									position: 'absolute',[m
[31m-									top: '50%',[m
[31m-									left: '50%',[m
[31m-									marginTop: '-12px',[m
[31m-									marginLeft: '-12px',[m
[31m-								}}[m
[31m-							/>[m
[31m-						)}[m
[31m-					</Button>[m
[31m-				</DialogActions>[m
[31m-				<Grow in={isSuccess}>[m
[31m-					<Alert severity="success">Éxito</Alert>[m
[31m-				</Grow>[m
[31m-			</Dialog>[m
[32m+[m			[32m<DisableShift open={isDialogOpen} onClose={closeDialog} shift={shiftInView} />[m
 		</Drawer>[m
 	);[m
 };[m
[1mdiff --git a/src/pages/agenda/components/shifts/shift-options.jsx b/src/pages/agenda/components/shifts/shift-options.jsx[m
[1mindex a1a4907..0fb4c68 100644[m
[1m--- a/src/pages/agenda/components/shifts/shift-options.jsx[m
[1m+++ b/src/pages/agenda/components/shifts/shift-options.jsx[m
[36m@@ -8,6 +8,10 @@[m [mimport ListItemIcon from '@mui/material/ListItemIcon';[m
 import ListItemText from '@mui/material/ListItemText';[m
 import { styled } from '@mui/material/styles';[m
 import Typography from '@mui/material/Typography';[m
[32m+[m[32mimport { useState } from 'react';[m
[32m+[m[32mimport { Link } from 'react-router-dom';[m
[32m+[m[32mimport { useAgendaContext } from '../../context/agenda.context';[m
[32m+[m[32mimport { ShiftDetails } from '../dialogs';[m
 [m
 const Drawer = styled(MuiDrawer)(({ theme }) => ({[m
 	'& .MuiDrawer-paper': {[m
[36m@@ -17,40 +21,43 @@[m [mconst Drawer = styled(MuiDrawer)(({ theme }) => ({[m
 	},[m
 }));[m
 [m
[31m-const options = [[m
[31m-	{[m
[31m-		text: 'Nuevo sobreturno',[m
[31m-		href: './',[m
[31m-		onClick: () => undefined,[m
[31m-	},[m
[31m-	{[m
[31m-		text: 'Modificar turno',[m
[31m-		href: './',[m
[31m-		onClick: () => undefined,[m
[31m-	},[m
[31m-	{[m
[31m-		text: 'Detalles',[m
[31m-		href: './',[m
[31m-		onClick: () => undefined,[m
[31m-	},[m
[31m-	{[m
[31m-		text: 'Anular turno',[m
[31m-		href: './',[m
[31m-		onClick: () => undefined,[m
[31m-	},[m
[31m-	{[m
[31m-		text: 'Datos del paciente',[m
[31m-		href: './',[m
[31m-		onClick: () => undefined,[m
[31m-	},[m
[31m-];[m
[31m-[m
 /**[m
  * @param {object} props[m
  * @param {boolean} props.open[m
  * @param {() => void} props.onClose[m
  */[m
 export const ShiftOptions = ({ open, onClose }) => {[m
[32m+[m	[32mconst { shiftInView } = useAgendaContext();[m
[32m+[m
[32m+[m	[32mconst [dialog, setDialog] = useState(null);[m
[32m+[m
[32m+[m	[32mconst onCloseDialog = () => {[m
[32m+[m		[32msetDialog(null);[m
[32m+[m	[32m};[m
[32m+[m
[32m+[m	[32mconst options = [[m
[32m+[m		[32m{[m
[32m+[m			[32mtext: 'Nuevo sobreturno',[m
[32m+[m			[32mhref: './nuevo_sobreturno',[m
[32m+[m		[32m},[m
[32m+[m		[32m{[m
[32m+[m			[32mtext: 'Modificar turno',[m
[32m+[m			[32mhref: './editar',[m
[32m+[m		[32m},[m
[32m+[m		[32m{[m
[32m+[m			[32mtext: 'Detalles',[m
[32m+[m			[32monClick: () => setDialog('details'),[m
[32m+[m		[32m},[m
[32m+[m		[32m{[m
[32m+[m			[32mtext: 'Anular turno',[m
[32m+[m			[32monClick: () => setDialog('disable'),[m
[32m+[m		[32m},[m
[32m+[m		[32m{[m
[32m+[m			[32mtext: 'Datos del paciente',[m
[32m+[m			[32monClick: () => setDialog('patientInfo'),[m
[32m+[m		[32m},[m
[32m+[m	[32m];[m
[32m+[m
 	return ([m
 		<Drawer[m
 			anchor="bottom"[m
[36m@@ -67,7 +74,12 @@[m [mexport const ShiftOptions = ({ open, onClose }) => {[m
 				<List>[m
 					{options.map((option) => ([m
 						<ListItem disablePadding key={option.text}>[m
[31m-							<ListItemButton>[m
[32m+[m							[32m<ListItemButton[m
[32m+[m								[32mcomponent={option.href ? Link : 'button'}[m
[32m+[m								[32mto={option.href}[m
[32m+[m								[32monClick={option.onClick}[m
[32m+[m								[32mstate={{ shift: shiftInView }}[m
[32m+[m							[32m>[m
 								<ListItemText primary={option.text} />[m
 								<ListItemIcon>[m
 									<KeyboardArrowRight sx={{ color: 'white' }} />[m
[36m@@ -77,6 +89,8 @@[m [mexport const ShiftOptions = ({ open, onClose }) => {[m
 					))}[m
 				</List>[m
 			</Container>[m
[32m+[m
[32m+[m			[32m<ShiftDetails open={dialog === 'details'} onClose={onCloseDialog} shift={shiftInView} />[m
 		</Drawer>[m
 	);[m
 };[m
[1mdiff --git a/src/pages/agenda/components/shifts/shifts.jsx b/src/pages/agenda/components/shifts/shifts.jsx[m
[1mindex b28c578..bdb8f5c 100644[m
[1m--- a/src/pages/agenda/components/shifts/shifts.jsx[m
[1m+++ b/src/pages/agenda/components/shifts/shifts.jsx[m
[36m@@ -23,18 +23,11 @@[m [mdayjs.extend(utc);[m
 dayjs.extend(timezone);[m
 [m
 export const Shifts = () => {[m
[31m-	const { filters, drawerToOpen, openDrawer, closeDrawer, updateShiftInView } = useAgendaContext();[m
[32m+[m	[32mconst { filters, drawerToOpen, openDrawer, closeDrawer, handleShiftOptions } = useAgendaContext();[m
 	const fakeClinicId = 1;[m
 [m
 	const { data: shifts, isLoading } = useShifts(fakeClinicId, filters);[m
 [m
[31m-	const handleClickEmptyShift = (shift) => {[m
[31m-		return () => {[m
[31m-			updateShiftInView(shift);[m
[31m-			openDrawer('emptyShiftOptions');[m
[31m-		};[m
[31m-	};[m
[31m-[m
 	return ([m
 		<TableContainer component={Paper} sx={{ mt: 4 }}>[m
 			<Table>[m
[36m@@ -85,7 +78,7 @@[m [mexport const Shifts = () => {[m
 												</IconButton>[m
 											</TableCell>[m
 											<TableCell align="right">[m
[31m-												<IconButton onClick={() => openDrawer('shiftOptions')}>[m
[32m+[m												[32m<IconButton onClick={handleShiftOptions(shift, 'shiftOptions')}>[m
 													<MoreVertIcon />[m
 												</IconButton>[m
 											</TableCell>[m
[36m@@ -97,7 +90,7 @@[m [mexport const Shifts = () => {[m
 												pointerEvents: shift.habilitado ? 'auto' : 'none',[m
 												'&:hover': { background: '#CCC2' },[m
 											}}[m
[31m-											onClick={handleClickEmptyShift(shift)}[m
[32m+[m											[32monClick={handleShiftOptions(shift, 'emptyShiftOptions')}[m
 										>[m
 											<TimeCell date={shift.date} />[m
 											<TableCell sx={{ fontStyle: 'italic' }}>[m
[1mdiff --git a/src/pages/agenda/context/agenda.context.jsx b/src/pages/agenda/context/agenda.context.jsx[m
[1mindex b040462..cf181f2 100644[m
[1m--- a/src/pages/agenda/context/agenda.context.jsx[m
[1m+++ b/src/pages/agenda/context/agenda.context.jsx[m
[36m@@ -28,7 +28,7 @@[m [mconst initialData = {[m
 	filters: initialFilters,[m
 	updateFilters: (/** @type {Partial<Filters>} */ filters) => undefined,[m
 	shiftInView: null,[m
[31m-	updateShiftInView: (newShift) => undefined,[m
[32m+[m	[32mhandleShiftOptions: (shift, /** @type {DrawerToOpen} */ drawerToOpen) => undefined,[m
 	/**@type {DrawerToOpen} */[m
 	drawerToOpen: null,[m
 	openDrawer: (/** @type {DrawerToOpen} */ drawerToOpen) => undefined,[m
[36m@@ -48,10 +48,6 @@[m [mexport const AgendaProvider = ({ children }) => {[m
 		setFilters((prev) => ({ ...prev, ...newFilters }));[m
 	};[m
 [m
[31m-	const updateShiftInView = (newShift) => {[m
[31m-		setShiftInView(newShift);[m
[31m-	};[m
[31m-[m
 	const openDrawer = (drawerToOpen) => {[m
 		setDrawerToOpen(drawerToOpen);[m
 	};[m
[36m@@ -60,11 +56,18 @@[m [mexport const AgendaProvider = ({ children }) => {[m
 		setDrawerToOpen(null);[m
 	};[m
 [m
[32m+[m	[32mconst handleShiftOptions = (shift, drawerToOpen) => {[m
[32m+[m		[32mreturn () => {[m
[32m+[m			[32msetShiftInView(shift);[m
[32m+[m			[32mopenDrawer(drawerToOpen);[m
[32m+[m		[32m};[m
[32m+[m	[32m};[m
[32m+[m
 	const state = {[m
 		filters,[m
 		updateFilters,[m
 		shiftInView,[m
[31m-		updateShiftInView,[m
[32m+[m		[32mhandleShiftOptions,[m
 		drawerToOpen,[m
 		openDrawer,[m
 		closeDrawer,[m
[1mdiff --git a/src/pages/agenda/new-overtime/new-overtime-page.jsx b/src/pages/agenda/new-overtime/new-overtime-page.jsx[m
[1mindex 0f1fd69..4aa8ee0 100644[m
[1m--- a/src/pages/agenda/new-overtime/new-overtime-page.jsx[m
[1m+++ b/src/pages/agenda/new-overtime/new-overtime-page.jsx[m
[36m@@ -70,8 +70,8 @@[m [mexport const NewOvertimePage = () => {[m
 								name="time"[m
 								slotProps={{ textField: { variant: 'standard', label: 'Hora del turno' } }}[m
 								sx={{ flex: '1' }}[m
[31m-								minTime={dayjs(shift.date).subtract(30, 'minutes')}[m
[31m-								maxTime={dayjs(shift.date).add(30, 'minutes')}[m
[32m+[m								[32mminTime={dayjs(shift.date).subtract(29, 'minutes')}[m
[32m+[m								[32mmaxTime={dayjs(shift.date).add(29, 'minutes')}[m
 								minutesStep={5}[m
 								closeOnSelect={false}[m
 							/>[m
[1mdiff --git a/src/routes/agenda/index.jsx b/src/routes/agenda/index.jsx[m
[1mindex 9da4e50..f3b20e7 100644[m
[1m--- a/src/routes/agenda/index.jsx[m
[1m+++ b/src/routes/agenda/index.jsx[m
[36m@@ -1,5 +1,5 @@[m
 import { AgendaPage } from '@/pages/agenda';[m
[31m-import { NewOvertimePage } from '@/pages/agenda/new-overtime/new-overtime-page';[m
[32m+[m[32mimport { NewOvertimePage } from '@/pages/agenda/new-overtime';[m
 import { NewShiftPage } from '@/pages/agenda/new-shift';[m
 [m
 /**[m
