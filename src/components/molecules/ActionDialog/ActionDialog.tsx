import { ActivityIndicator } from 'react-native';
import { UseMutationResult } from '@tanstack/react-query';
import { MutationVariables } from '@/types/schemas/task';
import { useStorage } from '@/storage/StorageContext';
import { useEffect } from 'react';
import Dialog from 'react-native-dialog';

type Props = {
	mutation: () => UseMutationResult<void, Error, MutationVariables>;
	actionName: string;
	id?: string;
	action: () => void;
	name: string;
	visible: boolean;
	onCancel: () => void;
};
function ActionDialog({
	mutation,
	actionName,
	id = undefined,
	action,
	name,
	visible,
	onCancel,
}: Props) {
	const { mutate, isSuccess, isPending } = mutation();
	const storage = useStorage();
	useEffect(() => {
		if (isSuccess) action();
	}, [isSuccess]);
	const handlePress = () => {
		const token = storage.getString('token');
		if (token && id) {
			mutate({ id, token });
		} else {
			action();
		}
	};

	return (
		<Dialog.Container visible={visible}>
			<Dialog.Title>Confirmation</Dialog.Title>
			<Dialog.Description>{`Are you sure you want to ${actionName} ${name}`}</Dialog.Description>
			{isPending && <ActivityIndicator size="large" />}
			<Dialog.Button label="Cancel" onPress={onCancel} />
			<Dialog.Button label="OK" onPress={handlePress} />
		</Dialog.Container>
	);
}

export default ActionDialog;
