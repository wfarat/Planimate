import { Updatable } from '@/types/schemas/updatable';

export const getLastUpdate = (items: Updatable[]) =>
	items
		.reduce(
			(acc, currentItem) => {
				if (currentItem.updatedAt) {
					const currentGoalDate = new Date(currentItem.updatedAt);
					return currentGoalDate > acc ? currentGoalDate : acc;
				}
				return acc;
			},
			new Date('1970-01-01T00:00:00.000Z'), // Initialize with the earliest possible UTC date
		)
		.toISOString(); // Convert the final date back to an ISO string
