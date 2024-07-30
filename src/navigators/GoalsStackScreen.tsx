import {
	AddGoalScreen,
	AddTaskScreen,
	AddToAgendaScreen,
	Goals,
	Tasks,
} from '@/screens';
import { createStackNavigator } from '@react-navigation/stack';
import type { RootStackParamList } from '@/types/navigation';
import { useTheme } from '@/theme';

const Stack = createStackNavigator<RootStackParamList>();

function GoalsStackScreen() {
	const { variant } = useTheme();
	return (
		<Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Goals" component={Goals} />
			<Stack.Screen name="Tasks" component={Tasks} />
			<Stack.Screen name="AddToAgendaScreen" component={AddToAgendaScreen} />
			<Stack.Screen name="AddGoalScreen" component={AddGoalScreen} />
			<Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
		</Stack.Navigator>
	);
}

export default GoalsStackScreen;
