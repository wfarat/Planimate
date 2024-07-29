import { View, TextInput, Text, TouchableOpacity } from 'react-native';

import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import GoalsList from '@/screens/Goals/GoalsList';
import { RootScreenProps } from '@/types/navigation';

function Goals({ navigation, route }: RootScreenProps<'Goals'>) {
	const { layout, gutters, components } = useTheme();

	return (
		<SafeScreen>
			<View
				style={[
					layout.justifyCenter,
					layout.itemsCenter,
					gutters.marginTop_120,
				]}
			>
				<View style={[gutters.paddingHorizontal_32]}>
					<GoalsList navigation={navigation} route={route} />
				</View>
			</View>
		</SafeScreen>
	);
}

export default Goals;
