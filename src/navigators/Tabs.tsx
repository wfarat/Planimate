// Tabs.tsx

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GoalsStack from '@/navigators/GoalsStack';
import QuotesStack from '@/navigators/QuotesStack';
import SettingsStack from '@/navigators/SettingsStack';
import CalendarStack from '@/navigators/CalendarStack';

const Tab = createBottomTabNavigator();

// Separate function to return the tab icons
const getTabBarIcon = (name: string) =>
	function ({ size, color }: { size: number; color: string }) {
		return <MaterialCommunityIcons name={name} size={size} color={color} />;
	};

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
					tabBarIcon: getTabBarIcon('target'), // Use the external icon component
					tabBarShowLabel: false,
				}}
			/>
			<Tab.Screen
				name="MainStackScreen"
				component={QuotesStack}
				options={{
					tabBarIcon: getTabBarIcon('format-quote-close'),
					tabBarShowLabel: false,
				}}
			/>
			<Tab.Screen
				name="CalendarStack"
				component={CalendarStack}
				options={{
					tabBarIcon: getTabBarIcon('calendar-month'),
					tabBarShowLabel: false,
				}}
			/>
			<Tab.Screen
				name="SettingsStackScreen"
				component={SettingsStack}
				options={{
					tabBarIcon: getTabBarIcon('cog'),
					tabBarShowLabel: false,
				}}
			/>
		</Tab.Navigator>
	);
}

export default Tabs;
