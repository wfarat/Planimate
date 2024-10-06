import firestore from '@react-native-firebase/firestore';

export const syncDocRef = (userId: string) =>
	firestore().collection('users').doc(userId).collection('sync').doc('syncDoc');
