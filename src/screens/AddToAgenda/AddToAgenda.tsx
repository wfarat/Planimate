import { RootScreenProps } from '@/types/navigation';
import { SafeScreen } from '@/components/template';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';
import { useState } from 'react';
import { useAgendaItems } from '@/hooks/agenda/useAgendaItems';
import { InputDate, InputTime } from '@/components/molecules';
import { GreenRoundedButton } from '@/components/atoms';
import { AgendaItemType } from '@/types/schemas';

function AddToAgenda({ route, navigation }: RootScreenProps<'AddToAgenda'>) {
	const { task } = route.params;
	const { components } = useTheme();

	const { t } = useTranslation(['agenda']);
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState<Date>();
	const [duration, setDuration] = useState(0);
	const { createAgendaItem, addSingleAgendaItem } = useAgendaItems();
	const addToAgenda = (agendaItem: AgendaItemType) => {
		addSingleAgendaItem(agendaItem);
		navigation.goBack();
	};
	const handleAddToAgenda = () => {
		const agendaItem = createAgendaItem(date, task, duration, time);
		addToAgenda(agendaItem);
	};
	return (
		<SafeScreen>
			<View style={components.mainContainer}>
				<Text style={components.header}>{t('agenda:newItem')}</Text>
				<InputDate date={date} setDate={setDate} message="agendaDate" />
				<InputTime time={date} setTime={setTime} message="time" />
				<InputTime setDuration={setDuration} message="duration" />
				<GreenRoundedButton
					handlePress={handleAddToAgenda}
					text="addAgendaItem"
				/>
			</View>
		</SafeScreen>
	);
}

export default AddToAgenda;
