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
		storage.set('goals', JSON.stringify((goalData.data() as GoalsData).goals));
	}
	if (syncDoc.agendaUpdated) {
		const agendaData = await getAgenda(userId);
		storage.set(
			'agenda',
			JSON.stringify((agendaData.data() as AgendaData).agenda),
		);
	}
	if (syncDoc.tasksUpdated) {
		await Promise.all(
			syncDoc.tasksKeys.map(async (key: string) => {
				const tasksData = await getTasks(userId, key);
				storage.set(key, JSON.stringify((tasksData.data() as TasksData).tasks));
			}),
		);
	}
};
