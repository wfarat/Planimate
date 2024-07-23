import { Goal, NameAndDescription } from '@/types/schemas';
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
	const addGoal = () => {
		let name = '';
		let description = '';
		const storedState = storage.getString('goals.state');
		if (storedState) {
			({ name, description } = JSON.parse(storedState) as NameAndDescription);
		}
		const lastId = goals.length > 0 ? goals[goals.length - 1].id : 0;
		const goal = {
			name,
			description,
			id: lastId + 1,
		};
		const updatedGoals = [...goals, goal];
		updateGoals(updatedGoals);
		return updatedGoals;
	};
	return { editGoal, addGoal, deleteGoal };
};
