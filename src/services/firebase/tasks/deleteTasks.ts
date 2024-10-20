import firestore from '@react-native-firebase/firestore';
import { tasksRef } from '@/services/firebase/tasks/tasksRef';

export const deleteTasks = async (keysToDelete: string[], userId: string) => {
	const batch = firestore().batch(); // Use batch writes for efficiency
	keysToDelete.forEach(key => {
		const ref = tasksRef(userId, key);
		batch.delete(ref);
	});

	await batch.commit();
};
