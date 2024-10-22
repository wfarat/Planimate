import { Text, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

type Props = {
	pickedDays: boolean[];
	setPickedDays: (days: boolean[]) => void;
};
function DaysPicker({ pickedDays, setPickedDays }: Props) {
	const handleCheckboxPress = (index: number, checked: boolean) => {
		const updatedDays = [...pickedDays];
		updatedDays[index] = checked;
		setPickedDays(updatedDays);
	};
	return (
		<View>
			{pickedDays.map((day, index) => {
				return (
					<View key={index}>
						<BouncyCheckbox
							onPress={(checked: boolean) =>
								handleCheckboxPress(index, checked)
							}
						/>
						<Text>Something</Text>
					</View>
				);
			})}
		</View>
	);
}

export default DaysPicker;
