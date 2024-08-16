import { View, Text } from 'react-native';

import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useState } from 'react';
import { InputDate, InputTime } from '@/components/molecules';
import { RootScreenProps } from '@/types/navigation';
import { useTaskActions } from '@/helpers/hooks/useTaskActions';
import { GreenRoundedButton, TextInputRounded } from '@/components/atoms';
import { useTranslation } from 'react-i18next';

function AddTaskScreen({
	navigation,
	route,
}: RootScreenProps<'AddTaskScreen'>) {
	const { task, goal, tasks } = route.params;
	const { fonts, components } = useTheme();
	const { t } = useTranslation(['goals']);
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
			<View style={components.mainContainer}>
				<Text style={components.header}>{goal.name}</Text>
				<Text style={components.header}>{task?.name}</Text>
				<Text style={components.header}>{t('goals:newTask')}</Text>
				<TextInputRounded value={name} onChangeText={setName} text="taskName" />
				<TextInputRounded
					numberOfLines={2}
					multiline
					value={description}
					onChangeText={setDescription}
					text="taskDescription"
				/>
				<InputDate date={dueDate} setDate={setDueDate} message="endDate" />
				<InputTime setDuration={setDuration} message="duration" />
				<GreenRoundedButton handlePress={handleAddTask} text="addTask" />
			</View>
		</SafeScreen>
	);
}

export default AddTaskScreen;
