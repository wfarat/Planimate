import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type QuoteTopBarProps = {
	onShare: () => void;
	onNext: () => void;
};

function QuoteTopBar({ onShare, onNext }: QuoteTopBarProps) {
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
				<TouchableOpacity onPress={onShare}>
					<MaterialCommunityIcons
						name="share-variant"
						size={20}
						color={colors.gray400}
					/>
				</TouchableOpacity>
				<TouchableOpacity onPress={onNext}>
					<MaterialCommunityIcons
						name="page-next"
						size={20}
						color={colors.gray400}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default QuoteTopBar;
