import { GeneratedTask } from '@/types/schemas';
import { useTheme } from '@/theme';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

type Props = {
	generatedTask: GeneratedTask;
	picked: boolean;
};
function GeneratedTaskCard({ generatedTask, picked = false }: Props) {
	const { name, description, dueDate, divisible, duration, repeats } =
		generatedTask;
	const { gutters, borders, layout, fonts, backgrounds } = useTheme();
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
				picked ? backgrounds.green400 : backgrounds.purple100,
			]}
		>
			<Text style={[fonts.gray200, fonts.bold, fonts.size_16]}>{name}</Text>
			<Text style={fonts.gray200}>{description}</Text>
			<View style={[layout.row, layout.justifyBetween]}>
				{dueDate && (
					<Text style={fonts.gray200}>
						{t('goals:endDate')} {new Date(dueDate).toLocaleDateString()}
					</Text>
				)}
				{duration && (
					<Text style={fonts.gray200}>
						{t('goals:duration')} {duration} min
					</Text>
				)}
			</View>
			{repeats && (
				<Text style={fonts.gray200}>
					{t('goals:repeats')} {repeats}
				</Text>
			)}
			{divisible && (
				<Text style={picked ? fonts.blue100 : fonts.green400}>
					{t('goals:divisible')}
				</Text>
			)}
		</View>
	);
}

export default GeneratedTaskCard;
