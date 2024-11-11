import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useState } from 'react';
import { InputDate, InputTime } from '@/components/molecules';
import { RootScreenProps } from '@/types/navigation';
import { useTaskActions } from '@/hooks/tasks/useTaskActions';
import {
	DaysPicker,
	GreenRoundedButton,
	TextInputRounded,
} from '@/components/atoms';
import { useTranslation } from 'react-i18next';
import { Task } from '@/types/schemas';

function AddTask({ navigation, route }: RootScreenProps<'AddTask'>) {
	const { task, goal, tasks } = route.params;
	const { components, layout, gutters, fonts, borders, backgrounds } =
		useTheme();
	const { t } = useTranslation(['goals']);
	const [repeatable, setRepeatable] = useState<boolean>(false);
	const [repeatDays, setRepeatDays] = useState([
		false,
		false,
		false,
		false,
		false,
		false,
		false,
	]);
	const [name, setName] = useState<string>('');
	const [repeats, setRepeats] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [dueDate, setDueDate] = useState<Date>();
	const [duration, setDuration] = useState<number>();
	const { createTask, updateTasks } = useTaskActions(
		goal.goalId,
		task?.taskId,
		task?.taskId,
	);
	const addTask = (newTask: Task) => {
		const updatedTasks = [...tasks, newTask];
		updateTasks(updatedTasks, task?.taskId);
		navigation.goBack();
	};
	const countRepeats = () => {
		const currentDay = new Date();
		if (dueDate) {
			const milliseconds =
				dueDate.getMilliseconds() - currentDay.getMilliseconds();
			const weeks = milliseconds / 1000 / 60 / 60 / 24 / 7;
			let totalRepeatDays = 0;
			repeatDays.forEach(day => {
				if (day) totalRepeatDays += 1;
			});
			return Math.floor(weeks * totalRepeatDays);
		}
		return 0;
	};
	const handleAddTask = () => {
		const newTask = createTask(
			tasks.length,
			name,
			description,
			false,
			duration,
			dueDate,
			repeats ? Number(repeats) : countRepeats(),
			repeatDays,
		);
		addTask(newTask);
	};
	return (
		<SafeScreen>
			<ScrollView
				contentContainerStyle={[
					components.mainContainer,
					gutters.paddingBottom_80,
				]}
			>
				<Text style={components.header}>{goal.name}</Text>
				<Text style={components.header}>{task?.name}</Text>
				<Text style={components.header}>{t('goals:newTask')}</Text>
				<TextInputRounded value={name} onChangeText={setName} text="taskName" />
				<TextInputRounded
					numberOfLines={2}
					multiline
					value={description}
					onChangeText={setDescription}
					text="taskDescription"
				/>
				<InputDate date={dueDate} setDate={setDueDate} message="endDate" />
				<View style={[layout.row, gutters.margin_12, layout.fullWidth]}>
					<TouchableOpacity
						style={[
							borders.w_1,
							layout.flex_1,
							gutters.padding_12,
							layout.itemsCenter,
							repeatable ? backgrounds.purple100 : backgrounds.purple500,
						]}
						onPress={() => setRepeatable(false)}
					>
						<Text style={[fonts.gray100, fonts.size_16]}>
							{t('goals:single')}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							borders.w_1,
							layout.flex_1,
							gutters.padding_12,
							layout.itemsCenter,
							repeatable ? backgrounds.purple500 : backgrounds.purple100,
						]}
						onPress={() => setRepeatable(true)}
					>
						<Text style={[fonts.gray100, fonts.size_16]}>
							{t('goals:repeatable')}
						</Text>
					</TouchableOpacity>
				</View>
				{repeatable && (
					<TextInputRounded
						text="taskRepeats"
						keyboardType="numeric"
						value={repeats}
						onChangeText={setRepeats}
					/>
				)}
				{repeatable && (
					<DaysPicker pickedDays={repeatDays} setPickedDays={setRepeatDays} />
				)}
				{repeatable ? (
					<InputTime setDuration={setDuration} message="singleDuration" />
				) : (
					<InputTime setDuration={setDuration} message="duration" />
				)}

				<GreenRoundedButton handlePress={handleAddTask} text="addTask" />
			</ScrollView>
		</SafeScreen>
	);
}

export default AddTask;
