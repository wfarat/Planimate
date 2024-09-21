import { GeneratedTask } from '@/types/schemas';
import { useTheme } from '@/theme';
import { Text, View } from 'react-native';

type Props = {
	generatedTask: GeneratedTask;
};
function GeneratedTaskCard({ generatedTask }: Props) {
	const { name, description, dueDate, divisible, duration } = generatedTask;
	const { gutters, borders, layout } = useTheme();
	return (
		<View
			style={[
				gutters.marginBottom_16,
				borders.gray400,
				borders.w_1,
				layout.fullWidth,
				borders.rounded_4,
				gutters.padding_16,
			]}
		>
			<Text>{name}</Text>
			<Text>{description}</Text>
			{dueDate && <Text>{new Date(dueDate).toLocaleDateString()}</Text>}
			{duration && <Text>{duration}</Text>}
			{divisible && <Text>Divisible</Text>}
		</View>
	);
}

export default GeneratedTaskCard;
