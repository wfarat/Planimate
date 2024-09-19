import { useStorage } from '@/storage/StorageContext';
import { useState } from 'react';
import { GeneratedTask } from '@/types/schemas';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import {
	FlatList,
	ListRenderItemInfo,
	TouchableOpacity,
	View,
} from 'react-native';
import { GeneratedTaskCard } from '@/components/molecules';
import { GreenRoundedButton } from '@/components/atoms';
import { generateTasks } from '@/api';
import { RootScreenProps } from '@/types/navigation';

function GenerateTasks({
	route,
	navigation,
}): RootScreenProps<'GenerateTasks'> {
	const { goal, task } = route.params;
	const storage = useStorage();
	const { components } = useTheme();
	const [generatedTasks, setGeneratedTasks] = useState<GeneratedTask[]>([]);
	const { mutate, isPending, isSuccess, data } = generateTasks();
	const token = storage.getString('token');
	const renderItem = ({ item }: ListRenderItemInfo<GeneratedTask>) => {
		return (
			<TouchableOpacity>
				<GeneratedTaskCard generatedTask={item} />
			</TouchableOpacity>
		);
	};
	const handleGenerate = () => {
		if (token) mutate({ goal, task, token });
	};
	return (
		<SafeScreen>
			<View style={components.mainContainer}>
				<GreenRoundedButton handlePress={} text={} />
				<FlatList
					data={generatedTasks}
					renderItem={renderItem}
					keyExtractor={(item, index) => index.toString()}
				/>
			</View>
		</SafeScreen>
	);
}

export default GenerateTasks;
