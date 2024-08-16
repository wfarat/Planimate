import { RootScreenProps } from '@/types/navigation';
import { SafeScreen } from '@/components/template';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';
import { useState } from 'react';
import { useAgendaItems } from '@/helpers/hooks/useAgendaItems';
import { AgendaItemType } from '@/types/schemas';
import { useStorage } from '@/storage/StorageContext';
import { InputDate, InputTime } from '@/components/molecules';
import { GreenRoundedButton } from '@/components/atoms';

function AddToAgendaScreen({
	route,
	navigation,
}: RootScreenProps<'AddToAgendaScreen'>) {
	const { task } = route.params;
	const { components } = useTheme();
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
			<View style={components.mainContainer}>
				<Text style={components.header}>{t('agenda:newItem')}</Text>
				<InputDate date={date} setDate={setDate} message="agendaDate" />
				<InputTime time={date} setTime={setDate} message="time" />
				<InputTime setDuration={setDuration} message="duration" />
				<GreenRoundedButton handlePress={addToAgenda} text="addAgendaItem" />
			</View>
		</SafeScreen>
	);
}

export default AddToAgendaScreen;
