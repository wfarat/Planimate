import { storage } from '@/storage/storage';
import { Task } from '@/types/schemas';
import firestore, { Timestamp } from '@react-native-firebase/firestore';

type TasksData = {
	tasks: Task[];
	lastUpdated: Timestamp;
};

export const updateLocalTasksAll = async (userId: string) => {
	const userTasksCollection = firestore()
		.collection('users')
		.doc(userId)
		.collection('tasks');

	// Get all documents in the user's tasks collection
	const snapshot = await userTasksCollection.get();

	if (snapshot.empty) {
		console.log('No tasks found for the user.');
		return;
	}

	await Promise.all(
		snapshot.docs.map(async doc => {
			const tasksData = doc.data() as TasksData;
			const tasksArray = tasksData.tasks;

			// Get the last stored ID for the goal
			const lastId =
				storage.getNumber(`tasks_${tasksArray[0]?.goalId}_lastId`) || 0;

			// Find the highest task ID
			const newId = tasksArray.reduce((acc, currentValue) => {
				return Math.max(acc, currentValue.taskId);
			}, 0);

			// Update the storage if there is a new higher ID
			if (newId > lastId) {
				storage.set(`tasks_${tasksArray[0]?.goalId}_lastId`, newId);
			}

			// Store tasks in local storage
			storage.set(doc.id, JSON.stringify(tasksArray));
		}),
	);
};
