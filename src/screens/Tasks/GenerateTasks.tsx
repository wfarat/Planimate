import { useEffect, useState } from 'react';
import { GeneratedTask, Task } from '@/types/schemas';
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
import { generateTasks } from '@/api/generate';
import { RootScreenProps } from '@/types/navigation';
import { useTaskActions } from '@/hooks/tasks/useTaskActions';
import i18next from 'i18next';

function GenerateTasks({
	navigation,
	route,
}: RootScreenProps<'GenerateTasks'>) {
	const { goal, task, tasks } = route.params;

	const { components } = useTheme();
	const [generatedTasks, setGeneratedTasks] = useState<GeneratedTask[]>([]);
	const [pickedTasks, setPickedTasks] = useState<Set<GeneratedTask>>(new Set());
	const { language } = i18next;
	const { mutate, isPending, isSuccess, data } = generateTasks();
	const { createTask, updateTasks, saveGeneratedTasks, getGeneratedTasks } =
		useTaskActions(goal.goalId, task?.taskId, task?.taskId);
	const addTasks = (newTasks: Task[]) => {
		const updatedTasks = [...tasks, ...newTasks];
		updateTasks(updatedTasks, task?.taskId);
		navigation.goBack();
	};
	useEffect(() => {
		setGeneratedTasks(getGeneratedTasks());
	}, []);
	useEffect(() => {
		if (data) {
			setGeneratedTasks(data);
			saveGeneratedTasks(data);
		}
	}, [isSuccess]);

	const handlePickTask = (item: GeneratedTask) => {
		const updatedPickedTasks = new Set(pickedTasks);

		// If the task is already in the set, remove it; otherwise, add it
		if (updatedPickedTasks.has(item)) {
			updatedPickedTasks.delete(item);
		} else {
			updatedPickedTasks.add(item);
		}

		setPickedTasks(updatedPickedTasks);
	};

	const renderItem = ({ item }: ListRenderItemInfo<GeneratedTask>) => {
		return (
			<TouchableOpacity onPress={() => handlePickTask(item)}>
				<GeneratedTaskCard
					generatedTask={item}
					picked={pickedTasks.has(item)}
				/>
			</TouchableOpacity>
		);
	};
	const handleGenerate = () => {
		mutate({ goal, task, language });
	};
	const handleSave = () => {
		const newTasks = Array.from(pickedTasks).map(pickedTask =>
			createTask(
				tasks.length,
				pickedTask.name,
				pickedTask.description,
				pickedTask.divisible,
				pickedTask.duration,
				pickedTask.dueDate,
				pickedTask.repeats,
			),
		);
		addTasks(newTasks);
	};

	const hasGeneratedTasks = generatedTasks.length > 0;

	const renderActionButton = () => {
		if (hasGeneratedTasks) {
			return <GreenRoundedButton handlePress={handleSave} text="saveTasks" />;
		}
		return isPending ? (
			<ActivityIndicator size="large" />
		) : (
			<GreenRoundedButton handlePress={handleGenerate} text="generateTasks" />
		);
	};

	return (
		<SafeScreen>
			<View style={components.mainContainer}>
				{renderActionButton()}
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
