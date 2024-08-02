import { View, Text, TouchableOpacity } from 'react-native';

import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import GoalsList from '@/screens/Goals/GoalsList';
import { RootScreenProps } from '@/types/navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

function Goals({ navigation, route }: RootScreenProps<'Goals'>) {
	const { fonts, borders, colors, layout, gutters } = useTheme();
	const { t } = useTranslation(['goals']);
	const handlePress = () => {
		navigation.push('AddGoalScreen');
	};
	return (
		<SafeScreen>
			<View
				style={[
					layout.justifyCenter,
					layout.itemsCenter,
					gutters.marginTop_80,
					gutters.padding_16,
				]}
			>
				<Text style={[fonts.gray400, fonts.size_24]}>{t('goals:header')}</Text>

				<View
					style={[layout.itemsCenter, layout.fullWidth, gutters.padding_16]}
				>
					<TouchableOpacity
						onPress={handlePress}
						style={[
							layout.row,
							borders.w_1,
							borders.gray400,
							borders.rounded_4,
						]}
					>
						<Text style={[fonts.gray400, fonts.size_24]}>{t('goals:add')}</Text>
						<MaterialCommunityIcons
							name="plus-box"
							color={colors.gray400}
							size={36}
						/>
					</TouchableOpacity>
					<View
						style={[gutters.marginTop_16, layout.fullWidth, gutters.padding_16]}
					>
						<GoalsList navigation={navigation} route={route} />
					</View>
				</View>
			</View>
		</SafeScreen>
	);
}

export default Goals;
