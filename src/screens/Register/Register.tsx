import {
	TouchableOpacity,
	View,
	TextInput,
	Text,
	ActivityIndicator,
} from 'react-native';
import { register, login } from '@/controllers/users';
import { useTranslation } from 'react-i18next';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { ImageVariant } from '@/components/atoms';
import { useState } from 'react';
import { useStorage } from '@/storage/StorageContext';
import SendImage from '@/theme/assets/images/send.png';
import { resetStates } from '@/helpers/utils/resetStates';
import { isImageSourcePropType } from '@/types/guards/image';

function Register() {
	const { t } = useTranslation(['register']);
	const storage = useStorage();
	const { colors, layout, gutters, components } = useTheme();
	const [email, setEmail] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [repeat, setRepeat] = useState<string>('');
	const [mismatch, setMismatch] = useState<boolean>(false);
	const { mutate, isPending, isSuccess, error, data } = register();
	const mutation = login();
	const addUser = () => {
		if (password !== repeat) {
			setMismatch(true);
			resetStates(setPassword, setRepeat);
		} else if (username.trim()) {
			mutate({ email, username, password });
			resetStates(setEmail, setUsername, setPassword, setRepeat);
		}
	};

	const loginUser = () => {
		if (username.trim()) {
			mutation.mutate({ username, password });
		}
	};
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
								value={email}
								onChangeText={setEmail}
								placeholder={t('register:email')}
							/>
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
							<TextInput
								style={components.textInputRounded}
								secureTextEntry
								value={repeat}
								onChangeText={setRepeat}
								placeholder={t('register:repeat')}
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
						onPress={() => addUser()}
					>
						{isPending ? (
							<ActivityIndicator />
						) : (
							<ImageVariant
								source={SendImage}
								style={{ tintColor: colors.purple500 }}
							/>
						)}
					</TouchableOpacity>
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
