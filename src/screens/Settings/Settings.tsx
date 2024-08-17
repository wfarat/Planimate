import { View, TouchableOpacity } from 'react-native';
import i18next from 'i18next';

import { GreenRoundedButton, ImageVariant, Switch } from '@/components/atoms';
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

	const onChangeLanguage = () => {
		void i18next.changeLanguage(i18next.language === 'en' ? 'pl' : 'en');
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
				style={[layout.justifyCenter, layout.itemsCenter, gutters.padding_32]}
			>
				<Switch
					leftText="light"
					rightText="dark"
					handleChange={onChangeTheme}
					startPosition={variant === 'default'}
				/>
				<Switch
					leftText="PL"
					rightText="EN"
					handleChange={onChangeLanguage}
					startPosition={i18next.language === 'pl'}
				/>
			</View>
		</SafeScreen>
	);
}

export default Settings;
