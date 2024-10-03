import { Goal } from '@/types/schemas';
import { useStorage } from '@/storage/StorageContext';
import { useTaskActions } from '@/hooks/tasks/useTaskActions';
import { fetchGoals } from '@/api';
import { getLastUpdate } from '@/utils/getLastUpdate';
import { GoalAction } from '@/types/offlineActions/goalAction';
import { useOfflineActions } from '@/hooks/useOfflineActions';

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
	const { data, dataUpdatedAt } = fetchGoals(token, lastUpdate);
	const replaceGoal = (goal: Goal): Goal[] => {
		const oldGoals = getGoalsFromStorage();
		return oldGoals.map(item => (item.goalId === goal.goalId ? goal : item));
	};
	const updateGoal = (goal: Goal) => {
		const newGoals = replaceGoal(goal);
		// If no matching item was found, append the new item
		if (!newGoals.some(item => item.goalId === goal.goalId)) {
			newGoals.push(goal);
			const lastId = storage.getNumber('goals.lastId') || 0;
			if (lastId < goal.goalId) {
				storage.set('goals.lastId', goal.goalId);
			}
		}
		updateGoals(newGoals);
	};
	const getGoals = () => {
		const storageUpdatedAt = storage.getNumber('goals.updatedAt');
		if (data && dataUpdatedAt !== storageUpdatedAt) {
			data.forEach(goal => updateGoal(goal));
			storage.set('goals.updatedAt', dataUpdatedAt);
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
