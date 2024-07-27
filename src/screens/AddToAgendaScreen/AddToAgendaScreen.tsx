import { RootScreenProps } from '@/types/navigation';
import { SafeScreen } from '@/components/template';
import { Button, Text, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { useAgendaItems } from '@/helpers/hooks/useAgendaItems';
import { AgendaItemType } from '@/types/schemas';
import { useStorage } from '@/storage/StorageContext';

type AndroidMode = 'date' | 'time';

function AddToAgendaScreen({ route, navigation }: RootScreenProps<'AddToAgendaScreen'>) {
	const { task } = route.params;
	const { fonts, layout,gutters,colors } = useTheme();
	const { t } = useTranslation(['agenda']);
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState<AndroidMode>('date');
	const [show, setShow] = useState(false);
	const storage = useStorage();
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
		const storedId = storage.getNumber('agenda.id');
		const id = storedId? storedId : 0;
		const newItem:AgendaItemType = {
			title,
			data: [{ hour, duration, title: task.name, id: id+1, key: title }],
		}
		addAgendaItem(newItem);
		storage.set('agenda.id', id+1);
		navigation.goBack();
	}
	return (
	<SafeScreen>
		<View
			style={[
				layout.justifyCenter,
				layout.itemsCenter,
				gutters.marginTop_80,
			]}
		>
		<Text style={[fonts.size_24, fonts.gray200]}>{t('agenda:add')}</Text>
		{task && <Text style={[fonts.size_24, fonts.gray200]}>{task.name}</Text>}
		 <Button color={colors.gray200} onPress={showDatepicker} title={t('agenda:date')} />
		   <Button onPress={showTimepicker} title={t('agenda:time')} />
		<Text style={[fonts.size_16, fonts.gray200]}>{t('agenda:selected')} {date.toLocaleString()}</Text>
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
			<Button onPress={addToAgenda} title={t('agenda:add')} />
		</View>
	</SafeScreen>
			);
}

export default AddToAgendaScreen;
