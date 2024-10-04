import { ActionsPayload } from '@/types/offlineActions/actionPayload';
import { GoalAction } from '@/types/offlineActions/goalAction';
import { TaskAction } from '@/types/offlineActions/taskAction';
import { AgendaAction } from '@/types/offlineActions/agendaAction';
import { storage } from '@/storage/storage';
import isEmpty from 'lodash/isEmpty';

export const useOfflineActions = () => {
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
	const clearActions = (): void => {
		storage.delete('actions');
	};

	const getLocalActions = () => {
		const actions = getActions();
		if (isEmpty(actions)) return undefined;
		return actions;
	};
	return { addAction, clearActions, getLocalActions };
};
