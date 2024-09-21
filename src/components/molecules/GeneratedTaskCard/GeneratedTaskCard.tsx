import { GeneratedTask } from '@/types/schemas';
import { useTheme } from '@/theme';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

type Props = {
	generatedTask: GeneratedTask;
};
function GeneratedTaskCard({ generatedTask }: Props) {
	const { name, description, dueDate, divisible, duration } = generatedTask;
	const { gutters, borders, layout, fonts } = useTheme();
	const { t } = useTranslation(['goals']);
	return (
		<View
			style={[
				gutters.marginBottom_16,
				borders.gray400,
				borders.w_1,
				layout.fullWidth,
				borders.rounded_4,
				gutters.padding_16,
			]}
		>
			<Text style={[fonts.gray200, fonts.bold, fonts.size_16]}>{name}</Text>
			<Text style={fonts.gray200}>{description}</Text>
			<View style={[layout.row, layout.justifyBetween]}>
				{dueDate && (
					<Text>
						{t('goals:endDate')} {new Date(dueDate).toLocaleDateString()}
					</Text>
				)}
				{duration && (
					<Text>
						{t('goals:duration')} {duration} min
					</Text>
				)}
			</View>
			{divisible && <Text>{t('goals:divisible')}</Text>}
		</View>
	);
}

export default GeneratedTaskCard;
