import { FirestoreSyncDoc } from '@/types/schemas/FirestoreSyncDoc';
import { getGoals } from '@/services/firebase/goals/getGoals';
import { storage } from '@/storage/storage';
import { getAgenda } from '@/services/firebase/agenda/getAgenda';
import { getTasks } from '@/services/firebase/tasks/getTasks';
import { Goal, Task, AgendaItemType } from '@/types/schemas';
import { Timestamp } from '@react-native-firebase/firestore';

type GoalsData = {
	goals: Goal[];
	lastUpdated: Timestamp;
};
type TasksData = {
	tasks: Task[];
	lastUpdated: Timestamp;
};
type AgendaData = {
	agenda: AgendaItemType[];
	lastUpdated: Timestamp;
};
export const updateLocalData = async (
	syncDoc: FirestoreSyncDoc,
	userId: string,
) => {
	if (syncDoc.goalsUpdated) {
		const goalData = await getGoals(userId);
		const goalArray = (goalData.data() as GoalsData).goals;
		const lastId = storage.getNumber('goals_lastId') || 0;
		const newId = goalArray.reduce((acc, currentValue) => {
			return Math.max(acc, currentValue.goalId);
		}, 0);
		if (newId > lastId) storage.set('goals_lastId', newId);
		storage.set('goals', JSON.stringify(goalArray));
	}
	if (syncDoc.agendaUpdated) {
		const agendaData = await getAgenda(userId);
		const lastId = storage.getNumber('agenda_id') || 0;
		const agendaItems = (agendaData.data() as AgendaData).agenda;
		const newId = agendaItems.reduce((acc, currentValue) => {
			return Math.max(
				acc,
				currentValue.data.reduce((a, c) => Math.max(a, c.id), 0),
			);
		}, 0);
		if (newId > lastId) storage.set('agenda_id', newId);
		storage.set('agenda', JSON.stringify(agendaItems));
	}
	if (syncDoc.tasksUpdated) {
		await Promise.all(
			syncDoc.tasksKeys.map(async (key: string) => {
				const tasksData = await getTasks(userId, key);
				if (tasksData.exists) {
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
	}
};
