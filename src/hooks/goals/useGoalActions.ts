import { Goal } from '@/types/schemas';
import { storage } from '@/storage/storage';
import { useTaskActions } from '@/hooks/tasks/useTaskActions';

export const useGoalActions = (goalId?: number) => {
	const { cleanupTasks } = useTaskActions(goalId || 0);
	const updateGoals = (updatedGoals: Goal[]) => {
		storage.set('goals', JSON.stringify(updatedGoals));
		storage.set('goalsUpdated', true);
	};

	const getGoalsFromStorage = () => {
		const storedGoals = storage.getString('goals');
		if (storedGoals) {
			return JSON.parse(storedGoals) as Goal[];
		}
		return [];
	};
	const goals: Goal[] = getGoalsFromStorage();

	const getGoals = () => {
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
		storage.delete(`tasks_${goalId}_lastId`);
	};
	const createGoal = (name: string, description: string, dueDate?: Date) => {
		const lastId = storage.getNumber('goals_lastId') || 0;
		const goal = {
			name,
			description,
			dueDate,
			goalId: lastId + 1,
			updatedAt: new Date().toISOString(),
		};
		storage.set('goals_lastId', lastId + 1);
		return goal;
	};

	return {
		editGoal,
		getGoals,
		createGoal,
		deleteGoal,
		updateGoals,
	};
};
