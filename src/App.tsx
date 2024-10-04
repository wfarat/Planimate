import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@/theme';
import { NetworkListenerProvider } from '@/network/NetworkListenerProvider';
import ApplicationNavigator from './navigators/Application';
import './translations';

export const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<NetworkListenerProvider>
				<ThemeProvider>
					<ApplicationNavigator />
				</ThemeProvider>
			</NetworkListenerProvider>
		</QueryClientProvider>
	);
}

export default App;
