import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@/theme';
import { StorageProvider } from '@/storage/StorageContext';
import ApplicationNavigator from './navigators/Application';
import './translations';
import { NetworkListenerProvider } from '@/network/NetworkListenerProvider';

export const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<StorageProvider>
				<NetworkListenerProvider>
					<ThemeProvider>
						<ApplicationNavigator />
					</ThemeProvider>
				</NetworkListenerProvider>
			</StorageProvider>
		</QueryClientProvider>
	);
}

export default App;
