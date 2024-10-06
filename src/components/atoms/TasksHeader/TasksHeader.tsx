import { Text, View } from 'react-native';
import GreenRoundedButton from '@/components/atoms/GreenRoundedButton/GreenRoundedButton';
import { useTheme } from '@/theme';

type Props = {
	goalName: string;
	taskName?: string;
	handlePress: () => void;
};
function TasksHeader({ goalName, handlePress, taskName }: Props) {
	const { fonts, layout } = useTheme();
	return (
		<View style={[layout.justifyCenter, layout.itemsCenter]}>
			<Text style={[fonts.size_24, fonts.gray100]}>{goalName}</Text>
			{taskName && (
				<Text style={[fonts.size_24, fonts.gray100]}>{taskName}</Text>
			)}
			<GreenRoundedButton handlePress={handlePress} text="addTask" />
		</View>
	);
}

export default TasksHeader;
