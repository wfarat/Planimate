import { storage } from '@/storage/storage';
import { syncTasks, syncGoals, syncAgenda } from '@/services/firebase';
import { AgendaItemType, Goal } from '@/types/schemas';
import firestore from '@react-native-firebase/firestore';
import { updateSyncDoc } from '@/api/firebase/syncData/updateSyncDoc';
import { FirestoreSyncDoc } from '@/types/schemas/FirestoreSyncDoc';
import isEmpty from 'lodash/isEmpty';
import { deleteTasks } from '@/services/firebase/tasks/deleteTasks';

export const syncData = async () => {
	const userId = storage.getString('userId');

	try {
		if (userId) {
			const goalsUpdated = storage.getBoolean('goalsUpdated') || false;
			const tasksUpdated = storage.getBoolean('tasksUpdated') || false;
			const agendaUpdated = storage.getBoolean('agendaUpdated') || false;
			const tasksKeys = JSON.parse(
				storage.getString('tasksKeys') || '[]',
			) as string[];
			const keysToDelete = JSON.parse(
				storage.getString('keysToDelete') || '[]',
			) as string[];
			if (tasksUpdated) {
				await syncTasks(tasksKeys, userId);
				storage.set('tasksUpdated', false);
				storage.delete('tasksKeys');
				if (!isEmpty(keysToDelete)) {
					await deleteTasks(keysToDelete, userId);
					storage.delete('keysToDelete');
				}
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
			if (agendaUpdated || goalsUpdated || tasksUpdated) {
				const lastSyncTime = firestore.Timestamp.now();
				const fireBaseSyncDoc: FirestoreSyncDoc = {
					goalsUpdated,
					tasksUpdated,
					agendaUpdated,
					timestamp: lastSyncTime,
					tasksKeys,
				};
				await updateSyncDoc(userId, fireBaseSyncDoc, keysToDelete);
				storage.set('lastLocalSync', JSON.stringify(lastSyncTime));
			}
		}
	} catch (error) {
		console.error('Error syncing data:', error);
	}
};
