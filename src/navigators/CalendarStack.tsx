import { Calendar, FillAgendaWeek } from '@/screens';
import { createStackNavigator } from '@react-navigation/stack';
import type { RootStackParamList } from '@/types/navigation';
import { useTheme } from '@/theme';

const Stack = createStackNavigator<RootStackParamList>();

function CalendarStack() {
	const { variant } = useTheme();
	return (
		<Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Calendar" component={Calendar} />
			<Stack.Screen name="FillAgendaWeek" component={FillAgendaWeek} />
		</Stack.Navigator>
	);
}

export default CalendarStack;
