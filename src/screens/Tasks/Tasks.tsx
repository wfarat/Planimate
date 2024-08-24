import { Text, View } from 'react-native';

import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useEffect, useState } from 'react';
import TasksList from '@/screens/Tasks/TasksList';
import { RootScreenProps } from '@/types/navigation';
import { EditDialog, TaskTopBar } from '@/components/molecules';
import type { Task } from '@/types/schemas';
import { useStorage } from '@/storage/StorageContext';
import { useTaskActions } from '@/helpers/hooks/useTaskActions';
import { useIsFocused } from '@react-navigation/native';
import alertAction from '@/helpers/utils/alertAction';
import { GreenRoundedButton } from '@/components/atoms';

function Tasks({ route, navigation }: RootScreenProps<'Tasks'>) {
	const { goal, task } = route.params;
	const storage = useStorage();
	const { layout, fonts, gutters, components } = useTheme();
	const [tasks, setTasks] = useState<Task[]>([]);
	const [visible, setVisible] = useState(false);
	const [taskName, setTaskName] = useState(task?.name || '');
	const { deleteTask, finishTask, editTask, updateTasks } = useTaskActions(
		goal.id,
		task?.parentId,
		task?.taskId,
		task?._id,
	);
	const storageString = task
		? `goals.${goal.id}.${task.taskId}`
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
	}, [task?.taskId, isFocused]);
	const handleDelete = async () => {
		await deleteTask();
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
		alertAction('delete', task ? task.name : goal.name, handleDelete);
	};
	const handleEdit = (newName: string, newDescription: string) => {
		if (task) {
			editTask(newName, newDescription);
			setTaskName(newName); // Update task name state
			navigation.setParams({
				task: { ...task, name: newName, description: newDescription },
			});
		}
		setVisible(false);
	};
	const handleAddToAgenda = () => {
		if (task) navigation.push('AddToAgenda', { task });
	};
	const handlePress = () => {
		navigation.push('AddTask', { tasks, task, goal });
	};
	const handleSetTasks = (newTasks: Task[]) => {
		setTasks(newTasks);
		updateTasks(newTasks, task ? task.taskId : undefined);
	};
	return (
		<SafeScreen>
			{task && (
				<TaskTopBar
					isCompletionPossible={tasks.every(item => item.completed)}
					onDelete={handleAlert}
					onFinish={() => alertAction('complete', task.name, handleFinishTask)}
					onEdit={() => setVisible(true)}
					addToAgenda={handleAddToAgenda}
				/>
			)}
			<EditDialog
				onEdit={handleEdit}
				onCancel={handleCancel}
				visible={visible}
				oldName={task ? task.name : goal.name}
			/>
			<View style={components.mainContainer}>
				<Text style={[fonts.size_24, fonts.gray200]}>{goal.name}</Text>
				{task && <Text style={[fonts.size_24, fonts.gray200]}>{taskName}</Text>}
				<GreenRoundedButton handlePress={handlePress} text="addTask" />
				<View style={[gutters.marginTop_16, layout.fullWidth]}>
					<TasksList
						tasks={tasks}
						navigation={navigation}
						route={route}
						setTasks={handleSetTasks}
					/>
				</View>
			</View>
		</SafeScreen>
	);
}

export default Tasks;
