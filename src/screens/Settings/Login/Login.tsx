import {
	TouchableOpacity,
	View,
	TextInput,
	Text,
	ActivityIndicator,
} from 'react-native';
import { login } from '@/controllers/users';
import { useTranslation } from 'react-i18next';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { ImageVariant } from '@/components/atoms';
import { useEffect, useState } from 'react';
import SendImage from '@/theme/assets/images/send.png';
import { isImageSourcePropType } from '@/types/guards/image';
import { useStorage } from '@/storage/StorageContext';

function Login() {
	const { t } = useTranslation(['register']);
	const { colors, layout, gutters, components } = useTheme();
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
			<View
				style={[
					layout.justifyCenter,
					layout.itemsCenter,
					gutters.marginTop_120,
				]}
			>
				<View style={[gutters.paddingHorizontal_32]}>
					{!isSuccess && (
						<View>
							<TextInput
								style={components.textInputRounded}
								value={username}
								onChangeText={setUsername}
								placeholder={t('register:user')}
							/>
							<TextInput
								style={components.textInputRounded}
								secureTextEntry
								value={password}
								onChangeText={setPassword}
								placeholder={t('register:password')}
							/>
						</View>
					)}
				</View>
				<View
					style={[
						layout.row,
						layout.justifyBetween,
						layout.fullWidth,
						gutters.marginTop_16,
					]}
				>
					<TouchableOpacity
						testID="change-language-button"
						style={[components.buttonCircle, gutters.marginBottom_16]}
						onPress={() => loginUser()}
					>
						{isPending ? (
							<ActivityIndicator />
						) : (
							<ImageVariant
								source={SendImage}
								style={{ tintColor: colors.green400 }}
							/>
						)}
					</TouchableOpacity>
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
