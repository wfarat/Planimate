import Dialog from 'react-native-dialog';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputTime from '@/components/molecules/InputTime/InputTime';
import { getMinutesAfterMidnight } from '@/helpers/utils/formatTime';

type EditDialogProps = {
	onEdit: (newDate: Date, newDuration: number) => void;
	onCancel: () => void;
	visible: boolean;
	oldDate: Date;
	oldDuration: number;
};
function SetTimeDialog({
	onEdit,
	onCancel,
	visible,
	oldDate,
	oldDuration,
}: EditDialogProps) {
	const { t } = useTranslation(['common']);
	const [date, setDate] = useState(oldDate);
	const [duration, setDuration] = useState(oldDuration);
	const handleEdit = () => {
		onEdit(date, duration);
	};

	return (
		<Dialog.Container visible={visible}>
			<Dialog.Title>{t('common:edit.editTime')}</Dialog.Title>
			<InputTime time={date} setTime={setDate} message="time" />
			<InputTime
				setDuration={setDuration}
				time={getMinutesAfterMidnight(duration)}
				message="duration"
			/>
			<Dialog.Button label="Cancel" onPress={onCancel} />
			<Dialog.Button label="Edit" onPress={handleEdit} />
		</Dialog.Container>
	);
}

export default SetTimeDialog;
