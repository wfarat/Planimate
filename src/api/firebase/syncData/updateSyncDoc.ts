import firestore, { Timestamp } from '@react-native-firebase/firestore';
import { FirestoreSyncDoc } from '@/types/schemas/FirestoreSyncDoc';
import { syncDocRef } from '@/api/firebase/syncData/syncDocRef';
import isEmpty from 'lodash/isEmpty';

type SyncDocs = {
	docs: FirestoreSyncDoc[];
	lastSyncTime: Timestamp;
};
export const updateSyncDoc = async (
	userId: string,
	syncDocData: FirestoreSyncDoc,
	keysToDelete: string[],
) => {
	try {
		const ref = syncDocRef(userId);
		const syncDoc = await ref.get();

		if (syncDoc.exists) {
			if (!isEmpty(keysToDelete)) {
				const { docs } = syncDoc.data() as SyncDocs;
				docs.push(syncDocData);
				const updatedDocs = docs.map(doc =>
					doc.tasksKeys.filter(key => !keysToDelete.includes(key)),
				);
				await ref.update({
					docs: updatedDocs,
					lastSyncTime: syncDocData.timestamp,
				});
			} else {
				await ref.update({
					docs: firestore.FieldValue.arrayUnion(syncDocData),
					lastSyncTime: syncDocData.timestamp,
				});
			}
		} else {
			// If syncDoc does not exist, create it
			await ref.set(
				{
					docs: [syncDocData],
					lastSyncTime: syncDocData.timestamp,
				},
				{ merge: true },
			);
		}
	} catch (error) {
		console.error('Error synchronizing data:', error);
	}
};
