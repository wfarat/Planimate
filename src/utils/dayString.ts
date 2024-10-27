const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

export const dayString = (index: number): (typeof days)[number] | undefined => {
	return index >= 0 && index < days.length ? days[index] : undefined;
};
