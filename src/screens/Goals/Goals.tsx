import { View, Text, TouchableOpacity } from 'react-native';

import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import GoalsList from '@/screens/Goals/GoalsList';
import { RootScreenProps } from '@/types/navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { GreenRoundedButton } from '@/components/atoms';

function Goals({ navigation, route }: RootScreenProps<'Goals'>) {
	const { fonts, borders, colors, layout, gutters, components } = useTheme();
	const { t } = useTranslation(['goals']);
	const handlePress = () => {
		navigation.push('AddGoalScreen');
	};
	return (
		<SafeScreen>
			<View style={components.mainContainer}>
				<Text style={[fonts.gray400, fonts.size_24]}>{t('goals:header')}</Text>

				<View
					style={[layout.itemsCenter, layout.fullWidth, gutters.padding_16]}
				>
					<GreenRoundedButton handlePress={handlePress} text="addGoal" />
					<View style={[gutters.marginTop_16, layout.fullWidth]}>
						<GoalsList navigation={navigation} route={route} />
					</View>
				</View>
			</View>
		</SafeScreen>
	);
}

export default Goals;
