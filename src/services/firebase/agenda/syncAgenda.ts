import { AgendaItemType } from '@/types/schemas';
import firestore from '@react-native-firebase/firestore';
import { agendaRef } from '@/services/firebase/agenda/agendaRef';

export const syncAgenda = async (agenda: AgendaItemType[], userId: string) => {
	const ref = agendaRef(userId);
	await ref.set({ agenda, lastUpdated: firestore.Timestamp.now() });
};
