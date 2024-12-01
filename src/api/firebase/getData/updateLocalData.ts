import { FirestoreSyncDoc } from '@/types/schemas/FirestoreSyncDoc';
import { updateLocalGoals } from '@/api/firebase/getData/updateLocalGoals';
import { updateLocalAgenda } from '@/api/firebase/getData/updateLocalAgenda';
import { updateLocalTasksSync } from '@/api/firebase/getData/updateLocalTasksSync';

export const updateLocalData = async (
	syncDoc: FirestoreSyncDoc,
	userId: string,
) => {
	if (syncDoc.goalsUpdated) {
		await updateLocalGoals(userId);
	}
	if (syncDoc.agendaUpdated) {
		await updateLocalAgenda(userId);
	}
	if (syncDoc.tasksUpdated) {
		await updateLocalTasksSync(syncDoc.tasksKeys, userId);
	}
};
