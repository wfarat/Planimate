import { storage } from '@/storage/storage';
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
import { generateTasks, saveTasks } from '@/api';
import { RootScreenProps } from '@/types/navigation';
import { useTaskActions } from '@/hooks/tasks/useTaskActions';
import { useNetInfo } from '@react-native-community/netinfo';
import i18next from 'i18next';

function GenerateTasks({
	navigation,
	route,
}: RootScreenProps<'GenerateTasks'>) {
	const { goal, task, tasks } = route.params;

	const { components } = useTheme();
	const { isConnected } = useNetInfo();
	const [generatedTasks, setGeneratedTasks] = useState<GeneratedTask[]>([]);
	const [pickedTasks, setPickedTasks] = useState<Set<GeneratedTask>>(new Set());
	const { language } = i18next;
	const { mutate, isPending, isSuccess, data } = generateTasks();
	const saveMutation = saveTasks();
	const {
		createTask,
		updateTasks,
		addOfflineAction,
		saveGeneratedTasks,
		getGeneratedTasks,
	} = useTaskActions(goal.goalId, task?.taskId, task?.taskId);
	const token = storage.getString('token');
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
	useEffect(() => {
		if (saveMutation.data) addTasks(saveMutation.data);
	}, [saveMutation.isSuccess]);
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
		if (token) mutate({ goal, task, language, token });
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
			),
		);
		if (token && isConnected) {
			saveMutation.mutate({ tasks: newTasks, token });
		} else {
			newTasks.forEach(newTask =>
				addOfflineAction({ type: 'create', task: newTask }),
			);
			addTasks(newTasks);
		}
	};
	const isActivityIndicatorVisible = isPending || saveMutation.isPending;
	const hasGeneratedTasks = generatedTasks.length > 0;

	const renderActionButton = () => {
		if (isActivityIndicatorVisible) {
			return <ActivityIndicator />;
		}
		if (hasGeneratedTasks) {
			return <GreenRoundedButton handlePress={handleSave} text="saveTasks" />;
		}
		return (
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
