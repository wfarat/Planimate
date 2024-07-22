import { View, ListRenderItem, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme';
import SendImage from '@/theme/assets/images/send.png';
import type { Task } from '@/types/schemas';
import { isImageSourcePropType } from '@/types/guards/image';
import { ListProps } from '@/types/navigation';
import { ItemCard } from '@/components/molecules';

function TasksList({ navigation, route, tasks }: ListProps<'Tasks'>) {
	const { goal } = route.params;
	const { layout } = useTheme();
	if (!isImageSourcePropType(SendImage)) {
		throw new Error('Image source is not valid');
	}
	const renderItem: ListRenderItem<Task> = ({ item }: { item: Task }) => {
		return (
			<TouchableOpacity
				key={item.id}
				onPress={() => navigation.push('Tasks', { goal, task: item })}
			>
				<ItemCard
					name={item.name}
					description={item.description}
					completed={item.completed}
				/>
			</TouchableOpacity>
		);
	};

	return (
		<View style={layout.flex_1}>
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
