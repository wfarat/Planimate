// GoalDetails.tsx
import { Text, View, TouchableOpacity } from 'react-native';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useEffect, useState } from 'react';
import { RootScreenProps } from '@/types/navigation';
import { EditDialog, ItemCard, TaskTopBar } from '@/components/molecules';
import type { Task } from '@/types/schemas';
import { useStorage } from '@/storage/StorageContext';
import { useGoalActions } from '@/helpers/hooks/useGoalActions';
import { useIsFocused } from '@react-navigation/native';
import alertAction from '@/helpers/utils/alertAction';
import { useTranslation } from 'react-i18next';
import { useTaskActions } from '@/helpers/hooks/useTaskActions';
import { GreenRoundedButton } from '@/components/atoms';

function GoalDetails({ route, navigation }: RootScreenProps<'GoalDetails'>) {
	const { goal } = route.params;
	const storage = useStorage();
	const { t } = useTranslation(['goals']);
	const { layout, fonts, gutters, borders } = useTheme();
	const [tasks, setTasks] = useState<Task[]>([]);
	const [visible, setVisible] = useState(false);
	const [goalName, setGoalName] = useState(goal.name);
	const [goalDescription, setGoalDescription] = useState(goal.description);
	const { deleteGoal, editGoal } = useGoalActions(goal.id);
	const { findMostImportantTask } = useTaskActions(goal.id);
	const isFocused = useIsFocused();
	const mostImportantTask = findMostImportantTask();
	const storageString = `goals.${goal.id}`;

	useEffect(() => {
		if (isFocused) {
			const storedTasks = storage.getString(storageString);
			if (storedTasks) {
				setTasks(JSON.parse(storedTasks) as Task[]);
			} else {
				setTasks([]);
			}
		}
	}, [isFocused]);

	const handleDelete = () => {
		deleteGoal();
		navigation.goBack();
	};

	const handleEdit = (newName: string, newDescription: string) => {
		editGoal(newName, newDescription);
		setGoalName(newName);
		setGoalDescription(newDescription);
		setVisible(false);
	};

	const handleCancel = () => {
		setVisible(false);
	};

	const handleAlert = () => {
		alertAction('delete', goal.name, handleDelete);
	};

	const handleNavigateToTasks = () => {
		navigation.push('Tasks', { goal });
	};

	return (
		<SafeScreen>
			<TaskTopBar onDelete={handleAlert} onEdit={() => setVisible(true)} />
			<EditDialog
				onEdit={handleEdit}
				onCancel={handleCancel}
				visible={visible}
				oldName={goal.name}
			/>
			<View
				style={[
					layout.justifyCenter,
					layout.itemsCenter,
					gutters.marginTop_80,
					gutters.padding_32,
				]}
			>
				<Text style={[fonts.size_24, fonts.gray200]}>{goalName}</Text>
				<Text style={[fonts.size_16, fonts.gray200, gutters.marginTop_12]}>
					{goalDescription}
				</Text>
				<Text style={[fonts.size_16, fonts.gray400, gutters.marginTop_16]}>
					{t('goals:tasksLeft')}: {tasks.filter(task => !task.completed).length}
					/{tasks.length}
				</Text>
				<GreenRoundedButton
					handlePress={handleNavigateToTasks}
					text="goToTasks"
				/>
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
			</View>
		</SafeScreen>
	);
}

export default GoalDetails;
