import { Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';

type Props = {
	handlePress: () => void;
	text:
		| 'addGoal'
		| 'addTask'
		| 'goToTasks'
		| 'register'
		| 'login'
		| 'addAgendaItem'
		| 'fillWeek'
		| 'generateTasks'
		| 'saveTasks';
};
function GreenRoundedButton({ handlePress, text }: Props) {
	const { components, fonts, gutters } = useTheme();
	const { t } = useTranslation(['common']);
	return (
		<TouchableOpacity
			onPress={handlePress}
			style={components.buttonRoundedGreen}
		>
			<Text style={[fonts.white, fonts.size_24, gutters.marginRight_12]}>
				{t(`common:buttonText.${text}`)}
			</Text>
		</TouchableOpacity>
	);
}

export default GreenRoundedButton;
