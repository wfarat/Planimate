import { Text, View } from 'react-native';
import { useTheme } from '@/theme';
import { NameAndDescription } from '@/types/schemas';

function ItemCard({ name, description }: NameAndDescription) {
	const { layout, gutters, borders } = useTheme();
	return (
		<View
			style={[
				gutters.marginBottom_16,
				borders.gray400,
				borders.w_1,
				layout.fullWidth,
				borders.rounded_4,
			]}
		>
			<Text>{name}</Text>
			<Text>{description}</Text>
		</View>
	);
}

export default ItemCard;
