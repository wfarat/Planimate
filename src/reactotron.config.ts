import Reactotron, { ReactotronReactNative } from 'reactotron-react-native';
import {
	QueryClientManager,
	reactotronReactQuery,
} from 'reactotron-react-query';

import { queryClient } from './App';
import config from '../app.json';

const queryClientManager = new QueryClientManager({
	queryClient,
});
Reactotron.configure({
	name: config.name,
	onDisconnect: () => {
		queryClientManager.unsubscribe();
	},
})
	.useReactNative()
	.use(reactotronReactQuery(queryClientManager))
	.connect();
