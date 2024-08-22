import { View, TouchableOpacity } from 'react-native';
import type { Task } from '@/types/schemas';
import { TaskListProps } from '@/types/navigation';
import { ItemCard } from '@/components/molecules';
import DragList, { DragListRenderItemInfo } from 'react-native-draglist';

function TasksList({
	navigation,
	route,
	tasks,
	setTasks,
}: TaskListProps<'Tasks'>) {
	const { goal } = route.params;

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
	const onReordered = (fromIndex: number, toIndex: number) => {
		const copy = [...tasks]; // Don't modify react data in-place
		const removed = copy.splice(fromIndex, 1);
		copy.splice(toIndex, 0, removed[0]); // Now insert at the new pos
		setTasks(copy);
	};
	return (
		<View>
			<DragList
				data={tasks}
				keyExtractor={item => `${item.goalId}.${item.id}`}
				renderItem={renderItem}
				onReordered={onReordered}
			/>
		</View>
	);
}

export default TasksList;
