import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type TaskTopBarProps = {
	onDelete: () => void;
	onFinish?: () => void;
	onEdit: () => void;
	isCompletionPossible?: boolean;
	addToAgenda?: () => void;
};

function TaskTopBar({
	onDelete,
	onEdit,
	onFinish = undefined,
	isCompletionPossible = undefined,
	addToAgenda = undefined,
}: TaskTopBarProps) {
	const { layout, gutters, colors } = useTheme();

	return (
		<View style={[layout.absolute, layout.itemsCenter, layout.top0]}>
			<View
				style={[
					layout.row,
					layout.justifyBetween,
					layout.fullWidth,
					gutters.padding_32,
				]}
			>
				<TouchableOpacity onPress={onDelete}>
					<MaterialCommunityIcons
						name="delete"
						size={28}
						color={colors.red500}
					/>
				</TouchableOpacity>
				<TouchableOpacity onPress={onEdit}>
					<MaterialCommunityIcons
						name="pencil-box"
						size={28}
						color={colors.purple500}
					/>
				</TouchableOpacity>
				{addToAgenda && (
					<TouchableOpacity onPress={addToAgenda}>
						<MaterialCommunityIcons
							name="calendar-plus"
							size={28}
							color={colors.blue100}
						/>
					</TouchableOpacity>
				)}
				{onFinish && (
					<TouchableOpacity onPress={onFinish} disabled={!isCompletionPossible}>
						<MaterialCommunityIcons
							name="checkbox-marked"
							size={28}
							color={isCompletionPossible ? colors.green500 : colors.red500}
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
}

export default TaskTopBar;
