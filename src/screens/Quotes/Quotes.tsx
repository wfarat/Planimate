import { View, Text, ScrollView, Share, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import getRandomQuote from '@/helpers/utils/getRandomQuote';
import Portrait from '@/components/molecules/Portrait/Portrait';
import QuoteTopBar from '@/components/molecules/QuoteTopBar/QuoteTopBar';
import { useEffect, useState } from 'react';
import { QuoteKeys } from '@/types/schemas/quotes';
import { ImageSourcePropType } from 'react-native/Libraries/Image/Image';

function Quotes() {
	const { t } = useTranslation(['welcome', 'quotes']);
	const [quote, setQuote] = useState<QuoteKeys>();
	const [image, setImage] = useState<ImageSourcePropType>();
	const { layout, gutters, fonts, components } = useTheme();

	const updateQuoteAndImage = () => {
		const [newQuote, newImage] = getRandomQuote();
		setQuote(newQuote);
		setImage(newImage);
	};
	useEffect(() => {
		void updateQuoteAndImage();
	}, []);
	const onShare = async () => {
		try {
			const result = await Share.share({
				message: quote ? t(quote) : '',
			});
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error: any) {
			Alert.alert(error.message);
		}
	};
	const onNext = () => {
		void updateQuoteAndImage();
	};
	return (
		<SafeScreen>
			<ScrollView>
				<QuoteTopBar onShare={() => onShare()} onNext={() => onNext()} />
				<View
					style={[
						layout.justifyCenter,
						layout.itemsCenter,
						gutters.marginTop_80,
					]}
				>
					<View style={[layout.relative, components.circle250]} />

					<View style={[layout.absolute, gutters.paddingTop_80]}>
						{image && <Portrait height={300} width={300} image={image} />}
					</View>
				</View>

				<View style={[gutters.paddingHorizontal_32, gutters.marginTop_120]}>
					<Text style={[fonts.size_16, fonts.gray200, gutters.marginBottom_40]}>
						{quote && t(quote)}
					</Text>
				</View>
			</ScrollView>
		</SafeScreen>
	);
}

export default Quotes;
