import { Text, View, TouchableOpacity } from 'react-native';

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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Tasks({ route, navigation }: RootScreenProps<'Tasks'>) {
	const { goal, task } = route.params;
	const storage = useStorage();
	const { layout, fonts, gutters, colors, borders } = useTheme();
	const [tasks, setTasks] = useState<Task[]>([]);
	const [visible, setVisible] = useState(false);
	const [taskName, setTaskName] = useState(task?.name || '');
	const { deleteTask, finishTask, editTask, updateTasks } = useTaskActions(
		goal.id,
		task?.taskId,
		task?.id,
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
	const handleDelete = () => {
		deleteTask();
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
		if (task) navigation.push('AddToAgendaScreen', { task });
	};
	const handlePress = () => {
		navigation.push('AddTaskScreen', { tasks, task, goal });
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
			<View
				style={[
					layout.justifyCenter,
					layout.itemsCenter,
					gutters.marginTop_80,
					gutters.padding_16,
				]}
			>
				<Text style={[fonts.size_24, fonts.gray200]}>{goal.name}</Text>
				{task && <Text style={[fonts.size_24, fonts.gray200]}>{taskName}</Text>}
				<View
					style={[layout.itemsCenter, layout.fullWidth, gutters.padding_16]}
				>
					<TouchableOpacity
						onPress={handlePress}
						style={[
							layout.row,
							borders.w_1,
							borders.gray400,
							borders.rounded_4,
						]}
					>
						<Text style={[fonts.gray400, fonts.size_24]}>Add Task</Text>
						<MaterialCommunityIcons
							name="plus-box"
							color={colors.gray400}
							size={36}
						/>
					</TouchableOpacity>
					<View
						style={[gutters.marginTop_16, layout.fullWidth, gutters.padding_16]}
					>
						<TasksList
							tasks={tasks}
							navigation={navigation}
							route={route}
							setTasks={handleSetTasks}
						/>
					</View>
				</View>
			</View>
		</SafeScreen>
	);
}

export default Tasks;
