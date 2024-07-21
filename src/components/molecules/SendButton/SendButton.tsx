import { GestureResponderEvent, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/theme';
import { ImageVariant } from '@/components/atoms';
import SendImage from '@/theme/assets/images/send.png';
import { isImageSourcePropType } from '@/types/guards/image';

type SendButtonProps = {
	handlePress: ((event: GestureResponderEvent) => void) | undefined;
};

function SendButton({ handlePress }: SendButtonProps) {
	const { colors, layout, gutters, components } = useTheme();

	if (!isImageSourcePropType(SendImage)) {
		throw new Error('Image source is not valid');
	}
	const handlePressWrapper = (event: GestureResponderEvent) => {
		if (handlePress) {
			handlePress(event);
		}
	};
	return (
		<View
			style={[
				layout.row,
				layout.justifyBetween,
				layout.fullWidth,
				gutters.marginTop_16,
			]}
		>
			<TouchableOpacity
				testID="change-language-button"
				style={[components.buttonCircle, gutters.marginBottom_16]}
				onPress={handlePressWrapper}
			>
				<ImageVariant
					source={SendImage}
					style={{ tintColor: colors.purple500 }}
				/>
			</TouchableOpacity>
		</View>
	);
}

export default SendButton;
