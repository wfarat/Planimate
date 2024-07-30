import { Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker, {
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { useTheme } from '@/theme';
import { useTranslation } from 'react-i18next';

type InputDateProps = {
	dueDate: Date | undefined;
	setDueDate: (date: Date) => void;
};
function InputDate({ dueDate, setDueDate }: InputDateProps) {
	const { t } = useTranslation(['goals']);
	const [show, setShow] = useState(false);
	const { gutters, components } = useTheme();
	const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
		if (selectedDate) {
			const currentDate = selectedDate;
			setShow(false);
			setDueDate(currentDate);
		}
	};

	return (
		<View>
			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={dueDate || new Date()}
					mode="date"
					is24Hour
					onChange={onChange}
				/>
			)}
			<TouchableOpacity onPress={() => setShow(true)}>
				<Text style={[components.textInputRounded, gutters.padding_12]}>
					{t('goals:endDate')}{' '}
					{dueDate ? dueDate.toLocaleDateString() : t('goals:enterDate')}
				</Text>
			</TouchableOpacity>
		</View>
	);
}

export default InputDate;
