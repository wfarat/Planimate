import { updateLocalGoals } from '@/api/firebase/getData/updateLocalGoals';
import { updateLocalAgenda } from '@/api/firebase/getData/updateLocalAgenda';
import { updateLocalTasksAll } from '@/api/firebase/getData/updateLocalTasksAll';
import { Timestamp } from '@react-native-firebase/firestore';
import {MMKV} from "react-native-mmkv";

export const getAllData = async (storage: MMKV) => {
	const userId = storage.getString('userId');
	if (userId) {
		try {
			await updateLocalGoals(userId, storage);
			await updateLocalAgenda(userId, storage);
			await updateLocalTasksAll(userId, storage);
			storage.set('lastLocalSync', JSON.stringify(Timestamp.now()));
		} catch (error) {
			console.error(error);
		}
	}
};
