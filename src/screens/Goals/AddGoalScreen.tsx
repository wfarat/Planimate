import { View, TextInput, Text, TouchableOpacity } from 'react-native';

import { useTranslation } from 'react-i18next';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useState } from 'react';
import { RootScreenProps } from '@/types/navigation';
import DateTimePicker, {
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { SendButton } from '@/components/molecules';
import { useGoalActions } from '@/helpers/hooks/useGoalActions';

function AddGoalScreen({ navigation }: RootScreenProps<'Goals'>) {
	const { t } = useTranslation(['goals']);
	const { layout, gutters, components } = useTheme();
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const { addGoal } = useGoalActions();
	const [dueDate, setDueDate] = useState(new Date());
	const [show, setShow] = useState(false);

	const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
		if (selectedDate) {
			const currentDate = selectedDate;
			setShow(false);
			setDueDate(currentDate);
		}
	};
	const handleAddGoal = () => {
		if (dueDate) {
			addGoal(dueDate);
			navigation.goBack();
		} else {
			addGoal();
			navigation.goBack();
		}
	};
	return (
		<SafeScreen>
			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={dueDate}
					mode="date"
					is24Hour
					onChange={onChange}
				/>
			)}
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
						<TouchableOpacity onPress={() => setShow(true)}>
							<Text style={[components.textInputRounded, gutters.padding_12]}>
								{t('goals:endDate')} {dueDate.toLocaleDateString()}
							</Text>
						</TouchableOpacity>
					</View>
					<SendButton handlePress={handleAddGoal} />
				</View>
			</View>
		</SafeScreen>
	);
}

export default AddGoalScreen;
