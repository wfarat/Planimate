import { Login, Register, Settings } from '@/screens';
import { createStackNavigator } from '@react-navigation/stack';
import type { RootStackParamList } from '@/types/navigation';
import { useTheme } from '@/theme';
import { fluentHorizontalTransition } from '@/navigators/options/fluentHorizontalTransition';

const Stack = createStackNavigator<RootStackParamList>();

function SettingsStack() {
	const { variant } = useTheme();
	return (
		<Stack.Navigator key={variant} screenOptions={fluentHorizontalTransition}>
			<Stack.Screen name="Settings" component={Settings} />
			<Stack.Screen name="Register" component={Register} />
			<Stack.Screen name="Login" component={Login} />
		</Stack.Navigator>
	);
}

export default SettingsStack;
