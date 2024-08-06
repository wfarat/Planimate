import { View, TextInput } from 'react-native';

import { useTranslation } from 'react-i18next';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useState } from 'react';
import { RootScreenProps } from '@/types/navigation';
import { InputDate, SendButton } from '@/components/molecules';
import { useGoalActions } from '@/helpers/hooks/useGoalActions';

function AddGoalScreen({ navigation }: RootScreenProps<'AddGoalScreen'>) {
	const { t } = useTranslation(['goals']);
	const { layout, gutters, components } = useTheme();
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
			<View
				style={[
					layout.justifyCenter,
					layout.itemsCenter,
					gutters.marginTop_120,
				]}
			>
				<View style={[gutters.paddingHorizontal_32]}>
					<View>
						<TextInput
							style={components.textInputRounded}
							value={name}
							onChangeText={setName}
							placeholder={t('goals:title')}
						/>

						<TextInput
							style={components.textInputRounded}
							multiline
							value={description}
							onChangeText={setDescription}
							placeholder={t('goals:description')}
						/>
						<InputDate date={dueDate} setDate={setDueDate} message="endDate" />
					</View>
					<SendButton handlePress={handleAddGoal} />
				</View>
			</View>
		</SafeScreen>
	);
}

export default AddGoalScreen;
