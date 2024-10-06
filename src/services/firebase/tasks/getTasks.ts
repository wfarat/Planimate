import { tasksRef } from '@/services/firebase/tasks/tasksRef';

export const getTasks = async (userId: string, key: string) =>
	tasksRef(userId, key).get();
