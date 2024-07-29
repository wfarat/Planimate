import { Text, View } from 'react-native';
import { useTheme } from '@/theme';
import type ItemCardProps from '@/types/props/itemCardProps';

function ItemCard({ name, description, completed, dueDate }: ItemCardProps) {
	const { layout, gutters, borders, backgrounds } = useTheme();
	return (
		<View
			style={[
				gutters.marginBottom_16,
				borders.gray400,
				borders.w_1,
				layout.fullWidth,
				borders.rounded_4,
				completed !== undefined &&
					(completed ? backgrounds.green400 : backgrounds.gray200),
			]}
		>
			<Text>{name}</Text>
			<Text>{description}</Text>
			{dueDate && <Text>{dueDate.toLocaleDateString()}</Text>}
		</View>
	);
}

export default ItemCard;
