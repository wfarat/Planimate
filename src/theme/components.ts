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
		circle250: {
			borderRadius: 140,
			height: 250,
			width: 250,
		},
		textInputRounded: {
			...fonts.size_16,
			...fonts.gray100,
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
			...layout.itemsCenter,
			...layout.justifyCenter,
			...layout.fullWidth,
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
			...gutters.marginTop_60,
			...gutters.padding_32,
		},
		header: {
			...fonts.size_24,
			...fonts.gray100,
			...gutters.marginBottom_12,
		},
		section: {
			...fonts.size_16,
			...fonts.gray100,
			...backgrounds.purple100,
		},
		bottomButtonContainer: {
			...layout.absolute,
			...layout.bottom0,
			...layout.itemsCenter,
			...layout.fullWidth,
			...gutters.paddingRight_32,
			...gutters.paddingLeft_32,
			...backgrounds.purple100,
		},
		dayIcon: {
			...borders.rounded_8,
			...backgrounds.orange100,
			...gutters.padding_8,
			...gutters.marginRight_4,
			...borders.w_1,
		},
	} as const satisfies AllStyle;
};
