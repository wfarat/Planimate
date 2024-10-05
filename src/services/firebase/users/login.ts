import auth from '@react-native-firebase/auth';

export default async (email: string, password: string): Promise<string> => {
	const userCredential = await auth().signInWithEmailAndPassword(
		email,
		password,
	);
	return userCredential.user.uid;
};
