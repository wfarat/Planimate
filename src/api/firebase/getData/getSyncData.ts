import { storage } from '@/storage/storage';
import { syncDocRef } from '@/api/firebase/syncData/syncDocRef';
import firestore, { Timestamp } from '@react-native-firebase/firestore';
import { FirestoreSyncDoc } from '@/types/schemas/FirestoreSyncDoc';
import { updateLocalData } from '@/api/firebase/getData/updateLocalData';
import { combinedSyncDoc } from '@/api/firebase/getData/combinedSyncDoc';

type SyncDoc = {
	lastSyncTime: Timestamp;
	docs: FirestoreSyncDoc[];
};
export const getSyncData = async () => {
	const userId = storage.getString('userId');
	try {
		if (userId) {
			const ref = syncDocRef(userId);
			const syncDoc = await ref.get();
			const getLastLocalSync = (lastLocalSyncRaw?: string): Timestamp => {
				if (!lastLocalSyncRaw) return new firestore.Timestamp(0, 0);

				const parsedTimestamp: Timestamp = JSON.parse(
					lastLocalSyncRaw,
				) as Timestamp;
				return new firestore.Timestamp(
					parsedTimestamp.seconds,
					parsedTimestamp.nanoseconds,
				);
			};
			const lastLocalSyncRaw = storage.getString('lastLocalSync');
			const lastLocalSyncTimestamp = getLastLocalSync(lastLocalSyncRaw);
			if (syncDoc.exists) {
				const { lastSyncTime, docs } = syncDoc.data() as SyncDoc;
				if (lastLocalSyncTimestamp < lastSyncTime) {
					await updateLocalData(
						combinedSyncDoc(docs, lastLocalSyncTimestamp),
						userId,
					);
				}
			}
		}
	} catch (error) {
		console.error(error);
	}
};
