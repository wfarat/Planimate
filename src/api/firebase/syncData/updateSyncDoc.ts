import firestore from '@react-native-firebase/firestore';
import { FireBaseSyncDoc } from '@/api/firebase/syncData/syncData';
import isEmpty from 'lodash/isEmpty';

type userData = {
	syncDoc: FireBaseSyncDoc;
};
export const updateSyncDoc = async (
	userId: string,
	syncDocData: FireBaseSyncDoc,
) => {
	try {
		const userDocRef = firestore().collection('users').doc(userId);
		const userDoc = await userDocRef.get();

		if (userDoc.exists) {
			const { syncDoc } = userDoc.data() as userData;

			if (!isEmpty(syncDoc)) {
				// If syncDoc exists, update the existing one
				await userDocRef.update({
					'syncDoc.tasksKeys': firestore.FieldValue.arrayUnion(
						...syncDocData.tasksKeys,
					),
					'syncDoc.lastSyncTime': syncDocData.lastSyncTime,
				});
				console.log('Updated existing syncDoc with new tasks keys.');
			} else {
				// If syncDoc does not exist, create it
				await userDocRef.set({ syncDoc: syncDocData }, { merge: true });
				console.log('Created new syncDoc with initial data.');
			}
		} else {
			// If user document does not exist, create it with syncDoc
			await userDocRef.set({ syncDoc: syncDocData }, { merge: true });
			console.log('Created user document with new syncDoc.');
		}
	} catch (error) {
		console.error('Error synchronizing data:', error);
	}
};
