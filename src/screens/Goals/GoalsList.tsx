import { View, ListRenderItem, FlatList, TouchableOpacity } from 'react-native';

import { useEffect, useState } from 'react';
import { Goal } from '@/types/schemas';
import { RootScreenProps } from '@/types/navigation';
import { ItemCard } from '@/components/molecules';
import { useIsFocused } from '@react-navigation/native';
import { useGoalActions } from '@/hooks/goals/useGoalActions';

function GoalsList({ navigation }: RootScreenProps<'Goals'>) {
	const [goals, setGoals] = useState<Goal[]>([]);
	const isFocused = useIsFocused();
	const { getGoals } = useGoalActions();
	useEffect(() => {
		setGoals(getGoals());
	}, [isFocused]);

	const renderItem: ListRenderItem<Goal> = ({ item }: { item: Goal }) => (
		<TouchableOpacity
			key={item.id}
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
