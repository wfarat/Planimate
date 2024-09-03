import { View } from 'react-native';
import i18next from 'i18next';

import { GreenRoundedButton, Switch } from '@/components/atoms';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';

import type { RootScreenProps } from '@/types/navigation';

function Settings({ navigation }: RootScreenProps<'Settings'>) {
	const { variant, changeTheme, layout, gutters, components } = useTheme();
	const onChangeTheme = () => {
		changeTheme(variant === 'default' ? 'dark' : 'default');
	};
	const onChangeLanguage = () => {
		void i18next.changeLanguage(i18next.language === 'en' ? 'pl' : 'en');
	};

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
