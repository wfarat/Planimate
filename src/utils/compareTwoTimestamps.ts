import { Timestamp } from '@react-native-firebase/firestore';

export const compareTwoTimestamps = (
	timestamp1: Timestamp,
	timestamp2: Timestamp,
	timeInMinutes: number,
): boolean => {
	const time1 = timestamp1.toMillis();
	const time2 = timestamp2.toMillis();
	const timeInMilliseconds = timeInMinutes * 60 * 1000;
	const differenceInMs = Math.abs(time1 - time2);

	return differenceInMs > timeInMilliseconds;
};
