import { View, Text } from 'react-native';

import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import GoalsList from '@/screens/Goals/GoalsList';
import { RootScreenProps } from '@/types/navigation';
import { useTranslation } from 'react-i18next';
import { GreenRoundedButton } from '@/components/atoms';

function Goals({ navigation, route }: RootScreenProps<'Goals'>) {
	const { fonts, layout, gutters, components } = useTheme();
	const { t } = useTranslation(['goals']);
	const handlePress = () => {
		navigation.push('AddGoal');
	};
	return (
		<SafeScreen>
			<View style={components.mainContainer}>
				<Text style={[fonts.gray100, fonts.size_24]}>{t('goals:header')}</Text>
				<GreenRoundedButton handlePress={handlePress} text="addGoal" />
				<View style={[gutters.marginTop_16, layout.fullWidth]}>
					<GoalsList navigation={navigation} route={route} />
				</View>
			</View>
		</SafeScreen>
	);
}

export default Goals;
