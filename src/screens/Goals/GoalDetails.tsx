// GoalDetails.tsx
import { Text, View, TouchableOpacity } from 'react-native';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useEffect, useState } from 'react';
import { RootScreenProps } from '@/types/navigation';
import { EditDialog, TaskTopBar } from '@/components/molecules';
import type { Task } from '@/types/schemas';
import { useStorage } from '@/storage/StorageContext';
import { useGoalActions } from '@/helpers/hooks/useGoalActions';
import { useIsFocused } from '@react-navigation/native';
import alertAction from '@/helpers/utils/alertAction';

function GoalDetails({ route, navigation }: RootScreenProps<'GoalDetails'>) {
	const { goal } = route.params;
	const storage = useStorage();
	const { layout, fonts, gutters, borders } = useTheme();
	const [tasks, setTasks] = useState<Task[]>([]);
	const [visible, setVisible] = useState(false);
	const [goalName, setGoalName] = useState(goal.name);
	const [goalDescription, setGoalDescription] = useState(goal.description);
	const { deleteGoal, editGoal } = useGoalActions(goal.id);
	const storageString = `goals.${goal.id}`;
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
	}, [isFocused]);
	const findMostImportantTask = (): Task | null => {
		const traverseTasks = (list: Task[]): Task | null => {
			return list.reduce<Task | null>((result, task) => {
				if (result) {
					return result;
				}
				if (!task.completed) {
					const data = storage.getString(`goals.${goal.id}.${task.id}`);
					if (data) {
						const subTasks = JSON.parse(data) as Task[];
						if (subTasks.length === 0) {
							return task;
						}
						return traverseTasks(subTasks) || task;
					}
					return task;
				}
				return null;
			}, null);
		};
		return traverseTasks(tasks);
	};

	const mostImportantTask = findMostImportantTask();

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
					gutters.padding_16,
				]}
			>
				<Text style={[fonts.size_24, fonts.gray200]}>{goalName}</Text>
				<Text style={[fonts.size_16, fonts.gray200, gutters.marginTop_12]}>
					{goalDescription}
				</Text>
				<Text style={[fonts.size_16, fonts.gray400, gutters.marginTop_16]}>
					Tasks left: {tasks.filter(task => !task.completed).length}/
					{tasks.length}
				</Text>
				<TouchableOpacity
					onPress={handleNavigateToTasks}
					style={[
						layout.row,
						borders.w_1,
						borders.gray400,
						borders.rounded_4,
						gutters.marginTop_16,
						gutters.padding_12,
					]}
				>
					<Text style={[fonts.gray400]}>Go to Tasks List</Text>
				</TouchableOpacity>
				{mostImportantTask && (
					<View style={[gutters.marginTop_16]}>
						<Text style={[fonts.size_16, fonts.bold, fonts.gray200]}>
							Next tasks to do:
						</Text>
						<Text style={[fonts.size_16, fonts.gray200, gutters.marginTop_12]}>
							{mostImportantTask.name}
						</Text>
					</View>
				)}
			</View>
		</SafeScreen>
	);
}

export default GoalDetails;
