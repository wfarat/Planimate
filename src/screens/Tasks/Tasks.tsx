import { Text, View, TextInput, Alert } from 'react-native';

import { useTranslation } from 'react-i18next';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useEffect, useState } from 'react';
import TasksList from '@/screens/Tasks/TasksList';
import { RootScreenProps } from '@/types/navigation';
import { SendButton, TaskTopBar } from '@/components/molecules';
import type { Task } from '@/types/schemas';
import { useStorage } from '@/storage/StorageContext';
import { useTaskActions } from '@/helpers/hooks/useTaskActions';
import { useIsFocused } from '@react-navigation/native';

function Tasks({ route, navigation }: RootScreenProps<'Tasks'>) {
	const { goal, task } = route.params;
	const { t } = useTranslation(['goals']);
	const storage = useStorage();
	const { layout, fonts, gutters, components } = useTheme();
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [tasks, setTasks] = useState<Task[]>([]);
	const { deleteTask, finishTask, editTask, addTask } = useTaskActions(
		goal.id,
		task?.taskId || goal.id,
		task ? task.id : undefined,
	);
	const storageString = task
		? `goals.${goal.id}.${task.id}`
		: `goals.${goal.id}`;
	const isFocused = useIsFocused();
	useEffect(() => {
		if (isFocused) {
			const storedTasks = storage.getString(storageString);
			if (storedTasks) {
				setTasks(JSON.parse(storedTasks) as Task[]);
			} else {
				setTasks([]);
			}
		}
	}, [task?.id, isFocused]);
	const handleAddTask = () => {
		const updatedTasks = addTask(tasks, name, description);
		setTasks(updatedTasks);
		setName('');
		setDescription('');
	};
	const handleDeleteTask = () => {
		deleteTask();
		navigation.goBack();
	};
	const alertDelete = () => {
		Alert.alert(
			'Confirmation',
			`Are you sure you want to delete ${task?.name}?`,
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{ text: 'OK', onPress: () => handleDeleteTask() },
			],
		);
	};
	const handleFinishTask = () => {
		finishTask();
	};

	const handleEditTask = (newName: string, newDescription: string) => {
		editTask(newName, newDescription);
	};
	return (
		<SafeScreen>
			{task && (
				<TaskTopBar
					isCompletionPossible={tasks.every(item => item.completed)}
					onDelete={alertDelete}
					onFinish={() => handleFinishTask()}
					onEdit={() => handleEditTask('New Name', 'New Description')}
				/>
			)}
			<View
				style={[
					layout.justifyCenter,
					layout.itemsCenter,
					gutters.marginTop_120,
				]}
			>
				<Text style={[fonts.size_24, fonts.gray200]}>{goal.name}</Text>
				{task && (
					<Text style={[fonts.size_24, fonts.gray200]}>{task.name}</Text>
				)}
				<View style={[gutters.paddingHorizontal_32]}>
					<View>
						<TextInput
							style={components.textInputRounded}
							value={name}
							onChangeText={setName}
							placeholder={t('goals:title')}
						/>
						<TextInput
							style={components.textInputRounded}
							multiline
							value={description}
							onChangeText={setDescription}
							placeholder={t('goals:description')}
						/>
					</View>
					<SendButton handlePress={() => handleAddTask()} />
					<TasksList tasks={tasks} navigation={navigation} route={route} />
				</View>
			</View>
		</SafeScreen>
	);
}

export default Tasks;
