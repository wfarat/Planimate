import { getTasks } from '@/services/firebase/tasks/getTasks';
import { Task } from '@/types/schemas';
import { Timestamp } from '@react-native-firebase/firestore';
import {MMKV} from "react-native-mmkv";

type TasksData = {
	tasks: Task[];
	lastUpdated: Timestamp;
};

export const updateLocalTasksSync = async (
	tasksKeys: string[],
	userId: string,
    storage: MMKV
) => {
	await Promise.all(
		tasksKeys.map(async (key: string) => {
			const tasksData = await getTasks(userId, key);
			if (tasksData.exists()) {
				const tasksArray = (tasksData.data() as TasksData).tasks;
				const lastId =
					storage.getNumber(`tasks_${tasksArray[0].goalId}_lastId`) || 0;
				const newId = tasksArray.reduce((acc, currentValue) => {
					return Math.max(acc, currentValue.taskId);
				}, 0);
				if (newId > lastId)
					storage.set(`tasks_${tasksArray[0].goalId}_lastId`, newId);
				storage.set(key, JSON.stringify(tasksArray));
			}
		}),
	);
};
