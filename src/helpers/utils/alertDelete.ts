import { Alert } from 'react-native';

const alertDelete = (name: string, handleDeleteTask: () => void) => {
	Alert.alert('Confirmation', `Are you sure you want to delete ${name}?`, [
		{
			text: 'Cancel',
			style: 'cancel',
		},
		{ text: 'OK', onPress: () => handleDeleteTask() },
	]);
};

export default alertDelete;
