import { Timestamp } from '@react-native-firebase/firestore';

export type FireBaseSyncDoc = {
	goalsUpdated: boolean;
	tasksUpdated: boolean;
	agendaUpdated: boolean;
	lastSyncTime: Timestamp;
	tasksKeys: string[];
};
