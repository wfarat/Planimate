import { Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker, {
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { useTheme } from '@/theme';
import { useTranslation } from 'react-i18next';
import { hoursAndMinutes, getStartOfDay } from '@/utils/formatTime';
import { InputTimeProps } from '@/types/props/inputTimeProps';

function InputTime({ message, setTime, setDuration, time }: InputTimeProps) {
	const { t } = useTranslation(['common']);
	const [show, setShow] = useState(false);
	const [date, setDate] = useState<Date>();
	const { layout, components } = useTheme();
	const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
		if (selectedDate) {
			setShow(false);
			setDate(selectedDate);
			if (setDuration) {
				const minutes =
					selectedDate.getMinutes() + selectedDate.getHours() * 60;
				setDuration(minutes);
			} else if (setTime && time) {
				const updatedDate = new Date(
					time.getFullYear(),
					time.getMonth(),
					time.getDate(),
					selectedDate.getHours(),
					selectedDate.getMinutes(),
				);
				setTime(updatedDate);
			}
		}
	};

	return (
		<View style={layout.fullWidth}>
			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={date || getStartOfDay(new Date())}
					mode="time"
					is24Hour
					onChange={onChange}
				/>
			)}
			<TouchableOpacity onPress={() => setShow(true)}>
				<Text style={components.textInputRounded}>
					{t(`common:picker.${message}`)}{' '}
					{date ? hoursAndMinutes(date) : t('common:picker.enterTime')}
				</Text>
			</TouchableOpacity>
		</View>
	);
}

export default InputTime;
