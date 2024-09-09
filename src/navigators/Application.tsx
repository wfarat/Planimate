import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';

import Tabs from '@/navigators/Tabs';

function ApplicationNavigator() {
	const { navigationTheme } = useTheme();

	return (
		<SafeAreaProvider>
			<NavigationContainer theme={navigationTheme}>
				<Tabs />
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

export default ApplicationNavigator;
