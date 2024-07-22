import { View, DimensionValue, Image } from 'react-native';

import { useTheme } from '@/theme';
import { isImageSourcePropType } from '@/types/guards/image';
import { ImageSourcePropType } from 'react-native/Libraries/Image/Image';

type Props = {
	height?: DimensionValue;
	width?: DimensionValue;
	mode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center';
	image: ImageSourcePropType;
};

function Portrait({
	height = 200,
	width = 200,
	mode = 'contain',
	image,
}: Props) {
	const { layout } = useTheme();

	if (!isImageSourcePropType(image)) {
		throw new Error('Image source is not valid');
	}

	return (
		<View testID="brand-img-wrapper" style={{ height, width }}>
			<Image
				style={[layout.fullHeight, layout.fullWidth]}
				source={image}
				resizeMode={mode}
			/>
		</View>
	);
}

export default Portrait;
