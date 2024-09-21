import { useStorage } from '@/storage/StorageContext';
import { useEffect, useState } from 'react';
import { GeneratedTask } from '@/types/schemas';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import {
	ActivityIndicator,
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
	navigation,
	route,
}: RootScreenProps<'GenerateTasks'>) {
	const { goal, task } = route.params;
	const storage = useStorage();
	const { components } = useTheme();
	const [generatedTasks, setGeneratedTasks] = useState<GeneratedTask[]>([]);
	const { mutate, isPending, isSuccess, data } = generateTasks();
	const token = storage.getString('token');
	useEffect(() => {
		if (data) setGeneratedTasks(data);
	}, [isSuccess]);
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
	const handleSave = () => {
		// save logic here
		navigation.goBack();
	};
	return (
		<SafeScreen>
			<View style={components.mainContainer}>
				{isPending ? (
					<ActivityIndicator />
				) : (
					<GreenRoundedButton
						handlePress={handleGenerate}
						text="generateTasks"
					/>
				)}
				<FlatList
					data={generatedTasks}
					renderItem={renderItem}
					keyExtractor={(item, index) => index.toString()}
				/>
				{isSuccess && (
					<GreenRoundedButton handlePress={handleSave} text="saveTasks" />
				)}
			</View>
		</SafeScreen>
	);
}

export default GenerateTasks;
