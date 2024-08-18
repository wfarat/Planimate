import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GoalsStack from '@/navigators/GoalsStack';
import QuotesStack from '@/navigators/QuotesStack';
import SettingsStack from '@/navigators/SettingsStack';
import CalendarStack from '@/navigators/CalendarStack';

const Tab = createBottomTabNavigator();

function Tabs() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tab.Screen
				name="GoalsStackScreen"
				component={GoalsStack}
				options={{
					tabBarIcon: ({ size, color }) => (
						<MaterialCommunityIcons name="target" size={size} color={color} />
					),
					tabBarShowLabel: false,
				}}
			/>
			<Tab.Screen
				name="MainStackScreen"
				component={QuotesStack}
				options={{
					tabBarIcon: ({ size, color }) => (
						<MaterialCommunityIcons
							name="format-quote-close"
							size={size}
							color={color}
						/>
					),
					tabBarShowLabel: false,
				}}
			/>
			<Tab.Screen
				name="Calendar"
				component={CalendarStack}
				options={{
					tabBarIcon: ({ size, color }) => (
						<MaterialCommunityIcons
							name="calendar-month"
							size={size}
							color={color}
						/>
					),
					tabBarShowLabel: false,
				}}
			/>
			<Tab.Screen
				name="SettingsStackScreen"
				component={SettingsStack}
				options={{
					tabBarIcon: ({ size, color }) => (
						<MaterialCommunityIcons name="cog" size={size} color={color} />
					),
					tabBarShowLabel: false,
				}}
			/>
		</Tab.Navigator>
	);
}

export default Tabs;
