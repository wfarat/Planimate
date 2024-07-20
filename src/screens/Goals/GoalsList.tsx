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

function GoalsList({ navigation, clean }: ListProps<'Goals'>) {
	const storage = useStorage();
	const { layout, gutters, borders } = useTheme();
	const [goals, setGoals] = useState<Goal[]>([]);
	useEffect(() => {
		const storedGoals = storage.getString('goals');
		if (storedGoals) {
			setGoals(JSON.parse(storedGoals) as Goal[]);
		}
	}, []);
	const addGoal = () => {
		let name = '';
		let description = '';
		const storedState = storage.getString('goals.state');
		if (storedState) {
			({ name, description } = JSON.parse(storedState) as NameAndDescription);
		}
		if (name.trim()) {
			const lastId = goals.length > 0 ? goals[goals.length - 1].id : 0;
			const goal = {
				name,
				description,
				id: lastId + 1,
				tasks: [],
			};
			const updatedGoals = [...goals, goal];
			setGoals(updatedGoals);
			storage.set('goals', JSON.stringify(updatedGoals));
			clean();
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
			<SendButton handlePress={addGoal} />
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
