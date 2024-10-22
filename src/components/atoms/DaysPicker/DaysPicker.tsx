import { Text, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useTheme } from '@/theme';
import { useTranslation } from 'react-i18next';

type Props = {
	pickedDays: boolean[];
	setPickedDays: (days: boolean[]) => void;
};
function DaysPicker({ pickedDays, setPickedDays }: Props) {
	const { layout, fonts } = useTheme();
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
				layout.justifyCenter,
				layout.itemsCenter,
			]}
		>
			{pickedDays.map((day, index) => {
				const days = ['mon, tue, wed, thu, fri, sat, sun'];
				const dayString = days[index] as
					| 'mon'
					| 'tue'
					| 'wed'
					| 'thu'
					| 'fri'
					| 'sat'
					| 'sun';
				return (
					<View key={index}>
						<BouncyCheckbox
							onPress={(checked: boolean) =>
								handleCheckboxPress(index, checked)
							}
						/>
						<Text style={fonts.gray400}>
							{t(`common:daysShort.${dayString}`)}
						</Text>
					</View>
				);
			})}
		</View>
	);
}

export default DaysPicker;
