import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

import { ImageVariant } from '@/components/atoms';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';

import { isImageSourcePropType } from '@/types/guards/image';

import SendImage from '@/theme/assets/images/send.png';
import ColorsWatchImage from '@/theme/assets/images/colorswatch.png';
import TranslateImage from '@/theme/assets/images/translate.png';

import type { RootScreenProps } from '@/types/navigation';

function Settings({ navigation }: RootScreenProps<'Settings'>) {
	const { t } = useTranslation(['welcome', 'settings']);
	const { colors, variant, changeTheme, layout, gutters, fonts, components } =
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
			<ScrollView>
				<View
					style={[
						layout.justifyCenter,
						layout.itemsCenter,
						gutters.marginTop_80,
					]}
				>
					<View style={[gutters.paddingHorizontal_32, gutters.marginTop_40]}>
						<View style={[gutters.marginTop_40]}>
							<Text style={[fonts.size_40, fonts.gray800, fonts.bold]}>
								{t('welcome:title')}
							</Text>
							<Text
								style={[
									fonts.gray400,
									fonts.bold,
									fonts.size_24,
									gutters.marginBottom_32,
								]}
							>
								{t('welcome:subtitle')}
							</Text>
							<TouchableOpacity
								testID="fetch-user-button"
								style={[gutters.marginBottom_16]}
								onPress={() => navigation.navigate('Register')}
							>
								<Text style={[components.textInputRounded, gutters.padding_12]}>
									{t('settings:register')}
								</Text>
							</TouchableOpacity>
						</View>
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
			</ScrollView>
		</SafeScreen>
	);
}

export default Settings;
