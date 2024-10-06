import firestore from '@react-native-firebase/firestore';
import { FireBaseSyncDoc } from '@/types/schemas/FireBaseSyncDoc';

export const updateSyncDoc = async (
	userId: string,
	syncDocData: FireBaseSyncDoc,
) => {
	try {
		const syncDocRef = firestore()
			.collection('users')
			.doc(userId)
			.collection('sync')
			.doc('syncDoc');
		const syncDoc = await syncDocRef.get();

		if (syncDoc.exists) {
			// If syncDoc exists, update the existing one
			await syncDocRef.update({
				docs: firestore.FieldValue.arrayUnion(syncDocData),
				lastSyncTime: syncDocData.timestamp,
			});
			// If syncDoc does not exist, create it
			await syncDocRef.set(
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
