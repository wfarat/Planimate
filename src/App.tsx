import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@/theme';
import { StorageProvider, useStorage } from '@/storage/StorageContext';
import ApplicationNavigator from './navigators/Application';
import './translations';
import TimestampProvider from '@/timestamp/TimestampContext';

export const queryClient = new QueryClient();

function App() {
	const storage = useStorage();
	const token = storage.getString('token');
	return (
		<QueryClientProvider client={queryClient}>
			<StorageProvider>
				<ThemeProvider>
					<TimestampProvider token={token}>
						<ApplicationNavigator />
					</TimestampProvider>
				</ThemeProvider>
			</StorageProvider>
		</QueryClientProvider>
	);
}

export default App;
