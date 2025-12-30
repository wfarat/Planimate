import { FirestoreSyncDoc } from '@/types/schemas/FirestoreSyncDoc';
import { updateLocalGoals } from '@/api/firebase/getData/updateLocalGoals';
import { updateLocalAgenda } from '@/api/firebase/getData/updateLocalAgenda';
import { updateLocalTasksSync } from '@/api/firebase/getData/updateLocalTasksSync';
import {MMKV} from "react-native-mmkv";

export const updateLocalData = async (
	syncDoc: FirestoreSyncDoc,
	userId: string,
    storage: MMKV
) => {
	if (syncDoc.goalsUpdated) {
		await updateLocalGoals(userId, storage);
	}
	if (syncDoc.agendaUpdated) {
		await updateLocalAgenda(userId, storage);
	}
	if (syncDoc.tasksUpdated) {
		await updateLocalTasksSync(syncDoc.tasksKeys, userId, storage);
	}
};
