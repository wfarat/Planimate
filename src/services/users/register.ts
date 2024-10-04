import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import i18next from 'i18next';
// Function to register a user
const register = async (
	email: string,
	displayName: string,
	password: string,
): Promise<string> => {
	const { language } = i18next;
	try {
		const userCredential = await auth().createUserWithEmailAndPassword(
			email,
			password,
		);
		const userId = userCredential.user.uid; // This is the unique user ID

		// You can now create a document in Firestore for this user
		await firestore()
			.collection('users')
			.doc(userId)
			.set({ email, displayName }); // Store additional user info here
		return language === 'pl'
			? `Konto użytkownika ${displayName} zostało utworzone`
			: `User ${displayName} account was created`;
	} catch (error) {
		return language === 'pl'
			? `Błąd przy rejestracji użytkownika ${displayName}`
			: `Error registering user ${displayName}`;
	}
};

export default register;
