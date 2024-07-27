import { Text, View, TextInput } from 'react-native';

import { useTranslation } from 'react-i18next';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useEffect, useState } from 'react';
import TasksList from '@/screens/Tasks/TasksList';
import { RootScreenProps } from '@/types/navigation';
import { EditDialog, SendButton, TaskTopBar } from '@/components/molecules';
import type { Task } from '@/types/schemas';
import { useStorage } from '@/storage/StorageContext';
import { useTaskActions } from '@/helpers/hooks/useTaskActions';
import { useIsFocused } from '@react-navigation/native';
import alertDelete from '@/helpers/utils/alertDelete';
import { useGoalActions } from '@/helpers/hooks/useGoalActions';

function Tasks({ route, navigation }: RootScreenProps<'Tasks'>) {
	const { goal, task } = route.params;
	const { t } = useTranslation(['goals']);
	const storage = useStorage();
	const { layout, fonts, gutters, components } = useTheme();
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [tasks, setTasks] = useState<Task[]>([]);
	const [visible, setVisible] = useState(false);
	const [goalName, setGoalName] = useState(goal.name);
	const [taskName, setTaskName] = useState(task?.name || '');
	const { deleteTask, finishTask, editTask, addTask } = useTaskActions(
		goal.id,
		task?.taskId,
		task ? task.id : undefined,
	);
	const { deleteGoal, editGoal } = useGoalActions(goal.id);
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
	const handleDelete = () => {
		if (task) deleteTask();
		else deleteGoal();
		navigation.goBack();
	};

	const handleFinishTask = () => {
		finishTask();
		navigation.goBack();
	};

	const handleCancel = () => {
		setVisible(false);
	};
	const handleAlert = () => {
		alertDelete(task ? task.name : goal.name, handleDelete);
	};
	const handleEdit = (newName: string, newDescription: string) => {
		if (task) {
			editTask(newName, newDescription);
			setTaskName(newName); // Update task name state
			navigation.setParams({
				task: { ...task, name: newName, description: newDescription },
			});
		} else {
			editGoal(newName, newDescription);
			setGoalName(newName); // Update goal name state
			navigation.setParams({
				goal: { ...goal, name: newName, description: newDescription },
			});
		}
		setVisible(false);
	};
	const handleAddToAgenda = () => {
		if (task) navigation.push('AddToAgendaScreen', {task});
	}
	return (
		<SafeScreen>
			{task ? (
				<TaskTopBar
					isCompletionPossible={tasks.every(item => item.completed)}
					onDelete={handleAlert}
					onFinish={() => handleFinishTask()}
					onEdit={() => setVisible(true)}
					addToAgenda={handleAddToAgenda}
				/>
			) : (
				<TaskTopBar onDelete={handleAlert} onEdit={() => setVisible(true)} />
			)}
			<EditDialog
				onEdit={handleEdit}
				onCancel={handleCancel}
				visible={visible}
				oldName={task ? task.name : goal.name}
			/>
			<View
				style={[
					layout.justifyCenter,
					layout.itemsCenter,
					gutters.marginTop_120,
				]}
			>
				<Text style={[fonts.size_24, fonts.gray200]}>{goalName}</Text>
				{task && <Text style={[fonts.size_24, fonts.gray200]}>{taskName}</Text>}
				<View style={[gutters.paddingHorizontal_32]}>
					<View>
						<TextInput
							style={components.textInputRounded}
							value={name}
							onChangeText={setName}
							placeholder={t('goals:taskName')}
						/>
						<TextInput
							style={components.textInputRounded}
							numberOfLines={2}
							multiline
							value={description}
							onChangeText={setDescription}
							placeholder={t('goals:taskDescription')}
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
