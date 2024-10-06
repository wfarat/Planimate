import { View, ListRenderItem, FlatList, TouchableOpacity } from 'react-native';

import { Goal } from '@/types/schemas';
import { RootScreenProps } from '@/types/navigation';
import { ItemCard } from '@/components/molecules';
import { useMMKVString } from 'react-native-mmkv';
import { storage } from '@/storage/storage';

function GoalsList({ navigation }: RootScreenProps<'Goals'>) {
	const [goalsString] = useMMKVString('goals', storage);
	const goals = goalsString ? (JSON.parse(goalsString) as Goal[]) : [];
	const renderItem: ListRenderItem<Goal> = ({ item }: { item: Goal }) => (
		<TouchableOpacity
			key={item.goalId}
			onPress={() => navigation.navigate('Tasks', { goal: item })}
		>
			<ItemCard
				name={item.name}
				description={item.description}
				dueDate={item.dueDate}
			/>
		</TouchableOpacity>
	);
	return (
		<View>
			<FlatList
				data={goals}
				keyExtractor={(item, index) => index.toString()}
				renderItem={renderItem}
			/>
		</View>
	);
}

export default GoalsList;
