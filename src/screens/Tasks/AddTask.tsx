import { View, Text, ActivityIndicator } from 'react-native';

import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useEffect, useState } from 'react';
import { InputDate, InputTime } from '@/components/molecules';
import { RootScreenProps } from '@/types/navigation';
import { useTaskActions } from '@/helpers/hooks/tasks/useTaskActions';
import { GreenRoundedButton, TextInputRounded } from '@/components/atoms';
import { useTranslation } from 'react-i18next';
import { useStorage } from '@/storage/StorageContext';
import { saveTask } from '@/controllers/goals';
import { Task } from '@/types/schemas';

function AddTask({ navigation, route }: RootScreenProps<'AddTask'>) {
	const { task, goal, tasks } = route.params;
	const { components } = useTheme();
	const { t } = useTranslation(['goals']);
	const storage = useStorage();
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [dueDate, setDueDate] = useState<Date>();
	const [duration, setDuration] = useState<number>();
	const { mutate, data, isSuccess, isPending, isError, error } = saveTask();
	const { createTask, updateTasks } = useTaskActions(
		goal.id,
		task?.taskId,
		task?.taskId,
	);
	const addTask = (newTask: Task) => {
		const updatedTasks = [...tasks, newTask];
		updateTasks(updatedTasks, task?.taskId);
		navigation.goBack();
	};
	useEffect(() => {
		if (isSuccess) {
			addTask(data);
		}
	}, [isSuccess]);
	const handleAddTask = () => {
		const newTask = createTask(tasks, name, description, duration, dueDate);
		const token = storage.getString('token');
		if (token) {
			mutate({ task: newTask, token });
		} else {
			addTask(newTask);
		}
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
				{isPending ? (
					<ActivityIndicator />
				) : (
					<GreenRoundedButton handlePress={handleAddTask} text="addTask" />
				)}
				{isError && <Text style={components.errorText}>{error?.message}</Text>}
			</View>
		</SafeScreen>
	);
}

export default AddTask;
