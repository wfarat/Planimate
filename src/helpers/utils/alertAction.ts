import { Alert } from 'react-native';

const alertAction = (
	action: string,
	name: string,
	handleAction: () => void,
) => {
	Alert.alert('Confirmation', `Are you sure you want to ${action} ${name}?`, [
		{
			text: 'Cancel',
			style: 'cancel',
		},
		{ text: 'OK', onPress: handleAction },
	]);
};

export default alertAction;
