import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';

import Tabs from '@/navigators/Tabs';
import useNetworkListener from '@/helpers/hooks/offline/useNetworkListener';

function ApplicationNavigator() {
	const { navigationTheme } = useTheme();
	useNetworkListener();
	return (
		<SafeAreaProvider>
			<NavigationContainer theme={navigationTheme}>
				<Tabs />
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

export default ApplicationNavigator;
