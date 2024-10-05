import { AgendaItemType } from '@/types/schemas';
import firestore from '@react-native-firebase/firestore';

export const syncAgenda = async (agenda: AgendaItemType[], userId: string) => {
	const agendaRef = firestore()
		.collection('users')
		.doc(userId)
		.collection('agenda')
		.doc('agendaDoc'); // Single document for the agenda

	await agendaRef.set({ agenda, lastUpdated: firestore.Timestamp.now() });
};
