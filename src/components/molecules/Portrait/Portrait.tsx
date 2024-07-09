import { View, DimensionValue } from 'react-native';


import { ImageVariant } from '@/components/atoms';
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
			<ImageVariant
				testID="brand-img"
				style={[layout.fullHeight, layout.fullWidth]}
				source={image}
				resizeMode={mode}
			/>
		</View>
	);
}

export default Portrait;
