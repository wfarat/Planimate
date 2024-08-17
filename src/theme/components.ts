import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import type { ComponentTheme } from '@/types/theme/theme';

interface AllStyle
	extends Record<string, AllStyle | ImageStyle | TextStyle | ViewStyle> {}

export default ({
	layout,
	backgrounds,
	fonts,
	borders,
	gutters,
}: ComponentTheme) => {
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
			...fonts.gray200,
			...fonts.bold,
			...borders.gray400,
			...borders.w_1,
			...borders.rounded_16,
			...gutters.marginBottom_16,
			...layout.fullWidth,
			...gutters.padding_16,
		},
		buttonRoundedGreen: {
			...backgrounds.green500,
			...layout.row,
			...layout.fullWidth,
			...layout.itemsCenter,
			...layout.justifyCenter,
			...borders.w_1,
			...borders.rounded_8,
			...gutters.padding_12,
			...gutters.margin_16,
		},
		errorText: {
			...fonts.size_16,
			...fonts.red500,
			...gutters.margin_12,
		},
		mainContainer: {
			...layout.justifyCenter,
			...layout.itemsCenter,
			...layout.fullWidth,
			...gutters.marginTop_80,
			...gutters.padding_32,
		},
		header: {
			...fonts.size_24,
			...fonts.gray200,
			...gutters.marginBottom_12,
		},
		section: {
			...fonts.size_16,
			...fonts.gray200,
			...backgrounds.purple100,
		},
	} as const satisfies AllStyle;
};
