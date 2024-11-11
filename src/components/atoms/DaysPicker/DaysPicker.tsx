import { Text, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useTheme } from '@/theme';
import { useTranslation } from 'react-i18next';
import { dayString } from '@/utils/dayString';

type Props = {
	pickedDays: boolean[];
	setPickedDays: (days: boolean[]) => void;
};
function DaysPicker({ pickedDays, setPickedDays }: Props) {
	const { layout, fonts, gutters } = useTheme();
	const { t } = useTranslation(['common']);
	const handleCheckboxPress = (index: number, checked: boolean) => {
		const updatedDays = [...pickedDays];
		updatedDays[index] = checked;
		setPickedDays(updatedDays);
	};
	return (
		<View
			style={[
				layout.row,
				layout.wrap,
				gutters.marginBottom_12,
				layout.justifyCenter,
				layout.itemsCenter,
			]}
		>
			{pickedDays.map((day, index) => {
				return (
					<View key={index}>
						<BouncyCheckbox
							onPress={(checked: boolean) =>
								handleCheckboxPress(index, checked)
							}
							isChecked={day}
						/>
						<Text style={fonts.gray400}>
							{t(`common:daysShort.${dayString(index)}`)}
						</Text>
					</View>
				);
			})}
		</View>
	);
}

export default DaysPicker;
