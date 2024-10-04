import Dialog from 'react-native-dialog';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { editGoal, editTask } from '@/api';
import { storage } from '@/storage/storage';
import { Goal, Task } from '@/types/schemas';
import { ActivityIndicator, View } from 'react-native';
import { useOfflineActions } from '@/hooks/useOfflineActions';
import { useNetInfo } from '@react-native-community/netinfo';

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
	const { isConnected } = useNetInfo();
	const { addAction } = useOfflineActions();
	const token = storage.getString('token');
	const { isSuccess, isPending } = isTask(item) ? taskMutation : goalMutation;
	useEffect(() => {
		if (isSuccess) onEdit(name, description);
	}, [isSuccess]);
	const addOfflineAction = (newItem: Task | Goal) => {
		if (isTask(newItem)) {
			addAction('task', {
				type: 'update',
				task: newItem as Task,
			});
		} else {
			addAction('goal', {
				type: 'update',
				goal: newItem as Goal,
			});
		}
	};
	const handleEdit = () => {
		const newItem = {
			...item,
			name,
			description,
			updatedAt: new Date().toISOString(),
		};
		if (token && isConnected) {
			if (isTask(item)) {
				taskMutation.mutate({
					task: newItem as Task,
					token,
				});
			} else {
				goalMutation.mutate({
					goal: newItem as Goal,
					token,
				});
			}
		} else {
			addOfflineAction(newItem);
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
