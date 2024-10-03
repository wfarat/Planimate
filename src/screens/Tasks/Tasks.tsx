import { View } from 'react-native';

import { SafeScreen } from '@/components/template';
import { useEffect, useState } from 'react';
import TasksList from '@/screens/Tasks/TasksList';
import { RootScreenProps } from '@/types/navigation';
import { EditDialog, TaskTopBar, ActionDialog } from '@/components/molecules';
import type { Task } from '@/types/schemas';
import { useIsFocused } from '@react-navigation/native';
import { GreenRoundedButton, TasksHeader } from '@/components/atoms';
import { useTaskHandlers } from '@/hooks/tasks/useTaskHandlers';
import { deleteTask, finishTask } from '@/api';

function Tasks({ route, navigation }: RootScreenProps<'Tasks'>) {
	const { goal, task } = route.params;
	const [tasks, setTasks] = useState<Task[]>([]);
	const [visible, setVisible] = useState([false, false, false]);
	const [taskName, setTaskName] = useState(task?.name || '');
	const {
		handleDeleteTask,
		handleFinishTask,
		handleEditTask,
		handleReorder,
		handleGetTasks,
		handleOfflineFinishTask,
		handleOfflineDeleteTask,
		handleOfflineReorder,
	} = useTaskHandlers(goal, setTasks, task);
	const isFocused = useIsFocused();
	useEffect(() => {
		setTasks(handleGetTasks().sort((a, b) => a.order - b.order));
	}, [task?.taskId, isFocused]);

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
				offlineAction: handleOfflineFinishTask,
			},
		},
		{
			props: {
				visible: visible[2],
				onCancel: () => handleCancel(2),
				mutation: deleteTask,
				actionName: 'delete',
				action: handleDeleteTask,
				offlineAction: handleOfflineDeleteTask,
			},
		},
	];
	const handleGenerate = () => {
		navigation.push('GenerateTasks', { goal, task, tasks });
	};

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
			<TasksList
				tasks={tasks}
				navigation={navigation}
				route={route}
				handleReorder={handleReorder}
				handleOfflineReorder={handleOfflineReorder}
				ListHeaderComponent={
					<TasksHeader
						goalName={goal.name}
						taskName={taskName}
						handlePress={handlePress}
					/>
				}
				ListFooterComponent={
					<GreenRoundedButton
						handlePress={handleGenerate}
						text="generateTasks"
					/>
				}
			/>
		</SafeScreen>
	);
}

export default Tasks;
