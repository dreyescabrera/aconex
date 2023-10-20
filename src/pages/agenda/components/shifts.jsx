const fakeShifts = [
	{
		hora: '10:00AM',
		observacion: 'Probando',
		presentismo: 'Primera vez',
	},
	{
		hora: '11:00AM',
		observacion: 'Probando',
		presentismo: 'Segunda vez',
	},
	{
		hora: '12:00PM',
		observacion: 'Probando',
		presentismo: 'Ya es pana de todos',
	},
];

export const Shifts = () => {
	return (
		<div>
			{fakeShifts.map((shift) => (
				<div key={shift.hora}>{shift.presentismo}</div>
			))}
		</div>
	);
};
