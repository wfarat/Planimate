import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { CommonActions } from '@react-navigation/native';

import { useTheme } from '@/theme';
import { SafeScreen } from '@/components/template';

import type { RootScreenProps } from '@/types/navigation';

function Startup({ navigation }: RootScreenProps<'Startup'>) {
	const { layout, gutters } = useTheme();

	const { isSuccess, isFetching } = useQuery({
		queryKey: ['startup'],
		queryFn: () => {
			return Promise.resolve(true);
		},
	});

	useEffect(() => {
		if (isSuccess) {
			navigation.dispatch(
				CommonActions.reset({
					index: 0,
					routes: [{ name: 'Main' }],
				}),
			);
		}
	}, [isSuccess]);

	return (
		<SafeScreen>
			<View
				style={[
					layout.flex_1,
					layout.col,
					layout.itemsCenter,
					layout.justifyCenter,
				]}
			>
				{isFetching && (
					<ActivityIndicator size="large" style={[gutters.marginVertical_24]} />
				)}
			</View>
		</SafeScreen>
	);
}

export default Startup;
