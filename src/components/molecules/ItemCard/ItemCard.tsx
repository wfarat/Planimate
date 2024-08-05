import { Text, View } from 'react-native';
import { useTheme } from '@/theme';
import type ItemCardProps from '@/types/props/itemCardProps';
import * as Progress from 'react-native-progress';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';
import { daysBetween } from '@/helpers/utils/formatTime';

function ItemCard({
	name,
	description,
	completed,
	dueDate,
	duration,
}: ItemCardProps) {
	const { layout, gutters, borders, fonts, backgrounds } = useTheme();
	const { t } = useTranslation(['goals']);
	return (
		<View
			style={[
				gutters.marginBottom_16,
				borders.gray400,
				borders.w_1,
				layout.fullWidth,
				borders.rounded_4,
				completed ? backgrounds.green400 : backgrounds.purple100,
			]}
		>
			<View style={gutters.marginLeft_16}>
				<Text style={[fonts.gray200, fonts.bold, fonts.size_16]}>{name}</Text>
				<Text style={[fonts.gray200]}>{description}</Text>
				{dueDate && (
					<Text style={fonts.gray200}>
						{t('goals:endDate')} {new Date(dueDate).toLocaleDateString()},{' '}
						{t('goals:daysLeft')} {daysBetween(new Date(dueDate))}
					</Text>
				)}
			</View>
			{!isEmpty(duration) && (
				<View style={[layout.absolute, layout.top0, layout.right0]}>
					<Progress.Pie
						progress={(duration.base - duration.remaining) / duration.base}
					/>
				</View>
			)}
		</View>
	);
}

export default ItemCard;
