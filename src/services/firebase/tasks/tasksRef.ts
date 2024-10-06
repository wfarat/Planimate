import firestore from '@react-native-firebase/firestore';

export const tasksRef = (userId: string, key: string) =>
	firestore().collection('users').doc(userId).collection('tasks').doc(key);
