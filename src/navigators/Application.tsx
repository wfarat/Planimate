import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Main, Startup, Goals, Register, Tasks } from '@/screens';
import { useTheme } from '@/theme';

import type { RootStackParamList } from '@/types/navigation';
import Tabs from '@/navigators/Tabs';


function ApplicationNavigator() {
	const { variant, navigationTheme } = useTheme();

	return (
		<SafeAreaProvider>
			<NavigationContainer theme={navigationTheme}>
				<Tabs />
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

export default ApplicationNavigator;
