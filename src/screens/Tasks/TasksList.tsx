import { View, ListRenderItem, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme';
import { useEffect, useState } from 'react';
import { useStorage } from '@/storage/StorageContext';
import SendImage from '@/theme/assets/images/send.png';
import type { Task, NameAndDescription } from '@/types/schemas';
import { isImageSourcePropType } from '@/types/guards/image';
import { ListProps } from '@/types/navigation';
import { ItemCard, SendButton } from '@/components/molecules';

function TasksList({ navigation, route, clean }: ListProps<'Tasks'>) {
	const storage = useStorage();
	const { goal, task } = route.params;
	const { layout } = useTheme();
	const [tasks, setTasks] = useState<Task[]>([]);
	const storedId = storage.getString(`goals.${goal.id}.lastId`);
	const lastId = storedId ? (JSON.parse(storedId) as number) : 0;
	const taskId = task ? task.id : undefined;
	const storageString = task
		? `goals.${goal.id}.${task.id}`
		: `goals.${goal.id}`;
	useEffect(() => {
		const storedTasks = storage.getString(storageString);
		if (storedTasks) {
			setTasks(JSON.parse(storedTasks) as Task[]);
		} else {
			setTasks([]);
		}
	}, [taskId]);
	const addTask = () => {
		let name = '';
		let description = '';
		const storedState = storage.getString('tasks.state');
		if (storedState) {
			({ name, description } = JSON.parse(storedState) as NameAndDescription);
		}
		if (name.trim()) {
			const newTask = {
				name,
				description,
				goalId: goal.id,
				id: lastId + 1,
				taskId,
				completed: false,
			};
			storage.set(`goals.${goal.id}.lastId`, JSON.stringify(lastId + 1));
			const updatedTasks = [...tasks, newTask];
			setTasks(updatedTasks);
			storage.set(storageString, JSON.stringify(updatedTasks));
			clean();
		}
	};
	if (!isImageSourcePropType(SendImage)) {
		throw new Error('Image source is not valid');
	}
	const renderItem: ListRenderItem<Task> = ({ item }: { item: Task }) => (
		<TouchableOpacity
			key={item.id}
			onPress={() => navigation.navigate('Tasks', { goal, task: item })}
		>
			<ItemCard name={item.name} description={item.description} />
		</TouchableOpacity>
	);
	return (
		<View style={layout.flex_1}>
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
