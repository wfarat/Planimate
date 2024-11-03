import { TouchableOpacity } from 'react-native';
import type { Task } from '@/types/schemas';
import { TaskListProps } from '@/types/navigation';
import { ItemCard } from '@/components/molecules';
import DragList, { DragListRenderItemInfo } from 'react-native-draglist';
import { useTheme } from '@/theme';

function TasksList({
	navigation,
	route,
	tasks,
	handleReorder,
	ListHeaderComponent,
}: TaskListProps<'Tasks'>) {
	const { goal } = route.params;
	const { components, layout, gutters } = useTheme();
	const renderItem = (info: DragListRenderItemInfo<Task>) => {
		const { item, onDragStart, onDragEnd } = info;
		return (
			<TouchableOpacity
				onPress={() => navigation.push('Tasks', { goal, task: item })}
				onLongPress={onDragStart}
				onPressOut={onDragEnd}
			>
				<ItemCard
					name={item.name}
					description={item.description}
					dueDate={item.dueDate}
					task={item}
				/>
			</TouchableOpacity>
		);
	};

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
		handleReorder(reorderedTasks);
	};
	return (
		<DragList
			data={tasks}
			keyExtractor={item => `${item.goalId}.${item.taskId}`}
			renderItem={renderItem}
			onReordered={onReordered}
			style={layout.fullWidth}
			containerStyle={[components.mainContainer, gutters.paddingBottom_120]}
			ListHeaderComponent={ListHeaderComponent}
		/>
	);
}

export default TasksList;
