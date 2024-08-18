import { View } from 'react-native';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useState } from 'react';
import { RootScreenProps } from '@/types/navigation';
import { InputDate } from '@/components/molecules';
import { useGoalActions } from '@/helpers/hooks/useGoalActions';
import { GreenRoundedButton, TextInputRounded } from '@/components/atoms';

function AddGoal({ navigation }: RootScreenProps<'AddGoal'>) {
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
