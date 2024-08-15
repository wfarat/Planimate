import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

import { GreenRoundedButton, ImageVariant } from '@/components/atoms';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';

import { isImageSourcePropType } from '@/types/guards/image';

import SendImage from '@/theme/assets/images/send.png';
import ColorsWatchImage from '@/theme/assets/images/colorswatch.png';
import TranslateImage from '@/theme/assets/images/translate.png';

import type { RootScreenProps } from '@/types/navigation';

function Settings({ navigation }: RootScreenProps<'Settings'>) {
	const { t } = useTranslation(['welcome']);
	const { colors, variant, changeTheme, layout, gutters, components } =
		useTheme();

	const onChangeTheme = () => {
		changeTheme(variant === 'default' ? 'dark' : 'default');
	};

	const onChangeLanguage = (lang: 'pl' | 'en') => {
		void i18next.changeLanguage(lang);
	};

	if (
		!isImageSourcePropType(SendImage) ||
		!isImageSourcePropType(ColorsWatchImage) ||
		!isImageSourcePropType(TranslateImage)
	) {
		throw new Error('Image source is not valid');
	}

	return (
		<SafeScreen>
			<View style={components.mainContainer}>
				<View style={components.inputContainer}>
					<GreenRoundedButton
						handlePress={() => navigation.push('Register')}
						text="register"
					/>
					<GreenRoundedButton
						handlePress={() => navigation.push('Login')}
						text="login"
					/>
				</View>
				<View
					style={[
						layout.row,
						layout.justifyBetween,
						layout.fullWidth,
						gutters.marginTop_16,
						gutters.padding_32,
					]}
				>
					<TouchableOpacity
						testID="change-theme-button"
						style={[components.buttonCircle, gutters.marginBottom_16]}
						onPress={() => onChangeTheme()}
					>
						<ImageVariant
							source={ColorsWatchImage}
							style={{ tintColor: colors.purple500 }}
						/>
					</TouchableOpacity>

					<TouchableOpacity
						testID="change-language-button"
						style={[components.buttonCircle, gutters.marginBottom_16]}
						onPress={() =>
							onChangeLanguage(i18next.language === 'pl' ? 'en' : 'pl')
						}
					>
						<ImageVariant
							source={TranslateImage}
							style={{ tintColor: colors.purple500 }}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</SafeScreen>
	);
}

export default Settings;
