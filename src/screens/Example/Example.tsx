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

import useRandomQuote from '@/theme/hooks/useRandomQuote';
import type { RootScreenProps } from '@/types/navigation';
import Portrait from '@/components/molecules/Portrait/Portrait';

function Example({ navigation }: RootScreenProps<'Example'>) {
	const { t } = useTranslation(['welcome']);
	const quote = useRandomQuote();
	const {
		colors,
		variant,
		changeTheme,
		layout,
		gutters,
		fonts,
		components,
		backgrounds,
	} = useTheme();

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
					<View
						style={[layout.relative, components.circle250]}
					/>
					{quote && (
						<View style={[layout.absolute, gutters.paddingTop_80]}>
							<Portrait height={300} width={300} image={quote[1]} />
						</View>
					)}
				</View>

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
						<Text
							style={[fonts.size_16, fonts.gray200, gutters.marginBottom_40]}
						>
							{t(quote[0])}
						</Text>
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
							testID="fetch-user-button"
							style={[components.buttonCircle, gutters.marginBottom_16]}
							onPress={() => navigation.navigate('Goals')}
						>
							<ImageVariant
								source={SendImage}
								style={{ tintColor: colors.purple500 }}
							/>
						</TouchableOpacity>

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

export default Example;
