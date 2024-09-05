import { ActivityIndicator, View } from 'react-native';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useEffect, useState } from 'react';
import { RootScreenProps } from '@/types/navigation';
import { InputDate } from '@/components/molecules';
import { useGoalActions } from '@/helpers/hooks/useGoalActions';
import { GreenRoundedButton, TextInputRounded } from '@/components/atoms';
import { saveGoal } from '@/controllers/goals';
import { Goal } from '@/types/schemas';
import { useStorage } from '@/storage/StorageContext';
import { useNetInfo } from '@react-native-community/netinfo';

function AddGoal({ navigation }: RootScreenProps<'AddGoal'>) {
	const { components } = useTheme();
	const storage = useStorage();
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const { createGoal, updateGoals, getGoals, addOfflineAction } =
		useGoalActions();
	const { isSuccess, isPending, data, mutate } = saveGoal();
	const [dueDate, setDueDate] = useState<Date>();
	const { isConnected } = useNetInfo();
	const token = storage.getString('token');
	const addGoal = (goal: Goal) => {
		const updatedGoals = [...getGoals(), goal];
		updateGoals(updatedGoals);
		navigation.goBack();
	};
	useEffect(() => {
		if (isSuccess) addGoal(data);
	}, [isSuccess]);
	const handleAddGoal = () => {
		const newGoal = createGoal(name, description, dueDate);
		if (token && isConnected) {
			mutate({ goal: newGoal, token });
		} else {
			addOfflineAction({ type: 'CREATE', goal: newGoal });
			addGoal(newGoal);
		}
	};
	return (
		<SafeScreen>
			<View style={components.mainContainer}>
				<TextInputRounded onChangeText={setName} value={name} text="title" />
				<TextInputRounded
					onChangeText={setDescription}
					value={description}
					multiline
					text="description"
				/>
				<InputDate date={dueDate} setDate={setDueDate} message="endDate" />
				{isPending ? (
					<ActivityIndicator />
				) : (
					<GreenRoundedButton handlePress={handleAddGoal} text="addGoal" />
				)}
			</View>
		</SafeScreen>
	);
}

export default AddGoal;
