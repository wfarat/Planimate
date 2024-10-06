import firestore, { Timestamp } from '@react-native-firebase/firestore';

export const getLastLocalSync = (lastLocalSyncRaw?: string): Timestamp => {
	if (!lastLocalSyncRaw) return new firestore.Timestamp(0, 0);

	const parsedTimestamp: Timestamp = JSON.parse(lastLocalSyncRaw) as Timestamp;
	return new firestore.Timestamp(
		parsedTimestamp.seconds,
		parsedTimestamp.nanoseconds,
	);
};
