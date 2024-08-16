import { View, TouchableOpacity } from 'react-native';
import i18next from 'i18next';

import { GreenRoundedButton, ImageVariant } from '@/components/atoms';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';

import { isImageSourcePropType } from '@/types/guards/image';

import ColorsWatchImage from '@/theme/assets/images/colorswatch.png';
import TranslateImage from '@/theme/assets/images/translate.png';

import type { RootScreenProps } from '@/types/navigation';

function Settings({ navigation }: RootScreenProps<'Settings'>) {
	const { colors, variant, changeTheme, layout, gutters, components } =
		useTheme();

	const onChangeTheme = () => {
		changeTheme(variant === 'default' ? 'dark' : 'default');
	};

	const onChangeLanguage = (lang: 'pl' | 'en') => {
		void i18next.changeLanguage(lang);
	};

	if (
		!isImageSourcePropType(ColorsWatchImage) ||
		!isImageSourcePropType(TranslateImage)
	) {
		throw new Error('Image source is not valid');
	}

	return (
		<SafeScreen>
			<View style={components.mainContainer}>
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
		</SafeScreen>
	);
}

export default Settings;
