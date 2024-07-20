import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import type { ComponentTheme } from '@/types/theme/theme';

interface AllStyle
	extends Record<string, AllStyle | ImageStyle | TextStyle | ViewStyle> {}

export default ({ layout, backgrounds, fonts, borders, gutters }: ComponentTheme) => {
	return {
		buttonCircle: {
			...layout.justifyCenter,
			...layout.itemsCenter,
			...backgrounds.purple100,
			...fonts.gray400,
			height: 70,
			width: 70,
			borderRadius: 35,
		},
		circle250: {
			borderRadius: 140,
			height: 250,
			width: 250,
		},
		textInputRounded: {
			...fonts.size_16,
			...fonts.gray400,
			...fonts.bold,
			...borders.gray400,
			...borders.w_1,
			...borders.rounded_16,
			...gutters.marginBottom_16,
		},
	} as const satisfies AllStyle;
};
