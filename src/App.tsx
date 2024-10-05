import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@/theme';
import './translations';
import { AppState } from 'react-native';
import { useEffect } from 'react';
import { syncData } from '@/api/firebase/syncData/syncData';
import ApplicationNavigator from './navigators/Application';

export const queryClient = new QueryClient();

function App() {
	useEffect(() => {
		// Add event listener for AppState changes
		const appStateListener = AppState.addEventListener(
			'change',
			nextAppState => {
				console.log('AppState changed to: ', nextAppState);
				if (nextAppState === 'background' || nextAppState === 'inactive') {
					syncData().catch(error => console.error(error));
				}
			},
		);

		return () => {
			appStateListener.remove();
		};
	}, []);
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<ApplicationNavigator />
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default App;
