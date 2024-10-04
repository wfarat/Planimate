import { ActivityIndicator } from 'react-native';
import { UseMutationResult } from '@tanstack/react-query';
import { MutationVariables } from '@/types/variables';
import { storage } from '@/storage/storage';
import { useEffect } from 'react';
import Dialog from 'react-native-dialog';
import { useNetInfo } from '@react-native-community/netinfo';

export type ActionDialogProps = {
	actionName: string;
	action: () => void;
	name: string;
	visible: boolean;
	onCancel: () => void;
};

function ActionDialog({
	actionName,
	action,
	name,
	visible,
	onCancel,
}: ActionDialogProps) {
	const handlePress = () => {
		action();
	};

	return (
		<Dialog.Container visible={visible}>
			<Dialog.Title>Confirmation</Dialog.Title>
			<Dialog.Description>{`Are you sure you want to ${actionName} ${name}`}</Dialog.Description>
			<Dialog.Button label="Cancel" onPress={onCancel} />
			<Dialog.Button label="OK" onPress={handlePress} />
		</Dialog.Container>
	);
}

export default ActionDialog;
