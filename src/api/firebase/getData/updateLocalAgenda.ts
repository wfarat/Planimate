import { getAgenda } from '@/services/firebase/agenda/getAgenda';
import { AgendaItemType } from '@/types/schemas';
import { Timestamp } from '@react-native-firebase/firestore';
import {MMKV} from "react-native-mmkv";

type AgendaData = {
	agenda: AgendaItemType[];
	lastUpdated: Timestamp;
};

export const updateLocalAgenda = async (userId: string,     storage: MMKV
) => {
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
