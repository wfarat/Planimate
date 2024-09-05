import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@/theme';
import { StorageProvider } from '@/storage/StorageContext';
import ApplicationNavigator from './navigators/Application';
import './translations';
import useNetworkListener from '@/helpers/hooks/offline/useNetworkListener';

export const queryClient = new QueryClient();

function App() {
	useNetworkListener();
	return (
		<QueryClientProvider client={queryClient}>
			<StorageProvider>
				<ThemeProvider>
					<ApplicationNavigator />
				</ThemeProvider>
			</StorageProvider>
		</QueryClientProvider>
	);
}

export default App;
