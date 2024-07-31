import { View, TextInput, Text } from 'react-native';

import { useTranslation } from 'react-i18next';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useState } from 'react';
import { InputDate, InputDuration, SendButton } from '@/components/molecules';
import { RootScreenProps } from '@/types/navigation';
import { useTaskActions } from '@/helpers/hooks/useTaskActions';

function AddTaskScreen({
	navigation,
	route,
}: RootScreenProps<'AddTaskScreen'>) {
	const { task, goal, tasks } = route.params;
	const { t } = useTranslation(['goals']);
	const { layout, fonts, gutters, components } = useTheme();
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [dueDate, setDueDate] = useState<Date>();
	const [duration, setDuration] = useState<number>();
	const { addTask } = useTaskActions(goal.id, task?.taskId, task?.id);
	const handleAddTask = () => {
		addTask(tasks, name, description, duration, dueDate);
		navigation.goBack();
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
				<View style={[gutters.paddingHorizontal_32, layout.itemsCenter]}>
					<Text style={[fonts.size_24, fonts.gray200]}>{goal.name}</Text>
					<Text style={[fonts.size_24, fonts.gray200]}>{task?.name}</Text>
					<View>
						<TextInput
							style={components.textInputRounded}
							value={name}
							onChangeText={setName}
							placeholder={t('goals:taskName')}
						/>
						<TextInput
							style={components.textInputRounded}
							numberOfLines={2}
							multiline
							value={description}
							onChangeText={setDescription}
							placeholder={t('goals:taskDescription')}
						/>
						<InputDate dueDate={dueDate} setDueDate={setDueDate} />
						<InputDuration duration={duration} setDuration={setDuration} />
					</View>
					<SendButton handlePress={() => handleAddTask()} />
				</View>
			</View>
		</SafeScreen>
	);
}

export default AddTaskScreen;
