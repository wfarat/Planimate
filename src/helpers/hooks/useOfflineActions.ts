import { ActionsPayload } from '@/types/offlineActions/actionPayload';
import { GoalAction } from '@/types/offlineActions/goalAction';
import { TaskAction } from '@/types/offlineActions/taskAction';
import { AgendaAction } from '@/types/offlineActions/agendaAction';
import { useStorage } from '@/storage/StorageContext';

export const useOfflineActions = () => {
	const storage = useStorage();

	const getActions = (): ActionsPayload => {
		const storedActions = storage.getString('actions');
		if (storedActions) {
			return JSON.parse(storedActions) as ActionsPayload;
		}
		return {
			goal: [],
			task: [],
			agenda: [],
		};
	};
	const updateActions = (actions: ActionsPayload) => {
		storage.set('actions', JSON.stringify(actions));
	};
	// Generic function to add actions to the correct array
	function addAction<T extends keyof ActionsPayload>(
		actionType: T, // The type of action (goal, task, agenda)
		action: ActionsPayload[T][number], // The action to add
	): void {
		const actionsPayload = getActions();
		if (actionType === 'goal') actionsPayload.goal.push(action as GoalAction);
		else if (actionType === 'task')
			actionsPayload.task.push(action as TaskAction);
		else actionsPayload.agenda.push(action as AgendaAction);
		updateActions(actionsPayload);
	}

	return { addAction };
};
