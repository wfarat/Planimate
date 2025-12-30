import firestore from '@react-native-firebase/firestore';
import { Task } from '@/types/schemas';
import { useStorage } from '@/storage/useStorage';
import { tasksRef } from '@/services/firebase/tasks/tasksRef';

export const syncTasks = async (tasksKeys: string[], userId: string) => {
	const batch = firestore().batch(); // Use batch writes for efficiency
    const storage = useStorage();
	tasksKeys.forEach(key => {
		const data = storage.getString(key);
		if (data) {
			const tasks = JSON.parse(data) as Task[];
			const ref = tasksRef(userId, key);
			batch.set(ref, { tasks, lastUpdated: firestore.Timestamp.now() });
		}
	});

	await batch.commit();
};
