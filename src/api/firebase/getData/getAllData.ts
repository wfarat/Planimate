import { storage } from '@/storage/storage';
import { updateLocalGoals } from '@/api/firebase/getData/updateLocalGoals';
import { updateLocalAgenda } from '@/api/firebase/getData/updateLocalAgenda';
import { updateLocalTasksAll } from '@/api/firebase/getData/updateLocalTasksAll';
import { Timestamp } from '@react-native-firebase/firestore';

export const getAllData = async () => {
	const userId = storage.getString('userId');
	if (userId) {
		try {
			await updateLocalGoals(userId);
			await updateLocalAgenda(userId);
			await updateLocalTasksAll(userId);
			storage.set('lastLocalSync', JSON.stringify(Timestamp.now()));
		} catch (error) {
			console.error(error);
		}
	}
};
