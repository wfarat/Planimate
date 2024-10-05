import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const register = async (
	email: string,
	displayName: string,
	password: string,
) => {
	const userCredential = await auth().createUserWithEmailAndPassword(
		email,
		password,
	);
	const userId = userCredential.user.uid; // This is the unique user ID

	await firestore().collection('users').doc(userId).set({ email, displayName });
};

export default register;
