import { Text, View, TextInput } from 'react-native';

import { useTranslation } from 'react-i18next';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useEffect, useState } from 'react';
import TasksList from '@/screens/Tasks/TasksList';
import { RootScreenProps } from '@/types/navigation';
import { useStorage } from '@/storage/StorageContext';

function Tasks({ route, navigation }: RootScreenProps<'Tasks'>) {
	const { t } = useTranslation(['goals']);
	const { goal, task } = route.params;
	const storage = useStorage();
	const { layout, fonts, gutters, components } = useTheme();
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	useEffect(() => {
		storage.set('tasks.state', JSON.stringify({ name, description }));
	}, [name, description]);
	const clean = () => {
		setDescription('');
		setName('');
	};
	return (
		<SafeScreen>
			<View
				style={[
					layout.justifyCenter,
					layout.itemsCenter,
					gutters.marginTop_120,
				]}
			>
				<Text style={fonts.size_24}>{goal.name}</Text>
				{task && <Text style={fonts.size_24}>{task.name}</Text>}
				<View style={[gutters.paddingHorizontal_32]}>
					<View>
						<TextInput
							style={components.textInputRounded}
							value={name}
							onChangeText={setName}
							placeholder={t('goals:title')}
						/>
						<TextInput
							style={components.textInputRounded}
							multiline
							value={description}
							onChangeText={setDescription}
							placeholder={t('goals:description')}
						/>
					</View>
					<TasksList clean={clean} navigation={navigation} route={route} />
				</View>
			</View>
		</SafeScreen>
	);
}

export default Tasks;
