import firestore from '@react-native-firebase/firestore';

export const goalsRef = (userId: string) => {
	return firestore()
		.collection('users')
		.doc(userId)
		.collection('goals')
		.doc('goalsDoc'); // Single document for all goals
};
