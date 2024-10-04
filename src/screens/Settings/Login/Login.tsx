import { View, Text, ActivityIndicator } from 'react-native';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { GreenRoundedButton, TextInputRounded } from '@/components/atoms';
import { useEffect, useState } from 'react';
import { storage } from '@/storage/storage';
import { login } from '../../../api/users';

function Login() {
	const { components, layout, gutters } = useTheme();
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const { mutate, isSuccess, isPending, error, data } = login();
	const loginUser = () => {
		if (username.trim()) {
			mutate({ username, password });
		}
	};
	useEffect(() => {
		if (data) {
			storage.set('userId', data);
		}
	}, [isSuccess]);

	return (
		<SafeScreen>
			<View style={components.mainContainer}>
				{!isSuccess && (
					<View style={[layout.fullWidth, gutters.marginTop_120]}>
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
		</SafeScreen>
	);
}

export default Login;
