import firestore from '@react-native-firebase/firestore';

export const agendaRef = (userId: string) =>
	firestore()
		.collection('users')
		.doc(userId)
		.collection('agenda')
		.doc('agendaDoc'); // Single document for the agenda
