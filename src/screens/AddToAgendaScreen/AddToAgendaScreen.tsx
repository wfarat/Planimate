import { RootScreenProps } from '@/types/navigation';
import { SafeScreen } from '@/components/template';
import { Button, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';
import { useState } from 'react';
import { useAgendaItems } from '@/helpers/hooks/useAgendaItems';
import { AgendaItemType } from '@/types/schemas';
import { useStorage } from '@/storage/StorageContext';
import { InputDate, InputTime } from '@/components/molecules';

function AddToAgendaScreen({
	route,
	navigation,
}: RootScreenProps<'AddToAgendaScreen'>) {
	const { task } = route.params;
	const { fonts, layout, gutters } = useTheme();
	const { t } = useTranslation(['agenda']);
	const [date, setDate] = useState(new Date());
	const storage = useStorage();
	const [duration, setDuration] = useState(0);
	const { addAgendaItem } = useAgendaItems();

	const addToAgenda = () => {
		const title = date.toISOString().split('T')[0];
		const storedId = storage.getNumber('agenda.id');
		const id = storedId || 0;
		const newItem: AgendaItemType = {
			title,
			data: [
				{
					date,
					duration,
					title: task.name,
					id: id + 1,
					key: title,
					taskStorageKey: task.taskId
						? `goals.${task.goalId}.${task.taskId}`
						: `goals.${task.goalId}`,
					taskId: task.id,
					completed: false,
				},
			],
		};
		addAgendaItem(newItem);
		storage.set('agenda.id', id + 1);
		navigation.goBack();
	};
	return (
		<SafeScreen>
			<View
				style={[layout.justifyCenter, layout.itemsCenter, gutters.marginTop_80]}
			>
				<Text style={[fonts.size_24, fonts.gray200]}>{t('agenda:add')}</Text>
				<InputDate date={date} setDate={setDate} message="agendaDate" />
				<InputTime time={date} setTime={setDate} message="time" />
				<InputTime setDuration={setDuration} message="duration" />
				<Button onPress={addToAgenda} title={t('agenda:add')} />
			</View>
		</SafeScreen>
	);
}

export default AddToAgendaScreen;
