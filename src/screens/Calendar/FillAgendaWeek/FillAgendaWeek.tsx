import { useState } from 'react';
import { SafeScreen } from '@/components/template';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';
import SelectDropdown from 'react-native-select-dropdown';
import { InputTime } from '@/components/molecules';
import { GreenRoundedButton } from '@/components/atoms';
import { useTaskActions } from '@/helpers/hooks/useTaskActions';
import { useGoalActions } from '@/helpers/hooks/useGoalActions';
import { Goal } from '@/types/schemas';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAgendaItems } from '@/helpers/hooks/useAgendaItems';
import { RootScreenProps } from '@/types/navigation';

type DayOfWeek =
	| 'Monday'
	| 'Tuesday'
	| 'Wednesday'
	| 'Thursday'
	| 'Friday'
	| 'Saturday'
	| 'Sunday';
function FillAgendaWeek({ navigation }: RootScreenProps<'FillAgendaWeek'>) {
	const { components } = useTheme();
	const { t } = useTranslation(['agenda']);
	const [weekFreeTime, setWeekFreeTime] = useState([0, 0, 0, 0, 0, 0, 0]);
	const [goalId, setGoalId] = useState(1);
	const { findImportantTasks } = useTaskActions(goalId);
	const { getGoals } = useGoalActions();
	const { createAgendaItem } = useAgendaItems();
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
		const totalFreeTime = weekFreeTime.reduce(
			(acc, minutes) => acc + minutes,
			0,
		);
		const importantTasks = findImportantTasks(totalFreeTime);
		let taskIndex = 0;
		daysOfWeek.forEach((day, index) => {
			let freeHours = weekFreeTime[index];
			const date = new Date(); // Assuming you set the date correctly for each day
			date.setDate(date.getDate() + index);

			while (freeHours > 0 && taskIndex < importantTasks.length) {
				const task = importantTasks[taskIndex];
				const taskDuration = task.duration
					? task.duration.base - task.duration.elapsed
					: 0;

				if (taskDuration <= freeHours) {
					const duration = taskDuration;
					freeHours -= duration;
					if (task.duration) task.duration.elapsed += duration;
					// Add the task to the agenda
					createAgendaItem(date, task, duration);
					taskIndex += 1;
				} else {
					const duration = freeHours;
					freeHours = 0;
					if (task.duration) task.duration.elapsed += duration;
					// Add a partial task to the agenda
					createAgendaItem(date, task, duration);
				}
			}
		});
		navigation.goBack();
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
				<SelectDropdown
					data={getGoals()}
					onSelect={(selectedItem: Goal) => setGoalId(selectedItem.id)}
					renderItem={(item: Goal, index, isSelected) => {
						return (
							<View
								style={{
									...styles.dropdownItemStyle,
									...(isSelected && { backgroundColor: '#D2D9DF' }),
								}}
							>
								<Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
							</View>
						);
					}}
					renderButton={(selectedItem: Goal, isOpened) => {
						return (
							<View style={styles.dropdownButtonStyle}>
								<Text style={styles.dropdownButtonTxtStyle}>
									{(selectedItem && selectedItem.name) || 'Select goal'}
								</Text>
								<MaterialCommunityIcons
									name={isOpened ? 'chevron-up' : 'chevron-down'}
									style={styles.dropdownButtonArrowStyle}
								/>
							</View>
						);
					}}
				/>
				<GreenRoundedButton handlePress={addAgendaItems} text="fillWeek" />
			</View>
		</SafeScreen>
	);
}
const styles = StyleSheet.create({
	dropdownButtonStyle: {
		width: 200,
		height: 50,
		backgroundColor: '#E9ECEF',
		borderRadius: 12,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 12,
	},
	dropdownButtonTxtStyle: {
		flex: 1,
		fontSize: 18,
		fontWeight: '500',
		color: '#151E26',
	},
	dropdownButtonArrowStyle: {
		fontSize: 28,
	},
	dropdownButtonIconStyle: {
		fontSize: 28,
		marginRight: 8,
	},
	dropdownMenuStyle: {
		backgroundColor: '#E9ECEF',
		borderRadius: 8,
	},
	dropdownItemStyle: {
		width: '100%',
		flexDirection: 'row',
		paddingHorizontal: 12,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 8,
	},
	dropdownItemTxtStyle: {
		flex: 1,
		fontSize: 18,
		fontWeight: '500',
		color: '#151E26',
	},
	dropdownItemIconStyle: {
		fontSize: 28,
		marginRight: 8,
	},
});
export default FillAgendaWeek;
