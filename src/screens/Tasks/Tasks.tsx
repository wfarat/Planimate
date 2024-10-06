import { useState } from 'react';
import { View } from 'react-native';
import { SafeScreen } from '@/components/template';
import TasksList from '@/screens/Tasks/TasksList';
import { RootScreenProps } from '@/types/navigation';
import { EditDialog, TaskTopBar, ActionDialog } from '@/components/molecules';
import type { Task } from '@/types/schemas';
import { GreenRoundedButton, TasksHeader } from '@/components/atoms';
import { useTaskHandlers } from '@/hooks/tasks/useTaskHandlers';
import { useGoalActions } from '@/hooks/goals/useGoalActions';
import { useMMKVString } from 'react-native-mmkv';
import { storage } from '@/storage/storage';
import { useTheme } from '@/theme';

function Tasks({ route, navigation }: RootScreenProps<'Tasks'>) {
	const { goal, task } = route.params;
	const [visible, setVisible] = useState([false, false, false]);
	const [goalName, setGoalName] = useState(goal.name);
	const [taskName, setTaskName] = useState(task?.name || '');
	const { components } = useTheme();
	const {
		handleDeleteTask,
		handleFinishTask,
		handleEdit,
		handleReorder,
		storageString,
	} = useTaskHandlers(goal, task);
	const [tasksString] = useMMKVString(storageString, storage);
	const { editGoal, deleteGoal } = useGoalActions(goal.goalId);
	const tasks = (tasksString ? (JSON.parse(tasksString) as Task[]) : []).sort(
		(a, b) => a.order - b.order,
	);

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
	const handleEditTask = (newName: string, newDescription: string) => {
		handleEdit(newName, newDescription);
		setTaskName(newName);
		if (task) {
			navigation.setParams({
				task: { ...task, name: newName, description: newDescription },
			});
		}
		handleSetVisible(0);
	};
	const handleDeleteGoal = () => {
		deleteGoal();
		navigation.goBack();
	};
	const handleEditGoal = (newName: string, newDescription: string) => {
		editGoal(newName, newDescription);
		setGoalName(newName);
		navigation.setParams({
			goal: { ...goal, name: newName, description: newDescription },
		});
		handleSetVisible(0);
	};
	const handleGenerate = () => {
		navigation.push('GenerateTasks', { goal, task, tasks });
	};

	return (
		<SafeScreen>
			{task ? (
				<TaskTopBar
					isCompletionPossible={tasks.every(item => item.completed)}
					onDelete={() => handleSetVisible(2)}
					onFinish={() => handleSetVisible(1)}
					onEdit={() => handleSetVisible(0)}
					addToAgenda={handleAddToAgenda}
				/>
			) : (
				<TaskTopBar
					onDelete={() => handleSetVisible(2)}
					onEdit={() => handleSetVisible(0)}
				/>
			)}
			<ActionDialog
				actionName="delete"
				action={task ? handleDeleteTask : handleDeleteGoal}
				name={task ? taskName : goalName}
				visible={visible[2]}
				onCancel={() => handleCancel(2)}
			/>
			<EditDialog
				onEdit={task ? handleEditTask : handleEditGoal}
				onCancel={() => handleCancel(0)}
				visible={visible[0]}
				itemName={task ? task.name : goal.name}
			/>
			{task && (
				<ActionDialog
					name={task.name}
					visible={visible[1]}
					onCancel={() => handleCancel(1)}
					actionName="complete"
					action={handleFinishTask}
				/>
			)}
			<TasksList
				tasks={tasks}
				navigation={navigation}
				route={route}
				handleReorder={handleReorder}
				ListHeaderComponent={
					<TasksHeader
						goalName={goalName}
						taskName={taskName}
						handlePress={handlePress}
					/>
				}
			/>
			<View style={components.bottomButtonContainer}>
				<GreenRoundedButton handlePress={handleGenerate} text="generateTasks" />
			</View>
		</SafeScreen>
	);
}

export default Tasks;
