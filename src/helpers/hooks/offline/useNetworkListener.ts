import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useOfflineActions } from '@/helpers/hooks/offline/useOfflineActions';
import { debounce } from 'lodash';
import useSyncActions from './useSyncActions';

// Custom hook for network listener and debouncing sync
function useNetworkListener() {
	const { mutate } = useSyncActions();
	const { getLocalActions } = useOfflineActions();

	const debouncedSync = debounce(() => {
		const localActions = getLocalActions();
		if (localActions) {
			mutate(localActions); // Trigger mutation
		}
	}, 5000); // 5-second debounce delay

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener(state => {
			if (state.isConnected && debouncedSync) {
				debouncedSync(); // Use the debounced function
			}
		});

		return () => {
			unsubscribe(); // Cleanup listener on component unmount
		};
	}, [debouncedSync]);
}

export default useNetworkListener;
