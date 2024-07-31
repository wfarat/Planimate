import { Text, View } from 'react-native';
import { useTheme } from '@/theme';
import type ItemCardProps from '@/types/props/itemCardProps';
import * as Progress from 'react-native-progress';
import isEmpty from 'lodash/isEmpty';

function ItemCard({
	name,
	description,
	completed,
	dueDate,
	duration,
}: ItemCardProps) {
	const { layout, gutters, borders, fonts, backgrounds } = useTheme();
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
			{dueDate && <Text>{new Date(dueDate).toLocaleDateString()}</Text>}
			{!isEmpty(duration) && (
				<View style={[layout.absolute, layout.top0, layout.right0]}>
					<Progress.Pie
						progress={(duration.base - duration.remaining) / duration.base}
					/>
				</View>
			)}
		</View>
	);
}

export default ItemCard;
