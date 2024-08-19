import { useState } from 'react';
import { SafeScreen } from '@/components/template';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';

import { InputTime } from '@/components/molecules';
import { GreenRoundedButton } from '@/components/atoms';
import { useTaskActions } from '@/helpers/hooks/useTaskActions';

type DayOfWeek =
	| 'Monday'
	| 'Tuesday'
	| 'Wednesday'
	| 'Thursday'
	| 'Friday'
	| 'Saturday'
	| 'Sunday';
function FillAgendaWeek() {
	const { components } = useTheme();
	const { t } = useTranslation(['agenda']);
	const [weekFreeTime, setWeekFreeTime] = useState([0, 0, 0, 0, 0, 0, 0]);
	const [goalId, setGoalId] = useState(1);
	const { findImportantTasks } = useTaskActions(goalId);
	const daysOfWeek = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	const handleSetDuration = (index: number, duration: number) => {
		const updatedWeekFreeTime = [...weekFreeTime];
		updatedWeekFreeTime[index] = duration;
		setWeekFreeTime(updatedWeekFreeTime);
	};

	const addAgendaItems = () => {
		const totalFreeHours = weekFreeTime.reduce((acc, hours) => acc + hours, 0);
		const importantTasks = findImportantTasks(totalFreeHours);
	};

	return (
		<SafeScreen>
			<View style={components.mainContainer}>
				<Text style={components.header}>{t('agenda:fillAgendaWeek')}</Text>

				{daysOfWeek.map((day, index) => (
					<InputTime
						key={day}
						setDuration={duration => handleSetDuration(index, duration)}
						message={day as DayOfWeek}
					/>
				))}

				<GreenRoundedButton handlePress={addAgendaItems} text="fillWeek" />
			</View>
		</SafeScreen>
	);
}

export default FillAgendaWeek;
