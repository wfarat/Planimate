import { View } from 'react-native';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useState } from 'react';
import { RootScreenProps } from '@/types/navigation';
import { InputDate } from '@/components/molecules';
import { useGoalActions } from '@/hooks/goals/useGoalActions';
import { GreenRoundedButton, TextInputRounded } from '@/components/atoms';
import { Goal } from '@/types/schemas';

function AddGoal({ navigation }: RootScreenProps<'AddGoal'>) {
	const { components } = useTheme();
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const { createGoal, updateGoals, getGoals } = useGoalActions();
	const [dueDate, setDueDate] = useState<Date>();
	const addGoal = (goal: Goal) => {
		const updatedGoals = [...getGoals(), goal];
		updateGoals(updatedGoals);
		navigation.goBack();
	};

	const handleAddGoal = () => {
		const newGoal = createGoal(name, description, dueDate);
		addGoal(newGoal);
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
				<GreenRoundedButton handlePress={handleAddGoal} text="addGoal" />
			</View>
		</SafeScreen>
	);
}

export default AddGoal;
