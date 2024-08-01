import isEmpty from 'lodash/isEmpty';
import React, { useCallback } from 'react';
import {
	StyleSheet,
	Alert,
	View,
	Text,
	TouchableOpacity,
	Button,
} from 'react-native';
import testIDs from '@/screens/Calendar/testIDs';
import alertDelete from '@/helpers/utils/alertDelete';
import type { AgendaItemData } from '@/types/schemas/agendaItemType';
import { hoursAndMinutes } from '@/helpers/utils/formatTime';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
	item: {
		padding: 20,
		backgroundColor: 'white',
		borderBottomWidth: 1,
		borderBottomColor: 'lightgrey',
		flexDirection: 'row',
	},
	itemHourText: {
		color: 'black',
	},

	itemTitleText: {
		color: 'black',
		marginLeft: 16,
		fontWeight: 'bold',
		fontSize: 16,
	},
	itemButtonContainer: {
		flex: 1,
		alignItems: 'flex-end',
	},
	emptyItem: {
		paddingLeft: 20,
		height: 52,
		justifyContent: 'center',
		borderBottomWidth: 1,
		borderBottomColor: 'lightgrey',
	},
	emptyItemText: {
		color: 'lightgrey',
		fontSize: 14,
	},
});

interface ItemProps {
	item: AgendaItemData;
	handleDelete: () => void;
	handleComplete: () => void;
}

function AgendaItem(props: ItemProps) {
	const { item, handleDelete, handleComplete } = props;
	const date = new Date(item.date);
	const buttonPressed = useCallback(() => {
		alertDelete(item.title, handleDelete);
	}, []);
	const itemPressed = useCallback(() => {
		Alert.alert('Coś');
	}, []);
	const startTime = hoursAndMinutes(date);
	const timeInMillis = date.getTime();
	const newTimeInMillis = timeInMillis + item.duration * 60000;
	const newDate = new Date(newTimeInMillis);
	const endTime = hoursAndMinutes(newDate);
	if (isEmpty(item))
		return (
			<View style={styles.emptyItem}>
				<Text style={styles.emptyItemText}>No Events Planned Today</Text>
			</View>
		);

	return (
		<TouchableOpacity
			onPress={itemPressed}
			style={styles.item}
			testID={testIDs.agenda.ITEM}
		>
			<View>
				<Text style={styles.itemHourText}>{startTime}</Text>
				{startTime !== endTime && (
					<Text style={styles.itemHourText}>{endTime}</Text>
				)}
			</View>
			<Text style={styles.itemTitleText}>{item.title}</Text>
			<View style={styles.itemButtonContainer}>
				<Button color="grey" title="X" onPress={buttonPressed} />
			</View>
			<TouchableOpacity
				style={styles.itemButtonContainer}
				onPress={handleComplete}
			>
				<MaterialCommunityIcons name="check" size={20} />
			</TouchableOpacity>
		</TouchableOpacity>
	);
}

export default React.memo(AgendaItem);
