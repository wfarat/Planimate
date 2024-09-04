import { Text, View } from 'react-native';

import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useEffect, useState } from 'react';
import TasksList from '@/screens/Tasks/TasksList';
import { RootScreenProps } from '@/types/navigation';
import { EditDialog, TaskTopBar, ActionDialog } from '@/components/molecules';
import type { Task } from '@/types/schemas';
import { useIsFocused } from '@react-navigation/native';
import { GreenRoundedButton } from '@/components/atoms';
import { useTaskHandlers } from '@/helpers/hooks/tasks/useTaskHandlers';
import { deleteTask, finishTask } from '@/controllers/goals';

function Tasks({ route, navigation }: RootScreenProps<'Tasks'>) {
	const { goal, task } = route.params;
	const { layout, fonts, gutters, components } = useTheme();
	const [tasks, setTasks] = useState<Task[]>([]);
	const [visible, setVisible] = useState([false, false, false]);
	const [taskName, setTaskName] = useState(task?.name || '');
	const {
		handleDeleteTask,
		handleFinishTask,
		handleEditTask,
		handleReorder,
		handleGetTasks,
		data,
	} = useTaskHandlers(goal, setTasks, task);
	const isFocused = useIsFocused();
	useEffect(() => {
		setTasks(handleGetTasks());
	}, [task?.taskId, isFocused, data]);

	const handleAddToAgenda = () => {
		if (task) navigation.push('AddToAgenda', { task });
	};
	const handlePress = () => {
		navigation.push('AddTask', { tasks, task, goal });
	};
	const handleSetVisible = (index: number) => {
		setVisible(prevVisible =>
			prevVisible.map((item, i) => (i === index ? !item : item)),
		);
	};
	const handleCancel = (index: number) => {
		handleSetVisible(index);
	};
	const handleEdit = (newName: string, newDescription: string) => {
		handleEditTask(newName, newDescription);
		setTaskName(newName);
		if (task) {
			navigation.setParams({
				task: { ...task, name: newName, description: newDescription },
			});
		}
		handleSetVisible(0);
	};
	const actionDialogConfig = [
		{
			props: {
				visible: visible[1],
				onCancel: () => handleCancel(1),
				mutation: finishTask,
				actionName: 'complete',
				action: handleFinishTask,
			},
		},
		{
			props: {
				visible: visible[2],
				onCancel: () => handleCancel(2),
				mutation: deleteTask,
				actionName: 'delete',
				action: handleDeleteTask,
			},
		},
	];
	return (
		<SafeScreen>
			{task && (
				<View>
					<TaskTopBar
						isCompletionPossible={tasks.every(item => item.completed)}
						onDelete={() => handleSetVisible(2)}
						onFinish={() => handleSetVisible(1)}
						onEdit={() => handleSetVisible(0)}
						addToAgenda={handleAddToAgenda}
					/>
					<EditDialog
						onEdit={handleEdit}
						onCancel={() => handleCancel(0)}
						visible={visible[0]}
						item={task}
					/>
					{actionDialogConfig.map((config, index) => (
						<ActionDialog
							key={`action-${index}`}
							name={task.name}
							id={task.id}
							{...config.props}
						/>
					))}
				</View>
			)}
			<View style={components.mainContainer}>
				<Text style={[fonts.size_24, fonts.gray200]}>{goal.name}</Text>
				{task && <Text style={[fonts.size_24, fonts.gray200]}>{taskName}</Text>}
				<GreenRoundedButton handlePress={handlePress} text="addTask" />
				<View style={[gutters.marginTop_16, layout.fullWidth]}>
					<TasksList
						tasks={tasks}
						navigation={navigation}
						route={route}
						handleReorder={handleReorder}
					/>
				</View>
			</View>
		</SafeScreen>
	);
}

export default Tasks;
