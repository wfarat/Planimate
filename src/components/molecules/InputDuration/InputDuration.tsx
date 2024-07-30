import { Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker, {
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { useTheme } from '@/theme';
import { useTranslation } from 'react-i18next';

function getStartOfDay(date: Date): Date {
	const newDate = new Date(date);
	newDate.setHours(0, 0, 0, 0);
	return newDate;
}
type InputDateProps = {
	duration: number | undefined;
	setDuration: (number: number) => void;
};
function InputDuration({ duration, setDuration }: InputDateProps) {
	const { t } = useTranslation(['goals']);
	const [show, setShow] = useState(false);
	const [date, setDate] = useState(getStartOfDay(new Date()));
	const { gutters, components } = useTheme();

	const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
		if (selectedDate) {
			const minutes = selectedDate.getMinutes() + selectedDate.getHours() * 60;
			setShow(false);
			setDate(selectedDate);
			setDuration(minutes);
		}
	};

	return (
		<View>
			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={date}
					mode="time"
					is24Hour
					onChange={onChange}
				/>
			)}
			<TouchableOpacity onPress={() => setShow(true)}>
				<Text style={[components.textInputRounded, gutters.padding_12]}>
					{t('goals:duration')}
					{duration
						? `${date.getHours()}:${date.getMinutes()}`
						: t('goals:enterDuration')}
				</Text>
			</TouchableOpacity>
		</View>
	);
}

export default InputDuration;
