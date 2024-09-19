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

function GenerateTasks({ route, navigation }) {
	const { goal, task } = route.params;
	const storage = useStorage();
	const { components } = useTheme();
	const [generatedTasks, setGeneratedTasks] = useState<GeneratedTask[]>([]);
	const token = storage.getString('token');
	const renderItem = ({ item }: ListRenderItemInfo<GeneratedTask>) => {
		<TouchableOpacity>
			<GeneratedTaskCard generatedTask={item} />
		</TouchableOpacity>;
	};
	return (
		<SafeScreen>
			<View style={components.mainContainer}>
				<FlatList data={generatedTasks} renderItem={} />
			</View>
		</SafeScreen>
	);
}
