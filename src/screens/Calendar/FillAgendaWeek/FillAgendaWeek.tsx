import { useState } from 'react';
import { SafeScreen } from '@/components/template';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';
import SelectDropdown from 'react-native-select-dropdown';
import { InputTime } from '@/components/molecules';
import { GreenRoundedButton } from '@/components/atoms';
import { useTaskActions } from '@/hooks/tasks/useTaskActions';
import { useGoalActions } from '@/hooks/goals/useGoalActions';
import { AgendaItemType, Goal } from '@/types/schemas';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAgendaItems } from '@/hooks/agenda/useAgendaItems';
import { RootScreenProps } from '@/types/navigation';

type DayOfWeek =
	| 'Monday'
	| 'Tuesday'
	| 'Wednesday'
	| 'Thursday'
	| 'Friday'
	| 'Saturday'
	| 'Sunday';

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

function FillAgendaWeek({ navigation }: RootScreenProps<'FillAgendaWeek'>) {
	const { components, fonts, layout, gutters, backgrounds, borders } =
		useTheme();
	const { t } = useTranslation(['agenda']);

	const [dailyFreeTime, setDailyFreeTime] = useState([0, 0, 0, 0, 0, 0, 0]);
	const [selectedGoalId, setSelectedGoalId] = useState(0);
	const { findImportantTasks } = useTaskActions(selectedGoalId);
	const { getGoals } = useGoalActions();
	const { createAgendaItem, addMultipleAgendaItems } = useAgendaItems();

	const addAgendaItems = (agendaItems: AgendaItemType[]) => {
		addMultipleAgendaItems(agendaItems);
		navigation.goBack();
	};

	const updateDailyFreeTime = (index: number, duration: number) => {
		const updatedDailyFreeTime = [...dailyFreeTime];
		updatedDailyFreeTime[index] = duration;
		setDailyFreeTime(updatedDailyFreeTime);
	};

	const generateAgendaItems = (): AgendaItemType[] => {
		const agendaItems: AgendaItemType[] = [];
		const totalFreeTime = dailyFreeTime.reduce(
			(acc, minutes) => acc + minutes,
			0,
		);
		const importantTasks = findImportantTasks(totalFreeTime);
		let taskIndex = 0;

		dailyFreeTime.forEach((time, index) => {
			let freeHours = time;
			const date = new Date(); // Adjust date for each day
			date.setDate(date.getDate() + index);

			while (freeHours > 0 && taskIndex < importantTasks.length) {
				const task = importantTasks[taskIndex];
				if (task.duration) {
					const calculateTaskDurationWithRepeats = (
						base: number,
						elapsed: number,
						repeats: number,
					) => {
						const durationLeft = base * repeats - elapsed;
						if (durationLeft <= 0) return 0;
						if (durationLeft < base) return durationLeft;
						return base;
					};
					const taskDuration = task.repeats
						? calculateTaskDurationWithRepeats(
								task.duration.base,
								task.duration.elapsed,
								task.repeats,
						  )
						: task.duration.base - task.duration.elapsed;
					const day = date.getDay();
					if (taskDuration <= 0) taskIndex += 1;
					if (task.repeatDays) if (!task.repeatDays[day]) taskIndex += 1;
					if (taskDuration <= freeHours) {
						freeHours -= taskDuration;
						task.duration.elapsed += taskDuration;
						agendaItems.push(createAgendaItem(date, task, taskDuration));
						taskIndex += 1;
					} else {
						task.duration.elapsed += freeHours;
						agendaItems.push(createAgendaItem(date, task, freeHours));
						freeHours = 0;
					}
				}
			}
		});

		return agendaItems;
	};

	const handleAddAgendaItems = () => {
		if (!selectedGoalId) {
			Alert.alert('No goal selected');
		} else {
			const agendaItems = generateAgendaItems();
			addAgendaItems(agendaItems);
		}
	};

	return (
		<SafeScreen>
			<View style={components.mainContainer}>
				<Text style={components.header}>{t('agenda:fillAgendaWeek')}</Text>
				{reorderedDaysOfWeek.map((day, index) => (
					<InputTime
						key={day}
						setDuration={duration => updateDailyFreeTime(index, duration)}
						message={day as DayOfWeek}
					/>
				))}
				<SelectDropdown
					data={getGoals()}
					onSelect={(selectedItem: Goal) =>
						setSelectedGoalId(selectedItem.goalId)
					}
					renderItem={(item: Goal, index, isSelected) => (
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
					)}
					renderButton={(selectedItem: Goal, isOpened) => (
						<View style={[components.textInputRounded, layout.row]}>
							<Text style={[layout.flex_1, fonts.gray200, fonts.size_16]}>
								{(selectedItem && selectedItem.name) || 'Select goal'}
							</Text>
							<MaterialCommunityIcons
								name={isOpened ? 'chevron-up' : 'chevron-down'}
								size={20}
							/>
						</View>
					)}
				/>
				<ActivityIndicator size="large" />
				<GreenRoundedButton
					handlePress={handleAddAgendaItems}
					text="fillWeek"
				/>
			</View>
		</SafeScreen>
	);
}

export default FillAgendaWeek;
