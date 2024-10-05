import firestore from '@react-native-firebase/firestore';
import { Task } from '@/types/schemas';
import { storage } from '@/storage/storage';

export const syncTasks = async (tasksKeys: string[], userId: string) => {
	const batch = firestore().batch(); // Use batch writes for efficiency
	tasksKeys.forEach(key => {
		const data = storage.getString(key);
		if (data) {
			const tasks = JSON.parse(data) as Task[];
			const taskRef = firestore()
				.collection('users')
				.doc(userId)
				.collection('tasks')
				.doc(key);

			batch.set(taskRef, { tasks, lastUpdated: firestore.Timestamp.now() });
		}
	});

	await batch.commit();
};
