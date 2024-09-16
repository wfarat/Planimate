import { View, Text, ActivityIndicator } from 'react-native';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { GreenRoundedButton, TextInputRounded } from '@/components/atoms';
import { useEffect, useState } from 'react';
import { useStorage } from '@/storage/StorageContext';
import { useOfflineActions } from '@/hooks/useOfflineActions';
import useSyncActions from '@/network/useSyncActions';
import { login } from '../../../api/users';

function Login() {
	const { components, layout, gutters } = useTheme();
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const storage = useStorage();
	const { getLocalActions } = useOfflineActions();
	const syncActions = useSyncActions();
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
		if (data?.access_token) {
			const token = data.access_token;
			const actions = getLocalActions();
			storage.set('token', token);
			if (actions) syncActions.mutate({ actions, token });
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
