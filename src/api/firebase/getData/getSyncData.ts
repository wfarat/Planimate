import { storage } from '@/storage/storage';
import { syncDocRef } from '@/api/firebase/syncData/syncDocRef';
import firestore, { Timestamp } from '@react-native-firebase/firestore';
import { FirestoreSyncDoc } from '@/types/schemas/FirestoreSyncDoc';
import { updateLocalData } from '@/api/firebase/getData/updateLocalData';
import { combinedSyncDoc } from '@/api/firebase/getData/combinedSyncDoc';
import { getLastLocalSync } from '@/utils/getLastLocalSync';
import { compareTwoTimestamps } from '@/utils/compareTwoTimestamps';

type SyncDoc = {
	lastSyncTime: Timestamp;
	docs: FirestoreSyncDoc[];
};
export const getSyncData = async () => {
	const userId = storage.getString('userId');
	const lastLocalSyncRaw = storage.getString('lastLocalSync');
	const lastLocalSyncTimestamp = getLastLocalSync(lastLocalSyncRaw);
	const currentTime = firestore.Timestamp.now();
	const hasEnoughTimePassed = compareTwoTimestamps(
		lastLocalSyncTimestamp,
		currentTime,
		10,
	);
	if (!hasEnoughTimePassed) return;
	try {
		if (userId) {
			const ref = syncDocRef(userId);
			const syncDoc = await ref.get();
			if (syncDoc.exists) {
				const { lastSyncTime, docs } = syncDoc.data() as SyncDoc;
				if (lastLocalSyncTimestamp < lastSyncTime) {
					await updateLocalData(
						combinedSyncDoc(docs, lastLocalSyncTimestamp),
						userId,
					);
				}
				storage.set('lastLocalSync', JSON.stringify(lastSyncTime));
			}
		}
	} catch (error) {
		console.error(error);
	}
};
