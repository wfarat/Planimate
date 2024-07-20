import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { isImageSourcePropType } from '@/types/guards/image';
import SendImage from '@/theme/assets/images/send.png';
import useRandomQuote from '@/theme/hooks/useRandomQuote';

import Portrait from '@/components/molecules/Portrait/Portrait';

function Quotes() {
	const { t } = useTranslation(['welcome', 'quotes']);
	const [quote, image] = useRandomQuote();
	const { layout, gutters, fonts, components } = useTheme();

	if (!isImageSourcePropType(SendImage)) {
		throw new Error('Image source is not valid');
	}

	return (
		<SafeScreen>
			<ScrollView>
				<View
					style={[
						layout.justifyCenter,
						layout.itemsCenter,
						gutters.marginTop_80,
					]}
				>
					<View style={[layout.relative, components.circle250]} />
					{quote && (
						<View style={[layout.absolute, gutters.paddingTop_80]}>
							<Portrait height={300} width={300} image={image} />
						</View>
					)}
				</View>

				<View style={[gutters.paddingHorizontal_32, gutters.marginTop_120]}>
					<Text style={[fonts.size_16, fonts.gray200, gutters.marginBottom_40]}>
						{t(quote)}
					</Text>
				</View>
			</ScrollView>
		</SafeScreen>
	);
}

export default Quotes;
