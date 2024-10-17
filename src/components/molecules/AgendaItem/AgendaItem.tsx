import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import testIDs from '@/screens/Calendar/testIDs';
import type { AgendaItemData } from '@/types/schemas/agendaItemType';
import { hoursAndMinutes } from '@/utils/formatTime';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@/theme';
import { SetTimeDialog, ActionDialog } from '@/components/molecules';
import { useTranslation } from 'react-i18next';

interface ItemProps {
	item: AgendaItemData;
	onDelete: () => void;
	onComplete: () => void;
}

function AgendaItem(props: ItemProps) {
	const { item, onDelete, onComplete } = props;
	const { backgrounds, fonts, layout, gutters, borders } = useTheme();
	const { t } = useTranslation(['common']);
	const [duration, setDuration] = useState(item.duration);
	const [visible, setVisible] = useState([false, false]);
	const [date, setDate] = useState<Date | undefined>(
		item.time ? new Date(item.time) : undefined,
	);

	const [showDialog, setShowDialog] = useState(false);
	const itemPressed = useCallback(() => {
		setShowDialog(true);
	}, []);
	const changeTime = (newDuration: number, newDate?: Date) => {
		setDate(newDate);
		setDuration(newDuration);
		setShowDialog(false);
	};

	const handleSetVisible = (index: number) => {
		setVisible(prevVisible =>
			prevVisible.map((current, i) => (i === index ? !current : current)),
		);
	};
	const handleCancel = (index: number) => {
		handleSetVisible(index);
	};
	const handleDelete = () => {
		onDelete();
		handleSetVisible(1);
	};
	const handleComplete = () => {
		onComplete();
		handleSetVisible(0);
	};
	const actionDialogConfig = [
		{
			props: {
				visible: visible[0],
				onCancel: () => handleCancel(0),
				actionName: 'complete',
				action: handleComplete,
			},
		},
		{
			props: {
				visible: visible[1],
				onCancel: () => handleCancel(1),
				actionName: 'delete',
				action: handleDelete,
			},
		},
	];
	const renderTime = () => {
		if (date) {
			const startTime = hoursAndMinutes(date);
			const timeInMillis = date.getTime();
			const newTimeInMillis = timeInMillis + duration * 60000;
			const newDate = new Date(newTimeInMillis);
			const endTime = hoursAndMinutes(newDate);
			return (
				<View style={layout.justifyAround}>
					<Text style={fonts.gray400}>{startTime}</Text>
					{startTime !== endTime && (
						<Text style={fonts.gray400}>{endTime}</Text>
					)}
				</View>
			);
		}
		const hours = Math.floor(duration / 60);
		const minutes = duration % 60;
		return (
			<Text style={fonts.gray200}>
				{hours}
				{t('common:abr.hour')} {minutes}
				{t('common:abr.min')}
			</Text>
		);
	};

	return (
		<View style={layout.fullWidth}>
			{actionDialogConfig.map((config, index) => (
				<ActionDialog
					key={`item-${item.id}-action-${index}`}
					name={item.title}
					{...config.props}
				/>
			))}
			<SetTimeDialog
				updateState={changeTime}
				onCancel={() => setShowDialog(false)}
				visible={showDialog}
				agendaItem={item}
			/>
			<TouchableOpacity
				onPress={itemPressed}
				style={[
					layout.row,
					gutters.padding_12,
					borders.gray100,
					borders.w_1,
					item.completed ? backgrounds.green400 : backgrounds.purple100,
				]}
				testID={testIDs.agenda.ITEM}
			>
				{renderTime()}
				<Text
					style={[
						fonts.gray200,
						fonts.size_16,
						fonts.bold,
						gutters.marginLeft_16,
						layout.flex_4,
					]}
				>
					{item.title}
				</Text>
				<View style={[layout.flex_1, layout.itemsEnd, layout.justifyAround]}>
					{!item.completed && (
						<TouchableOpacity onPress={() => handleSetVisible(0)}>
							<MaterialCommunityIcons name="check" size={24} color="green" />
						</TouchableOpacity>
					)}
					<TouchableOpacity onPress={() => handleSetVisible(1)}>
						<MaterialCommunityIcons color="red" name="delete" size={24} />
					</TouchableOpacity>
				</View>
			</TouchableOpacity>
		</View>
	);
}

export default React.memo(AgendaItem);
