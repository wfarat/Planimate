import { View, ListRenderItem, FlatList, TouchableOpacity } from 'react-native';

import { useTheme } from '@/theme';
import { useEffect, useState } from 'react';
import { useStorage } from '@/storage/StorageContext';
import SendImage from '@/theme/assets/images/send.png';
import { Goal } from '@/types/schemas';
import { isImageSourcePropType } from '@/types/guards/image';
import { ListProps } from '@/types/navigation';
import { ItemCard } from '@/components/molecules';
import { useIsFocused } from '@react-navigation/native';

function GoalsList({ navigation }: ListProps<'Goals'>) {
	const storage = useStorage();
	const { layout } = useTheme();
	const [goals, setGoals] = useState<Goal[]>([]);
	const isFocused = useIsFocused();
	useEffect(() => {
		const storedGoals = storage.getString('goals');
		if (storedGoals) {
			setGoals(JSON.parse(storedGoals) as Goal[]);
		} else setGoals([]);
	}, [isFocused]);

	if (!isImageSourcePropType(SendImage)) {
		throw new Error('Image source is not valid');
	}
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
			<View>
				<FlatList
					data={goals}
					keyExtractor={(item, index) => index.toString()}
					renderItem={renderItem}
				/>
			</View>
		</View>
	);
}

export default GoalsList;
