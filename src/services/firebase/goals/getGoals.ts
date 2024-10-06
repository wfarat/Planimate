import { goalsRef } from '@/services/firebase/goals/goalsRef';

export const getGoals = async (userId: string) => {
	return goalsRef(userId).get();
};
