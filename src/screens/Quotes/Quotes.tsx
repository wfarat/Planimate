import { View, Text, ScrollView, Share, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import getRandomQuote from '@/helpers/utils/getRandomQuote';
import Portrait from '@/components/molecules/Portrait/Portrait';
import QuoteTopBar from '@/components/molecules/QuoteTopBar/QuoteTopBar';
import { useEffect, useState } from 'react';
import { QuoteKeys, QuoteNames } from '@/types/schemas/quotes';
import { ImageSourcePropType } from 'react-native/Libraries/Image/Image';

function Quotes() {
	const { t } = useTranslation(['welcome', 'quotes']);
	const [quote, setQuote] = useState<QuoteKeys>();
	const [name, setName] = useState<QuoteNames>();
	const [image, setImage] = useState<ImageSourcePropType>();
	const { layout, gutters, fonts, components } = useTheme();

	const updateQuoteAndImage = () => {
		const [newQuote, newImage] = getRandomQuote();
		setQuote(newQuote);
		const regex = /quotes\.\d+/g;
		setName(newQuote.replace(regex, 'name') as QuoteNames);
		setImage(newImage);
	};
	useEffect(() => {
		void updateQuoteAndImage();
	}, []);
	const onShare = async () => {
		try {
			const result = await Share.share({
				message: quote && name ? `${t(quote)} - ${t(name)}` : '',
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
		} catch (error) {
			// TypeScript's error type can be `any` but it’s better to cast or check for specific types
			if (error instanceof Error) {
				Alert.alert(error.message);
			} else {
				// Handle cases where the error is not an instance of Error
				Alert.alert('An unexpected error occurred.');
			}
		}
	};
	const onNext = () => {
		void updateQuoteAndImage();
	};
	return (
		<SafeScreen>
			<ScrollView>
				<QuoteTopBar onShare={() => void onShare()} onNext={() => onNext()} />
				<View style={components.mainContainer}>
					<Text style={components.header}>{name && t(name)}</Text>
					<View style={[layout.relative, components.circle250]} />
					<View style={[layout.absolute, gutters.paddingTop_80]}>
						{image && <Portrait height={300} width={300} image={image} />}
					</View>
				</View>

				<View style={[gutters.paddingHorizontal_32, gutters.marginTop_60]}>
					<Text style={[fonts.size_24, fonts.gray200, gutters.marginBottom_40]}>
						{quote && t(quote)}
					</Text>
				</View>
			</ScrollView>
		</SafeScreen>
	);
}

export default Quotes;
