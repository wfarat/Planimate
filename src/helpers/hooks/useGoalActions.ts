import { Goal } from '@/types/schemas';
import { useStorage } from '@/storage/StorageContext';
import { useTaskActions } from '@/helpers/hooks/tasks/useTaskActions';
import { fetchGoals } from '@/controllers/goals';
import { getLastUpdate } from '@/helpers/utils/getLastUpdate';
import { GoalAction } from '@/types/offlineActions/goalAction';
import { useOfflineActions } from '@/helpers/hooks/offline/useOfflineActions';

export const useGoalActions = (id?: string, goalId?: number) => {
	const storage = useStorage();
	const { addAction } = useOfflineActions();
	const { cleanupTasks } = useTaskActions(goalId || 0);
	const updateGoals = (updatedGoals: Goal[]) => {
		storage.set('goals', JSON.stringify(updatedGoals));
	};
	const getGoalsFromStorage = () => {
		const storedGoals = storage.getString('goals');
		if (storedGoals) {
			return JSON.parse(storedGoals) as Goal[];
		}
		return [];
	};
	const goals: Goal[] = getGoalsFromStorage();
	const lastUpdate = getLastUpdate(goals);
	const token = storage.getString('token');
	const { data } = fetchGoals(token, lastUpdate);
	const replaceGoal = (goal: Goal): Goal[] => {
		const oldGoals = getGoalsFromStorage();
		return oldGoals.map(item => (item.id === goal.id ? goal : item));
	};
	const updateGoal = (goal: Goal) => {
		const newGoals = replaceGoal(goal);
		// If no matching item was found, append the new item
		if (!newGoals.some(item => item.id === goal.id)) {
			newGoals.push(goal);
		}
		updateGoals(newGoals);
	};
	const getGoals = () => {
		if (data) {
			data.forEach(goal => updateGoal(goal));
		}
		return getGoalsFromStorage();
	};
	const editGoal = (newName: string, newDescription: string) => {
		const updatedGoals = goals.map(g =>
			g.goalId === goalId
				? {
						...g,
						name: newName,
						description: newDescription,
						updatedAt: new Date().toISOString(),
				  }
				: g,
		);
		updateGoals(updatedGoals);
	};
	const deleteGoal = () => {
		const updatedGoals = goals.filter(g => g.goalId !== goalId);
		updateGoals(updatedGoals);
		cleanupTasks();
		storage.delete(`goals.${goalId}.lastId`);
	};
	const createGoal = (name: string, description: string, dueDate?: Date) => {
		const lastId = storage.getNumber('goals.lastId') || 0;
		const goal = {
			name,
			description,
			dueDate,
			goalId: lastId + 1,
			updatedAt: new Date().toISOString(),
		};
		storage.set('goals.lastId', lastId + 1);
		return goal;
	};
	const addOfflineAction = (action: GoalAction) => {
		addAction('goal', action);
	};
	const handleOfflineDeleteGoal = () => {
		addOfflineAction({ type: 'delete', id, goalId });
	};
	return {
		editGoal,
		getGoals,
		createGoal,
		deleteGoal,
		updateGoals,
		data,
		addOfflineAction,
		handleOfflineDeleteGoal,
	};
};
