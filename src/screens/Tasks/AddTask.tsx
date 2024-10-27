import { View, Text } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
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
	const { components, layout, fonts, gutters } = useTheme();
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

	const handleAddTask = () => {
		const newTask = createTask(
			tasks.length,
			name,
			description,
			false,
			duration,
			dueDate,
			Number(repeats),
			repeatDays,
		);
		addTask(newTask);
	};
	return (
		<SafeScreen>
			<View style={components.mainContainer}>
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
				<InputTime setDuration={setDuration} message="duration" />
				<View style={[layout.row, gutters.margin_12]}>
					<BouncyCheckbox
						onPress={() => {
							setRepeatable(!repeatable);
						}}
						isChecked={repeatable}
					/>
					<Text style={fonts.gray400}>Repeatable</Text>
				</View>
				{repeatable && (
					<View>
						<TextInputRounded
							text="taskRepeats"
							keyboardType="numeric"
							value={repeats}
							onChangeText={setRepeats}
						/>
						<DaysPicker pickedDays={repeatDays} setPickedDays={setRepeatDays} />
					</View>
				)}
				<GreenRoundedButton handlePress={handleAddTask} text="addTask" />
			</View>
		</SafeScreen>
	);
}

export default AddTask;
