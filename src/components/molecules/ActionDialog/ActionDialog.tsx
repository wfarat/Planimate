import { ActivityIndicator } from 'react-native';
import { UseMutationResult } from '@tanstack/react-query';
import { MutationVariables } from '@/types/variables';
import { useStorage } from '@/storage/StorageContext';
import { useEffect } from 'react';
import Dialog from 'react-native-dialog';
import { useNetInfo } from '@react-native-community/netinfo';

export type ActionDialogProps = {
	mutation: () => UseMutationResult<void, Error, MutationVariables>;
	actionName: string;
	data: { id?: string };
	action: () => void;
	name: string;
	visible: boolean;
	onCancel: () => void;
	offlineAction: (data: { id?: string }) => void;
};

function ActionDialog({
	mutation,
	actionName,
	data,
	action,
	name,
	visible,
	onCancel,
	offlineAction,
}: ActionDialogProps) {
	const { mutate, isSuccess, isPending } = mutation();
	const storage = useStorage();
	const { isConnected } = useNetInfo();
	useEffect(() => {
		if (isSuccess) action();
	}, [isSuccess]);
	const handlePress = () => {
		const token = storage.getString('token');
		if (token && data.id && isConnected) {
			mutate({ id: data.id, token });
		} else {
			action();
			offlineAction(data);
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
