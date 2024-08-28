import Dialog from 'react-native-dialog';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { editGoal, editTask } from '@/controllers/goals';
import { useStorage } from '@/storage/StorageContext';
import { Goal, Task } from '@/types/schemas';
import { ActivityIndicator, View } from 'react-native';

type EditDialogProps = {
	onEdit: (name: string, description: string) => void;
	onCancel: () => void;
	visible: boolean;
	item: Task | Goal;
};
function isTask(item: Task | Goal) {
	return typeof item === 'object' && item !== null && 'taskId' in item;
}
function EditDialog({ onEdit, onCancel, visible, item }: EditDialogProps) {
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const { t } = useTranslation(['common']);
	const taskMutation = editTask();
	const goalMutation = editGoal();
	const storage = useStorage();
	const token = storage.getString('token');
	const { isSuccess, isPending } = isTask(item) ? taskMutation : goalMutation;
	useEffect(() => {
		if (isSuccess) onEdit(name, description);
	}, [isSuccess]);
	const handleEdit = () => {
		if (token) {
			if (isTask(item)) {
				taskMutation.mutate({
					task: { ...(item as Task), name, description },
					token,
				});
			} else {
				goalMutation.mutate({
					goal: { ...(item as Goal), name, description },
					token,
				});
			}
		} else {
			onEdit(name, description);
		}
	};

	return (
		<Dialog.Container visible={visible}>
			<Dialog.Title>
				{t('common:edit.edit')} {item.name}
			</Dialog.Title>
			{isPending ? (
				<ActivityIndicator size="large" />
			) : (
				<View>
					<Dialog.Input
						placeholder={t('common:edit.name')}
						value={name}
						onChangeText={setName}
					/>
					<Dialog.Input
						placeholder={t('common:edit.description')}
						value={description}
						onChangeText={setDescription}
					/>
				</View>
			)}
			<Dialog.Button label="Cancel" onPress={onCancel} />
			<Dialog.Button label="Edit" onPress={handleEdit} />
		</Dialog.Container>
	);
}

export default EditDialog;
