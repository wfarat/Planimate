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
			g.id === goalId
				? { ...g, name: newName, description: newDescription }
				: g,
		);
		updateGoals(updatedGoals);
	};
	const deleteGoal = () => {
		const updatedGoals = goals.filter(g => g.id !== goalId);
		updateGoals(updatedGoals);
	};
	const addGoal = (name: string, description: string, dueDate?: Date) => {
		const lastId = goals.length > 0 ? goals[goals.length - 1].id : 0;
		if (name) {
			const goal = {
				name,
				description,
				dueDate,
				id: lastId + 1,
			};
			const updatedGoals = [...goals, goal];
			updateGoals(updatedGoals);
			return updatedGoals;
		}
		return goals;
	};
	return { editGoal, getGoals, addGoal, deleteGoal };
};
