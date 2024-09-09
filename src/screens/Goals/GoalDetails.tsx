import { Text, View, TouchableOpacity } from 'react-native';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useEffect, useState } from 'react';
import { RootScreenProps } from '@/types/navigation';
import {
	ActionDialog,
	EditDialog,
	ItemCard,
	TaskTopBar,
} from '@/components/molecules';
import type { Task } from '@/types/schemas';
import { useGoalActions } from '@/hooks/goals/useGoalActions';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTaskActions } from '@/hooks/tasks/useTaskActions';
import { GreenRoundedButton } from '@/components/atoms';
import { deleteGoalMutation } from '@/api';
import { useTaskHandlers } from '@/hooks/tasks/useTaskHandlers';

function GoalDetails({ route, navigation }: RootScreenProps<'GoalDetails'>) {
	const { goal } = route.params;
	const { t } = useTranslation(['goals']);
	const { layout, fonts, gutters, components } = useTheme();
	const [tasks, setTasks] = useState<Task[]>([]);
	const [visible, setVisible] = useState([false, false]);
	const [goalName, setGoalName] = useState(goal.name);
	const [goalDescription, setGoalDescription] = useState(goal.description);
	const { deleteGoal, editGoal, handleOfflineDeleteGoal } = useGoalActions(
		goal.id,
		goal.goalId,
	);
	const { findMostImportantTask, countTasks } = useTaskActions(goal.goalId);
	const { handleGetTasks, data } = useTaskHandlers(goal);
	const isFocused = useIsFocused();
	const mostImportantTask = findMostImportantTask();
	const taskCount = countTasks(tasks);
	useEffect(() => {
		setTasks(handleGetTasks());
	}, [isFocused, data]);

	const handleDelete = () => {
		deleteGoal();
		navigation.goBack();
	};
	const handleSetVisible = (index: number) => {
		setVisible(prevVisible =>
			prevVisible.map((item, i) => (i === index ? !item : item)),
		);
	};
	const handleEdit = (newName: string, newDescription: string) => {
		editGoal(newName, newDescription);
		setGoalName(newName);
		setGoalDescription(newDescription);
		handleSetVisible(0);
	};

	const handleNavigateToTasks = () => {
		navigation.push('Tasks', { goal });
	};

	return (
		<SafeScreen>
			<TaskTopBar
				onDelete={() => handleSetVisible(1)}
				onEdit={() => handleSetVisible(0)}
			/>
			<EditDialog
				onEdit={handleEdit}
				onCancel={() => handleSetVisible(0)}
				visible={visible[0]}
				item={goal}
			/>
			<ActionDialog
				mutation={deleteGoalMutation}
				actionName="delete"
				action={handleDelete}
				id={goal.id}
				name={goal.name}
				visible={visible[1]}
				onCancel={() => handleSetVisible(1)}
				offlineAction={handleOfflineDeleteGoal}
			/>
			<View style={components.mainContainer}>
				<Text style={components.header}>{goalName}</Text>
				<Text style={[fonts.size_16, fonts.gray200]}>{goalDescription}</Text>
				{mostImportantTask && (
					<View style={[gutters.marginTop_16, layout.fullWidth]}>
						<Text style={[fonts.size_16, fonts.bold, fonts.gray200]}>
							{t('goals:nextTask')}
						</Text>
						<TouchableOpacity
							onPress={() =>
								navigation.push('Tasks', { goal, task: mostImportantTask })
							}
							style={[gutters.marginTop_12, layout.fullWidth]}
						>
							<ItemCard
								name={mostImportantTask.name}
								description={mostImportantTask.description}
							/>
						</TouchableOpacity>
					</View>
				)}
				<Text style={[fonts.size_16, fonts.gray400, gutters.marginTop_16]}>
					{t('goals:tasksCompleted')}: {taskCount.completed}/{taskCount.total}
				</Text>
				<GreenRoundedButton
					handlePress={handleNavigateToTasks}
					text="goToTasks"
				/>
			</View>
		</SafeScreen>
	);
}

export default GoalDetails;
