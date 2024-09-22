import { useStorage } from '@/storage/StorageContext';
import { useEffect, useState } from 'react';
import { GeneratedTask } from '@/types/schemas';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import {
	ActivityIndicator,
	FlatList,
	ListRenderItemInfo,
	TouchableOpacity,
	View,
} from 'react-native';
import { GeneratedTaskCard } from '@/components/molecules';
import { GreenRoundedButton } from '@/components/atoms';
import { generateTasks } from '@/api';
import { RootScreenProps } from '@/types/navigation';
import { useTaskActions } from '@/hooks/tasks/useTaskActions';

function GenerateTasks({
	navigation,
	route,
}: RootScreenProps<'GenerateTasks'>) {
	const { goal, task, tasks } = route.params;
	const storage = useStorage();
	const { components } = useTheme();
	const [generatedTasks, setGeneratedTasks] = useState<GeneratedTask[]>([]);
	const [pickedTasks, setPickedTasks] = useState<GeneratedTask[]>([]);
	const { mutate, isPending, isSuccess, data } = generateTasks();
	const { createTask, updateTasks, addOfflineAction } = useTaskActions(
		goal.goalId,
		task?.taskId,
		task?.taskId,
	);
	const token = storage.getString('token');
	useEffect(() => {
		if (data) setGeneratedTasks(data);
	}, [isSuccess]);
	const handlePickTask = (item: GeneratedTask) => {
		setPickedTasks([...pickedTasks, item]);
	};
	const renderItem = ({ item }: ListRenderItemInfo<GeneratedTask>) => {
		return (
			<TouchableOpacity onPress={() => handlePickTask(item)}>
				<GeneratedTaskCard
					generatedTask={item}
					picked={pickedTasks.includes(item)}
				/>
			</TouchableOpacity>
		);
	};
	const handleGenerate = () => {
		if (token) mutate({ goal, task, token });
	};
	const handleSave = () => {
		const newTasks = pickedTasks.map(pickedTask =>
			createTask(
				tasks.length,
				pickedTask.name,
				pickedTask.description,
				pickedTask.duration,
				pickedTask.dueDate,
			),
		);
		updateTasks(newTasks, task?.taskId);
		newTasks.forEach(newTask =>
			addOfflineAction({ type: 'create', task: newTask }),
		);
		navigation.goBack();
	};
	return (
		<SafeScreen>
			<View style={components.mainContainer}>
				{isPending ? (
					<ActivityIndicator />
				) : isSuccess ? (
					<GreenRoundedButton handlePress={handleSave} text="saveTasks" />
				) : (
					<GreenRoundedButton
						handlePress={handleGenerate}
						text="generateTasks"
					/>
				)}
				<FlatList
					data={generatedTasks}
					renderItem={renderItem}
					keyExtractor={(item, index) => index.toString()}
				/>
			</View>
		</SafeScreen>
	);
}

export default GenerateTasks;
