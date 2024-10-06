import { storage } from '@/storage/storage';
import { syncDocRef } from '@/api/firebase/syncData/syncDocRef';
import firestore, { Timestamp } from '@react-native-firebase/firestore';
import { FirestoreSyncDoc } from '@/types/schemas/FirestoreSyncDoc';
import { getSyncData } from '@/api/firebase/getData/getSyncData';

type SyncDoc = {
	lastSyncTime: Timestamp;
	docs: FirestoreSyncDoc[];
};
export const getSyncDoc = async () => {
	const userId = storage.getString('userId');
	try {
		if (userId) {
			const ref = syncDocRef(userId);
			const syncDoc = await ref.get();
			const lastLocalSync = JSON.parse(
				storage.getString('lastLocalSync') || '{seconds: 0, nanoseconds: 0}',
			) as Timestamp;
			if (syncDoc.exists) {
				const { lastSyncTime, docs } = syncDoc.data() as SyncDoc;
				if (
					new firestore.Timestamp(
						lastLocalSync.seconds,
						lastLocalSync.nanoseconds,
					) < lastSyncTime
				) {
					docs.forEach(doc => getSyncData(doc));
				}
			}
		}
	} catch (error) {
		console.error(error);
	}
};
