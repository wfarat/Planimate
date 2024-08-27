import { Goal } from '@/types/schemas';
import { useStorage } from '@/storage/StorageContext';

export const useGoalActions = (goalId?: number) => {
	const storage = useStorage();
	const updateGoals = (updatedGoals: Goal[]) => {
		storage.set('goals', JSON.stringify(updatedGoals));
	};
	const getGoals = () => {
		const storedGoals = storage.getString('goals');
		if (storedGoals) {
			return JSON.parse(storedGoals) as Goal[];
		}
		return [];
	};
	const goals: Goal[] = getGoals();
	const editGoal = (newName: string, newDescription: string) => {
		const updatedGoals = goals.map(g =>
			g.goalId === goalId
				? { ...g, name: newName, description: newDescription }
				: g,
		);
		updateGoals(updatedGoals);
	};
	const deleteGoal = () => {
		const updatedGoals = goals.filter(g => g.goalId !== goalId);
		updateGoals(updatedGoals);
	};
	const createGoal = (name: string, description: string, dueDate?: Date) => {
		const lastId = storage.getNumber('goals.lastId') || 0;
		const goal = {
			name,
			description,
			dueDate,
			goalId: lastId + 1,
		};
		storage.set('goals.lastId', lastId + 1);
		return goal;
	};
	return { editGoal, getGoals, createGoal, deleteGoal, updateGoals };
};
