import { View } from 'react-native';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useState } from 'react';
import { RootScreenProps } from '@/types/navigation';
import { InputDate } from '@/components/molecules';
import { useGoalActions } from '@/helpers/hooks/useGoalActions';
import { GreenRoundedButton, TextInputRounded } from '@/components/atoms';

function AddGoalScreen({ navigation }: RootScreenProps<'AddGoalScreen'>) {
	const { components } = useTheme();
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const { addGoal } = useGoalActions();
	const [dueDate, setDueDate] = useState<Date>();
	const handleAddGoal = () => {
		addGoal(name, description, dueDate);
		navigation.goBack();
	};
	return (
		<SafeScreen>
			<View style={components.mainContainer}>
				<View style={components.inputContainer}>
					<TextInputRounded onChangeText={setName} value={name} text="title" />
					<TextInputRounded
						onChangeText={setDescription}
						value={description}
						text="description"
					/>
					<InputDate date={dueDate} setDate={setDueDate} message="endDate" />
					<GreenRoundedButton handlePress={handleAddGoal} text="addGoal" />
				</View>
			</View>
		</SafeScreen>
	);
}

export default AddGoalScreen;
