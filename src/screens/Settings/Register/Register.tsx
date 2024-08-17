import { View, Text, ActivityIndicator } from 'react-native';
import { register } from '@/controllers/users';
import { useTranslation } from 'react-i18next';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useEffect, useState } from 'react';
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

	return (
		<SafeScreen>
			<View style={components.mainContainer}>
				<TextInputRounded onChangeText={setEmail} value={email} text="email" />
				<TextInputRounded
					onChangeText={setUsername}
					value={username}
					text="username"
				/>
				<TextInputRounded
					onChangeText={setPassword}
					value={password}
					secureTextEntry
					text="password"
				/>
				<TextInputRounded
					onChangeText={setRepeat}
					value={repeat}
					secureTextEntry
					text="repeat"
				/>
				{isPending ? (
					<ActivityIndicator />
				) : (
					<GreenRoundedButton handlePress={addUser} text="register" />
				)}
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
		</SafeScreen>
	);
}

export default Register;
