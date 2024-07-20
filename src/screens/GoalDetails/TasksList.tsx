import {
	Text,
	View,
	ListRenderItem,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import { useTheme } from '@/theme';
import { useEffect, useState } from 'react';
import { useStorage } from '@/storage/StorageContext';
import SendImage from '@/theme/assets/images/send.png';
import { Goal, NameAndDescription } from '@/types/schemas';
import { isImageSourcePropType } from '@/types/guards/image';
import SendButton from '@/components/molecules/SendButton/SendButton';
import { ListProps } from '@/types/navigation';
import type { Task } from '@/types/schemas';

function TasksList({ navigation, route, clean }: ListProps<'GoalDetails'>) {
	const storage = useStorage();
	const { goal } = route.params;
	const { layout, gutters, borders } = useTheme();
	const [tasks, setTasks] = useState<Task[]>([]);
	const lastId = tasks.length > 0 ? tasks[tasks.length - 1].id : 0;
	useEffect(() => {
		if (goal.tasks) setTasks(goal.tasks);
	}, []);
	const addTask = () => {
		let name = '';
		let description = '';
		const storedState = storage.getString('tasks.state');
		if (storedState) {
			({ name, description } = JSON.parse(storedState) as NameAndDescription);
		}
		if (name.trim()) {
			const task = {
				name,
				description,
				goalId: goal.id,
				id: lastId + 1,
				tasks: [],
				completed: false,
			};
			setTasks([...tasks, task]);
			const savedGoals = storage.getString('goals');
			if (savedGoals) {
				const goals = JSON.parse(savedGoals) as Goal[];
				const updatedGoals = goals.map(item => {
					if (item.id === goal.id) {
						console.log(item.id);
						return {
							...item,
							tasks: [...item.tasks, task],
						};
					}
					return item;
				});
				storage.set('goals', JSON.stringify(updatedGoals));
				clean();
			}
		}
	};
	if (!isImageSourcePropType(SendImage)) {
		throw new Error('Image source is not valid');
	}
	const renderItem: ListRenderItem<Goal> = ({ item }: { item: Goal }) => (
		<TouchableOpacity
			key={item.id}
			onPress={() => navigation.navigate('GoalDetails', { goal: item })}
		>
			<View
				style={[
					gutters.marginBottom_16,
					borders.gray400,
					borders.w_1,
					layout.fullWidth,
				]}
			>
				<Text>{item.name}</Text>
				<Text>{item.description}</Text>
			</View>
		</TouchableOpacity>
	);
	return (
		<View>
			<SendButton handlePress={addTask} />
			<View>
				<FlatList
					data={tasks}
					keyExtractor={(item, index) => index.toString()}
					renderItem={renderItem}
				/>
			</View>
		</View>
	);
}

export default TasksList;
