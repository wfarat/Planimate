import { StackNavigationOptions } from '@react-navigation/stack';
import { Easing } from 'react-native-reanimated';

export const fluentHorizontalTransition: StackNavigationOptions = {
	headerShown: false,
	gestureEnabled: true,
	gestureDirection: 'horizontal',
	transitionSpec: {
		open: {
			animation: 'timing',
			config: {
				duration: 300,
				easing: Easing.inOut(Easing.ease),
			},
		},
		close: {
			animation: 'timing',
			config: {
				duration: 300,
				easing: Easing.inOut(Easing.ease),
			},
		},
	},
	cardStyleInterpolator: ({ current, next, layouts }) => {
		// Slide in the new screen from the right (default)
		const translateX = current.progress.interpolate({
			inputRange: [0, 1],
			outputRange: [layouts.screen.width, 0],
		});

		// Slide out the old screen to the left simultaneously (making the transition fluent)
		const translateXOutgoing = next
			? next.progress.interpolate({
					inputRange: [0, 1],
					outputRange: [0, -layouts.screen.width],
			  })
			: 0;

		return {
			cardStyle: {
				transform: [
					{ translateX }, // New screen sliding in
					{ translateX: translateXOutgoing }, // Old screen sliding out
				],
			},
		};
	},
};
