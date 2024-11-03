import Dialog from 'react-native-dialog';
import { useState } from 'react';
import { DaysPicker } from '@/components/atoms';
import { Task } from '@/types/schemas';
import { useTaskActions } from '@/hooks/tasks/useTaskActions';

type PickDaysDialogProps = {
	task: Task;
	onCancel: () => void;
	visible: boolean;
	oldDays?: boolean[];
};

function PickDaysDialog({
	task,
	onCancel,
	visible,
	oldDays = [],
}: PickDaysDialogProps) {
	const [pickedDays, setPickedDays] = useState(oldDays);
	const { editTask } = useTaskActions(task.goalId, task.parentId, task.taskId);
	const handleEdit = () => {
		editTask({ ...task, repeatDays: pickedDays });
	};

	return (
		<Dialog.Container visible={visible}>
			<DaysPicker pickedDays={pickedDays} setPickedDays={setPickedDays} />
			<Dialog.Button label="Cancel" onPress={onCancel} />
			<Dialog.Button label="Edit" onPress={handleEdit} />
		</Dialog.Container>
	);
}

export default PickDaysDialog;
