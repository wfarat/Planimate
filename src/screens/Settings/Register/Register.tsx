import { View, Text, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useEffect, useState } from 'react';
import { resetStates } from '@/utils/resetStates';
import { GreenRoundedButton, TextInputRounded } from '@/components/atoms';
import { register } from '../../../api/firebase/users';

function Register() {
	const { t } = useTranslation(['register']);
	const { components, layout, gutters } = useTheme();
	const [email, setEmail] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [repeat, setRepeat] = useState<string>('');
	const [mismatch, setMismatch] = useState<boolean>(false);
	const { mutate, isPending, isSuccess, error } = register();
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
				<View style={[layout.fullWidth, gutters.marginTop_120]}>
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
						secureTextEntry
						text="password"
					/>
					<TextInputRounded
						onChangeText={setRepeat}
						value={repeat}
						secureTextEntry
						text="repeat"
					/>
				</View>
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
						<Text>{t('register:success', { username })}</Text>
					</View>
				)}
				{error && (
					<View>
						<Text>{t('register:error', { username })}</Text>
					</View>
				)}
			</View>
		</SafeScreen>
	);
}

export default Register;
