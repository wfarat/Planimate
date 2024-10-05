import { View, Text, ActivityIndicator } from 'react-native';

import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useState } from 'react';
import { InputDate, InputTime } from '@/components/molecules';
import { RootScreenProps } from '@/types/navigation';
import { useTaskActions } from '@/hooks/tasks/useTaskActions';
import { GreenRoundedButton, TextInputRounded } from '@/components/atoms';
import { useTranslation } from 'react-i18next';
import { Task } from '@/types/schemas';

function AddTask({ navigation, route }: RootScreenProps<'AddTask'>) {
	const { task, goal, tasks } = route.params;
	const { components } = useTheme();
	const { t } = useTranslation(['goals']);

	const [name, setName] = useState<string>('');
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
				<GreenRoundedButton handlePress={handleAddTask} text="addTask" />
			</View>
		</SafeScreen>
	);
}

export default AddTask;
