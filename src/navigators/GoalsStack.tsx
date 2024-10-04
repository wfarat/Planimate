import {
	AddGoal,
	AddTask,
	AddToAgenda,
	Goals,
	Tasks,
	GenerateTasks,
} from '@/screens';
import { createStackNavigator } from '@react-navigation/stack';
import type { RootStackParamList } from '@/types/navigation';
import { useTheme } from '@/theme';
import { fluentHorizontalTransition } from '@/navigators/options/fluentHorizontalTransition';

const Stack = createStackNavigator<RootStackParamList>();

function GoalsStack() {
	const { variant } = useTheme();
	return (
		<Stack.Navigator key={variant} screenOptions={fluentHorizontalTransition}>
			<Stack.Screen name="Goals" component={Goals} />
			<Stack.Screen name="Tasks" component={Tasks} />
			<Stack.Screen name="AddToAgenda" component={AddToAgenda} />
			<Stack.Screen name="AddGoal" component={AddGoal} />
			<Stack.Screen name="AddTask" component={AddTask} />
			<Stack.Screen name="GenerateTasks" component={GenerateTasks} />
		</Stack.Navigator>
	);
}

export default GoalsStack;
