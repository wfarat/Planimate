import { View, Text, ActivityIndicator } from 'react-native';
import { login } from '@/controllers/users';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { GreenRoundedButton, TextInputRounded } from '@/components/atoms';
import { useEffect, useState } from 'react';
import SendImage from '@/theme/assets/images/send.png';
import { isImageSourcePropType } from '@/types/guards/image';
import { useStorage } from '@/storage/StorageContext';

function Login() {
	const { components, layout } = useTheme();
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const storage = useStorage();
	const { mutate, isSuccess, isPending, error, data } = login();
	const loginUser = () => {
		if (username.trim()) {
			const formData = new FormData();
			formData.append('username', username);
			formData.append('password', password);
			mutate({ formData });
		}
	};
	useEffect(() => {
		if (data?.access_token) storage.set('token', data.access_token);
	}, [isSuccess]);
	if (!isImageSourcePropType(SendImage)) {
		throw new Error('Image source is not valid');
	}
	return (
		<SafeScreen>
			<View style={components.mainContainer}>
				<View style={components.inputContainer}>
					{!isSuccess && (
						<View style={layout.fullWidth}>
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
						</View>
					)}
					{isPending ? (
						<ActivityIndicator />
					) : (
						<GreenRoundedButton handlePress={loginUser} text="login" />
					)}
				</View>
				<View>
					{isSuccess && (
						<View>
							<Text>Login successful!</Text>
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

export default Login;
