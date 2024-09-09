import { View, TouchableOpacity } from 'react-native';
import type { Task } from '@/types/schemas';
import { TaskListProps } from '@/types/navigation';
import { ItemCard } from '@/components/molecules';
import DragList, { DragListRenderItemInfo } from 'react-native-draglist';
import { updateTaskOrder } from '@/controllers/goals';
import { useStorage } from '@/storage/StorageContext';
import { useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';

function TasksList({
	navigation,
	route,
	tasks,
	handleReorder,
	handleOfflineReorder,
}: TaskListProps<'Tasks'>) {
	const { goal } = route.params;
	const storage = useStorage();
	const { isSuccess, mutate, data } = updateTaskOrder();
	const { isConnected } = useNetInfo();
	const token = storage.getString('token');
	const renderItem = (info: DragListRenderItemInfo<Task>) => {
		const { item, onDragStart, onDragEnd } = info;
		return (
			<TouchableOpacity
				onPress={() => navigation.push('Tasks', { goal, task: item })}
				onPressIn={onDragStart}
				onPressOut={onDragEnd}
			>
				<ItemCard
					name={item.name}
					description={item.description}
					completed={item.completed}
					dueDate={item.dueDate}
					duration={item.duration}
				/>
			</TouchableOpacity>
		);
	};
	useEffect(() => {
		if (isSuccess && data) handleReorder(data);
	}, [isSuccess]);
	const reorder = (fromIndex: number, toIndex: number) => {
		const result = [...tasks];
		const removed = result.splice(fromIndex, 1);
		result.splice(toIndex, 0, removed[0]);
		return result.map((oldTask, index) => ({
			...oldTask,
			updatedAt: new Date().toISOString(),
			order: index,
		}));
	};
	const onReordered = (fromIndex: number, toIndex: number) => {
		const reorderedTasks = reorder(fromIndex, toIndex);
		if (token && isConnected) {
			mutate({ tasks: reorderedTasks, token });
		} else {
			handleReorder(reorderedTasks);
			handleOfflineReorder(reorderedTasks);
		}
	};
	return (
		<View>
			<DragList
				data={tasks}
				keyExtractor={item => `${item.goalId}.${item.taskId}`}
				renderItem={renderItem}
				onReordered={onReordered}
			/>
		</View>
	);
}

export default TasksList;
