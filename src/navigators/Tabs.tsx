import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GoalsStackScreen from '@/navigators/GoalsStackScreen';
import MainStackScreen from '@/navigators/MainStackScreen';
import SettingsStackScreen from '@/navigators/SettingsStackScreen';

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
				component={GoalsStackScreen}
				options={{
					tabBarIcon: ({ size, color }) => (
						<MaterialCommunityIcons name="target" size={size} color={color} />
					),
					tabBarShowLabel: false,
				}}
			/>
			<Tab.Screen
				name="MainStackScreen"
				component={MainStackScreen}
				options={{
					tabBarIcon: ({ size, color }) => (
						<MaterialCommunityIcons name="format-quote-close" size={size} color={color} />
					),
					tabBarShowLabel: false,
				}}
			/>
			<Tab.Screen
				name="SettingsStackScreen"
				component={SettingsStackScreen}
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
