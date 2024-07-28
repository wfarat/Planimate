import { View, TextInput, Text, TouchableOpacity } from 'react-native';

import { useTranslation } from 'react-i18next';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useState } from 'react';
import GoalsList from '@/screens/Goals/GoalsList';
import { RootScreenProps } from '@/types/navigation';
import { useStateWithStorage } from '@/helpers/hooks/useStateWithStorage';
import DateTimePicker, {
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

function Goals({ navigation, route }: RootScreenProps<'Goals'>) {
	const { t } = useTranslation(['goals']);
	const { layout, gutters, components } = useTheme();
	const name = useStateWithStorage('goals.state.name', '');
	const description = useStateWithStorage('goals.state.description', '');
	const [endDate, setEndDate] = useState(new Date());
	const [show, setShow] = useState(false);
	const clean = () => {
		name.setState('');
		description.setState('');
	};
	const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
		if (selectedDate) {
			const currentDate = selectedDate;
			setShow(false);
			setEndDate(currentDate);
		}
	};
	return (
		<SafeScreen>
			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={endDate}
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
							value={name.state}
							onChangeText={name.setState}
							placeholder={t('goals:title')}
						/>

						<TextInput
							style={components.textInputRounded}
							multiline
							value={description.state}
							onChangeText={description.setState}
							placeholder={t('goals:description')}
						/>
						<TouchableOpacity onPress={() => setShow(true)}>
							<Text style={[components.textInputRounded, gutters.padding_12]}>
								{t('goals:endDate')} {endDate.toLocaleDateString()}
							</Text>
						</TouchableOpacity>
					</View>
					<GoalsList
						navigation={navigation}
						route={route}
						clean={clean}
						endDate={endDate}
					/>
				</View>
			</View>
		</SafeScreen>
	);
}

export default Goals;
