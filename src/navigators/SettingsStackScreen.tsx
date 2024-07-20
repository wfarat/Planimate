import { Register, Settings } from '@/screens';
import { createStackNavigator } from '@react-navigation/stack';
import type { RootStackParamList } from '@/types/navigation';
import { useTheme } from '@/theme';

const Stack = createStackNavigator<RootStackParamList>();

function SettingsStackScreen() {
	const { variant } = useTheme();
	return (
		<Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Settings" component={Settings} />
			<Stack.Screen name="Register" component={Register} />
		</Stack.Navigator>
	);
}

export default SettingsStackScreen;
