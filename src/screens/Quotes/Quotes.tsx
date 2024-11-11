import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Share, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import getRandomQuote from '@/utils/getRandomQuote';
import Portrait from '@/components/molecules/Portrait/Portrait';
import QuoteTopBar from '@/components/molecules/QuoteTopBar/QuoteTopBar';
import { QuoteKeys, QuoteNames } from '@/types/schemas/quotes';
import { ImageSourcePropType } from 'react-native/Libraries/Image/Image';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';

function Quotes() {
	const { t } = useTranslation(['quotes']);
	const [quoteHistory, setQuoteHistory] = useState<
		Array<{ quote: QuoteKeys; image: ImageSourcePropType; name: QuoteNames }>
	>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const { layout, gutters, fonts, components } = useTheme();
	const translateX = useSharedValue(0);
	// Helper to update the current quote and

	const updateQuoteAndImage = () => {
		const [newQuote, newImage] = getRandomQuote();
		const regex = /quotes\.\d+/g;
		const newName = newQuote.replace(regex, 'name') as QuoteNames;
		// Append the new quote to the history
		setQuoteHistory(prev => [
			...prev,
			{ quote: newQuote, image: newImage, name: newName },
		]);
	};
	// Trigger update when the component first mounts
	useEffect(() => {
		updateQuoteAndImage();
	}, []);
	useEffect(() => {
		setCurrentIndex(quoteHistory.length - 1);
	}, [quoteHistory]);
	// Share function for sharing the quote
	const onShare = async () => {
		const currentQuote = quoteHistory[currentIndex];
		if (!currentQuote) return;

		try {
			const result = await Share.share({
				message: currentQuote
					? `${t(currentQuote.quote)} - ${t(currentQuote.name)}`
					: '',
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
			if (error instanceof Error) {
				Alert.alert(error.message);
			} else {
				Alert.alert('An unexpected error occurred.');
			}
		}
	};

	// Handle swipe right to go forward in history or get a new quote
	const onNext = () => {
		// If we're at the end of the history, fetch a new quote
		if (currentIndex === quoteHistory.length - 1) {
			updateQuoteAndImage();
		} else {
			// Otherwise, just move forward in history
			setCurrentIndex(prevIndex => prevIndex + 1);
		}
	};

	// Handle swipe left to go back in history
	const onPrev = () => {
		if (currentIndex > 0) {
			setCurrentIndex(prevIndex => prevIndex - 1); // Move backward in history
		}
	};

	// Create Pan gesture for detecting swipe
	const panGesture = Gesture.Pan()
		.onUpdate(event => {
			// Update the translation value during the swipe
			translateX.value = event.translationX;
		})
		.onEnd(event => {
			// Detect swipe to the right (backward) or left (forward)
			if (event.translationX > 50) {
				onPrev();
			} else if (event.translationX < -50) {
				onNext();
			}
			translateX.value = withTiming(0, { duration: 300 });
		})
		.activeOffsetX([-10, 10])
		.runOnJS(true);

	// Get the current quote, name, and image from history
	const currentQuote = quoteHistory[currentIndex];
	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value }],
		};
	});

	return (
		<SafeScreen>
			<ScrollView>
				<QuoteTopBar onShare={() => void onShare()} onNext={onNext} />
				<GestureDetector gesture={panGesture}>
					<Animated.View style={[components.mainContainer, animatedStyle]}>
						<View style={[layout.itemsCenter, layout.justifyCenter]}>
							<Text style={components.header}>
								{currentQuote?.name && t(currentQuote.name)}
							</Text>
							<View style={[layout.relative, components.circle250]} />
							<View style={[layout.absolute, gutters.paddingTop_80]}>
								{currentQuote?.image && (
									<Portrait
										height={300}
										width={300}
										image={currentQuote.image}
									/>
								)}
							</View>
						</View>

						<View style={gutters.marginTop_60}>
							<Text
								style={[
									currentQuote?.quote.length < 200
										? fonts.size_24
										: fonts.size_20,
									fonts.gray100,
									gutters.marginBottom_40,
								]}
							>
								{currentQuote?.quote && t(currentQuote.quote)}
							</Text>
						</View>
					</Animated.View>
				</GestureDetector>
			</ScrollView>
		</SafeScreen>
	);
}

export default Quotes;
