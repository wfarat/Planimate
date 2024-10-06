import { agendaRef } from '@/services/firebase/agenda/agendaRef';

export const getAgenda = async (userId: string) => {
	await agendaRef(userId).get();
};
