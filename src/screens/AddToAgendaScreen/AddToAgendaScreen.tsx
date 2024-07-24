import { RootScreenProps } from '@/types/navigation';
import { SafeScreen } from '@/components/template';
import { Button, Text, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { useAgendaItems } from '@/helpers/hooks/useAgendaItems';
import { AgendaItemType } from '@/types/schemas';

type AndroidMode = 'date' | 'time';

function AddToAgendaScreen({ route, navigation }: RootScreenProps<'AddToAgendaScreen'>) {
	const { task } = route.params;
	const { fonts } = useTheme();
	const { t } = useTranslation(['agenda']);
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState<AndroidMode>('date');
	const [show, setShow] = useState(false);
	const [ duration, setDuration ] = useState('1h');
  const { addAgendaItem } = useAgendaItems();
	const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
		if (selectedDate) {
			const currentDate = selectedDate;
			setShow(false);
			setDate(currentDate);
		}
	};

	const showMode = (currentMode: AndroidMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode('date');
	};

	const showTimepicker = () => {
		showMode('time');

	};
	const addToAgenda = () => {
		const title = date.toISOString().split('T')[0];
		const hour = date.getHours().toString();
		const newItem:AgendaItemType = {
			title,
			data: [{ hour, duration, title: task.name }],
		}
		addAgendaItem(newItem);
		navigation.goBack();
	}
	return (
	<SafeScreen>
		<Text style={[fonts.size_24, fonts.gray200]}>{t('agenda:add')}</Text>
		{task && <Text style={[fonts.size_24, fonts.gray200]}>{task.name}</Text>}
		<Button onPress={showDatepicker} title="Show date picker!" />
		<Button onPress={showTimepicker} title="Show time picker!" />
		<Text>selected: {date.toLocaleString()}</Text>
		{show && (
			<DateTimePicker
				testID="dateTimePicker"
				value={date}
				mode={mode}
				is24Hour={true}
				onChange={onChange}
			/>
		)}
		<TextInput value={duration} onChangeText={setDuration}/>
		<Button onPress={addToAgenda} title="Add to agenda" />
	</SafeScreen>
			);
}

export default AddToAgendaScreen;
