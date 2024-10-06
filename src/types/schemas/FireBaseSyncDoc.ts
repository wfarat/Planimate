import { Timestamp } from '@react-native-firebase/firestore';

export type FireBaseSyncDoc = {
	goalsUpdated: boolean;
	tasksUpdated: boolean;
	agendaUpdated: boolean;
	timestamp: Timestamp;
	tasksKeys: string[];
};
