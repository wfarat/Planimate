import { Timestamp } from '@react-native-firebase/firestore';

export type FirestoreSyncDoc = {
	goalsUpdated: boolean;
	tasksUpdated: boolean;
	agendaUpdated: boolean;
	timestamp: Timestamp;
	tasksKeys: string[];
};
