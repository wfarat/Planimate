import { useState } from 'react';
import { SafeScreen } from '@/components/template';
import { Alert, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';
import SelectDropdown from 'react-native-select-dropdown';
import { InputTime } from '@/components/molecules';
import { GreenRoundedButton } from '@/components/atoms';
import { useTaskActions } from '@/helpers/hooks/tasks/useTaskActions';
import { useGoalActions } from '@/helpers/hooks/useGoalActions';
import { Goal } from '@/types/schemas';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAgendaItems } from '@/helpers/hooks/agenda/useAgendaItems';
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
	const { components, fonts, layout, gutters, backgrounds, borders } =
		useTheme();
	const { t } = useTranslation(['agenda']);
	const [weekFreeTime, setWeekFreeTime] = useState([0, 0, 0, 0, 0, 0, 0]);
	const [goalId, setGoalId] = useState(0);
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
	const today = new Date().getDay();
	const reorderedDaysOfWeek = [
		...daysOfWeek.slice(today),
		...daysOfWeek.slice(0, today),
	];
	const handleSetDuration = (index: number, duration: number) => {
		const updatedWeekFreeTime = [...weekFreeTime];
		updatedWeekFreeTime[index] = duration;
		setWeekFreeTime(updatedWeekFreeTime);
	};

	const addAgendaItems = () => {
		if (!goalId) return Alert.alert('Please choose goal');
		const totalFreeTime = weekFreeTime.reduce(
			(acc, minutes) => acc + minutes,
			0,
		);
		const importantTasks = findImportantTasks(totalFreeTime);
		let taskIndex = 0;
		weekFreeTime.forEach((time, index) => {
			let freeHours = time;
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
		return navigation.goBack();
	};

	return (
		<SafeScreen>
			<View style={components.mainContainer}>
				<Text style={components.header}>{t('agenda:fillAgendaWeek')}</Text>

				{reorderedDaysOfWeek.map((day, index) => (
					<InputTime
						key={day}
						setDuration={duration => handleSetDuration(index, duration)}
						message={day as DayOfWeek}
					/>
				))}
				<SelectDropdown
					data={getGoals()}
					onSelect={(selectedItem: Goal) => setGoalId(selectedItem.goalId)}
					renderItem={(item: Goal, index, isSelected) => {
						return (
							<View
								style={[
									gutters.padding_16,
									layout.itemsCenter,
									layout.fullWidth,
									borders.w_1,
									borders.gray100,
									isSelected && backgrounds.blue100,
								]}
							>
								<Text style={[fonts.gray400, fonts.size_16]}>{item.name}</Text>
							</View>
						);
					}}
					renderButton={(selectedItem: Goal, isOpened) => {
						return (
							<View style={[components.textInputRounded, layout.row]}>
								<Text style={[layout.flex_1, fonts.gray200, fonts.size_16]}>
									{(selectedItem && selectedItem.name) || 'Select goal'}
								</Text>
								<MaterialCommunityIcons
									name={isOpened ? 'chevron-up' : 'chevron-down'}
									size={20}
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
export default FillAgendaWeek;
