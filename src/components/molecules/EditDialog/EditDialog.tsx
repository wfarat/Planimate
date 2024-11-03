import Dialog from 'react-native-dialog';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

type EditDialogProps = {
	onEdit: (name: string, description: string) => void;
	onCancel: () => void;
	visible: boolean;
	itemName: string;
};

function EditDialog({ onEdit, onCancel, visible, itemName }: EditDialogProps) {
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const { t } = useTranslation(['common']);

	const handleEdit = () => {
		onEdit(name, description);
	};

	return (
		<Dialog.Container visible={visible}>
			<Dialog.Title>
				{t('common:edit.edit')} {itemName}
			</Dialog.Title>
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
			<Dialog.Button label="Cancel" onPress={onCancel} />
			<Dialog.Button label="Edit" onPress={handleEdit} />
		</Dialog.Container>
	);
}

export default EditDialog;
