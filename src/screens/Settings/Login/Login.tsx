import { View, Text, ActivityIndicator } from 'react-native';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { GreenRoundedButton, TextInputRounded } from '@/components/atoms';
import { useEffect, useState } from 'react';
import { storage } from '@/storage/storage';
import { getAllData } from '@/api/firebase/getData/getAllData';
import { login } from '../../../api/firebase/users';

function Login() {
	const { components, layout, gutters } = useTheme();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const { mutate, isSuccess, isPending, error, data } = login();
	const loginUser = () => {
		if (email.trim()) {
			mutate({ email, password });
		}
	};
	useEffect(() => {
		if (data) {
			storage.set('userId', data);
			getAllData()
				.then()
				.catch(error => console.error(error));
		}
	}, [isSuccess]);

	return (
		<SafeScreen>
			<View style={components.mainContainer}>
				{!isSuccess && (
					<View style={[layout.fullWidth, gutters.marginTop_120]}>
						<TextInputRounded
							onChangeText={setEmail}
							value={email}
							text="email"
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
