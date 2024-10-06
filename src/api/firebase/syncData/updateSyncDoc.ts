import firestore from '@react-native-firebase/firestore';
import { FirestoreSyncDoc } from '@/types/schemas/FirestoreSyncDoc';
import { syncDocRef } from '@/api/firebase/syncData/syncDocRef';

export const updateSyncDoc = async (
	userId: string,
	syncDocData: FirestoreSyncDoc,
) => {
	try {
		const ref = syncDocRef(userId);
		const syncDoc = await ref.get();

		if (syncDoc.exists) {
			// If syncDoc exists, update the existing one
			await ref.update({
				docs: firestore.FieldValue.arrayUnion(syncDocData),
				lastSyncTime: syncDocData.timestamp,
			});
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
