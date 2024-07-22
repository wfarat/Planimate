import { Text, View } from 'react-native';
import { useTheme } from '@/theme';
import { ItemCardProps } from '@/types/schemas';

function ItemCard({ name, description, completed }: ItemCardProps) {
	const { layout, gutters, borders, backgrounds } = useTheme();
	return (
		<View
			style={[
				gutters.marginBottom_16,
				borders.gray400,
				borders.w_1,
				layout.fullWidth,
				borders.rounded_4,
				completed ? backgrounds.green400 : backgrounds.gray200,
			]}
		>
			<Text>{name}</Text>
			<Text>{description}</Text>
		</View>
	);
}

export default ItemCard;
