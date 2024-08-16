import { Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker, {
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { useTheme } from '@/theme';
import { useTranslation } from 'react-i18next';

type InputDateProps = {
	date: Date | undefined;
	setDate: (date: Date) => void;
	message: DatePickerMessages;
};
type DatePickerMessages = 'endDate' | 'agendaDate';

function InputDate({ date, setDate, message }: InputDateProps) {
	const { t } = useTranslation(['common']);
	const [show, setShow] = useState(false);
	const { components, layout } = useTheme();
	const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
		if (selectedDate) {
			if (date) {
				const updatedDate = new Date(
					selectedDate.getFullYear(),
					selectedDate.getMonth(),
					selectedDate.getDate(),
					date.getHours(),
					date.getMinutes(),
				);
				setDate(updatedDate);
			} else {
				setDate(selectedDate);
			}
			setShow(false);
		}
	};

	return (
		<View style={layout.fullWidth}>
			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={date || new Date()}
					mode="date"
					is24Hour
					onChange={onChange}
				/>
			)}
			<TouchableOpacity onPress={() => setShow(true)}>
				<Text style={components.textInputRounded}>
					{t(`common:picker.${message}`)}{' '}
					{date ? date.toLocaleDateString() : t('common:picker.enterDate')}
				</Text>
			</TouchableOpacity>
		</View>
	);
}

export default InputDate;
