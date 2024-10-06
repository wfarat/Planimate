import { FirestoreSyncDoc } from '@/types/schemas/FirestoreSyncDoc';
import { Timestamp } from '@react-native-firebase/firestore';

export const combinedSyncDoc = (
	docs: FirestoreSyncDoc[],
	lastLocalSync: Timestamp,
) =>
	docs.reduce(
		(acc, doc) => {
			if (doc.timestamp > lastLocalSync) {
				return {
					goalsUpdated: acc.goalsUpdated || doc.goalsUpdated,
					tasksUpdated: acc.tasksUpdated || doc.tasksUpdated,
					agendaUpdated: acc.agendaUpdated || doc.agendaUpdated,
					timestamp:
						doc.timestamp > acc.timestamp ? doc.timestamp : acc.timestamp,
					tasksKeys: Array.from(new Set([...acc.tasksKeys, ...doc.tasksKeys])),
				};
			}
			return acc;
		},
		{
			goalsUpdated: false,
			tasksUpdated: false,
			agendaUpdated: false,
			timestamp: lastLocalSync,
			tasksKeys: [],
		},
	);
