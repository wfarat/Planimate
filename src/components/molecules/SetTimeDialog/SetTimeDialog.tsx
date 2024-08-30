import Dialog from 'react-native-dialog';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputTime from '@/components/molecules/InputTime/InputTime';
import { getMinutesAfterMidnight } from '@/helpers/utils/formatTime';
import { editAgendaItem } from '@/controllers/agenda';
import { useStorage } from '@/storage/StorageContext';
import agendaItemType, { AgendaItemData } from '@/types/schemas/agendaItemType';
import { useAgendaItems } from '@/helpers/hooks/useAgendaItems';
import { ActivityIndicator, View } from 'react-native';

type EditDialogProps = {
	updateState: (newDuration: number, newDate?: Date) => void;
	onCancel: () => void;
	visible: boolean;
	agendaItem: AgendaItemData;
};
function SetTimeDialog({
	updateState,
	onCancel,
	visible,
	agendaItem,
}: EditDialogProps) {
	const { t } = useTranslation(['common']);
	const storage = useStorage();
	const [time, setTime] = useState(agendaItem.time);
	const [duration, setDuration] = useState(agendaItem.duration);
	const { updateAgendaItem, replaceAgendaItem, updateItems } = useAgendaItems();
	const { data, isSuccess, isPending, mutate } = editAgendaItem();
	const token = storage.getString('token');
	useEffect(() => {
		if (isSuccess) saveEditedItems(data);
	}, [isSuccess]);
	const saveEditedItems = (newItem: agendaItemType) => {
		const editedItems = replaceAgendaItem(newItem);
		updateItems(editedItems);
		updateState(duration, time);
	};
	const handleEdit = () => {
		const newItem = updateAgendaItem({ ...agendaItem, time, duration });
		if (token) {
			mutate({ agendaItem: newItem, token });
		} else {
			saveEditedItems(newItem);
		}
	};

	return (
		<Dialog.Container visible={visible}>
			<Dialog.Title>{t('common:edit.editTime')}</Dialog.Title>
			<InputTime time={time} setTime={setTime} message="time" />
			<InputTime
				setDuration={setDuration}
				time={getMinutesAfterMidnight(duration)}
				message="duration"
			/>
			{isPending ? (
				<ActivityIndicator />
			) : (
				<View>
					<Dialog.Button label="Cancel" onPress={onCancel} />
					<Dialog.Button label="Edit" onPress={handleEdit} />
				</View>
			)}
		</Dialog.Container>
	);
}

export default SetTimeDialog;
