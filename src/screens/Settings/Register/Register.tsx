import { View, TextInput, Text, ActivityIndicator } from 'react-native';
import { register } from '@/controllers/users';
import { useTranslation } from 'react-i18next';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useEffect, useState } from 'react';
import SendImage from '@/theme/assets/images/send.png';
import { resetStates } from '@/helpers/utils/resetStates';
import { isImageSourcePropType } from '@/types/guards/image';
import { GreenRoundedButton, TextInputRounded } from '@/components/atoms';

function Register() {
	const { t } = useTranslation(['register']);
	const { components } = useTheme();
	const [email, setEmail] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [repeat, setRepeat] = useState<string>('');
	const [mismatch, setMismatch] = useState<boolean>(false);
	const { mutate, isPending, isSuccess, error, data } = register();
	const addUser = () => {
		if (password !== repeat) {
			setMismatch(true);
			resetStates(setPassword, setRepeat);
		} else if (username.trim()) {
			mutate({ email, username, password });
		}
	};
	useEffect(() => {
		if (isSuccess) {
			resetStates(setEmail, setUsername, setPassword, setRepeat);
		}
	}, [isSuccess]);

	if (!isImageSourcePropType(SendImage)) {
		throw new Error('Image source is not valid');
	}
	return (
		<SafeScreen>
			<View style={components.mainContainer}>
				<View style={components.inputContainer}>
					<TextInputRounded
						onChangeText={setEmail}
						value={email}
						text="email"
					/>
					<TextInputRounded
						onChangeText={setUsername}
						value={username}
						text="username"
					/>
					<TextInputRounded
						onChangeText={setPassword}
						value={password}
						secure
						text="password"
					/>
					<TextInputRounded
						onChangeText={setRepeat}
						value={repeat}
						secure
						text="repeat"
					/>
					<GreenRoundedButton handlePress={addUser} text="register" />
				</View>
				<View>
					{mismatch && (
						<Text style={components.errorText}>
							{t('register:passwordMismatch')}
						</Text>
					)}
					{isSuccess && (
						<View>
							<Text>{data?.message}!</Text>
						</View>
					)}
					{error && (
						<View>
							<Text>Error: {error.message}</Text>
						</View>
					)}
				</View>
			</View>
		</SafeScreen>
	);
}

export default Register;
