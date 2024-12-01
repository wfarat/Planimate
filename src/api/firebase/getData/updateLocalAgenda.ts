import { getAgenda } from '@/services/firebase/agenda/getAgenda';
import { storage } from '@/storage/storage';
import { AgendaItemType } from '@/types/schemas';
import { Timestamp } from '@react-native-firebase/firestore';

type AgendaData = {
	agenda: AgendaItemType[];
	lastUpdated: Timestamp;
};

export const updateLocalAgenda = async (userId: string) => {
	const agendaData = await getAgenda(userId);
	const lastId = storage.getNumber('agenda_id') || 0;
	const agendaItems = (agendaData.data() as AgendaData).agenda;
	const newId = agendaItems.reduce((acc, currentValue) => {
		return Math.max(
			acc,
			currentValue.data.reduce((a, c) => Math.max(a, c.id), 0),
		);
	}, 0);
	if (newId > lastId) storage.set('agenda_id', newId);
	storage.set('agenda', JSON.stringify(agendaItems));
};
