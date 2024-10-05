import { storage } from '@/storage/storage';
import { syncTasks, syncGoals, syncAgenda } from '@/services/firebase';
import { AgendaItemType, Goal } from '@/types/schemas';

export const syncData = async () => {
	const userId = storage.getString('userId');
	try {
		if (userId) {
			const goalsUpdated = storage.getBoolean('goalsUpdated');
			const tasksUpdated = storage.getBoolean('tasksUpdated');
			const agendaUpdated = storage.getBoolean('agendaUpdated');
			if (tasksUpdated) {
				const tasksKeys = JSON.parse(
					storage.getString('tasksKeys') || '[]',
				) as string[];
				await syncTasks(tasksKeys, userId);
				storage.set('tasksUpdated', false);
			}
			if (goalsUpdated) {
				const goals = JSON.parse(storage.getString('goals') || '[]') as Goal[]; // Get data from MMKV
				await syncGoals(goals, userId);
				storage.set('goalsUpdated', false);
			}
			if (agendaUpdated) {
				const agendaItems = JSON.parse(
					storage.getString('agenda') || '[]',
				) as AgendaItemType[]; // Get data from MMKV
				await syncAgenda(agendaItems, userId);
				storage.set('agendaUpdated', false);
			}
		}
	} catch (error) {
		console.error('Error syncing data:', error);
	}
};
