import { useEffect, useCallback } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useOfflineActions } from '@/helpers/hooks/offline/useOfflineActions';
import { debounce } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { useStorage } from '@/storage/StorageContext';
import useSyncActions from './useSyncActions';

// Custom hook for network listener and debouncing sync
function useNetworkListener() {
	const { mutate } = useSyncActions();
	const { getLocalActions } = useOfflineActions();
	const storage = useStorage();
	// Memoize the debounced function using useCallback to ensure it remains stable between renders
	const debouncedSync = useCallback(
		debounce(() => {
			const actions = getLocalActions();
			const token = storage.getString('token');
			if (
				!isEmpty(actions) &&
				token &&
				(!isEmpty(actions?.agenda) ||
					!isEmpty(actions?.goal) ||
					!isEmpty(actions?.task))
			) {
				mutate({ token, actions }); // Trigger mutation
			}
		}, 5000),
		[getLocalActions, mutate], // Dependencies for debounce
	);

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener(state => {
			if (state.isConnected) {
				debouncedSync(); // Use the debounced function
			}
		});

		return () => {
			unsubscribe(); // Cleanup listener on component unmount
		};
	}, [debouncedSync]);

	// Cleanup debounce when the component unmounts
	useEffect(() => {
		return () => {
			debouncedSync.cancel(); // Cancel debounce to avoid memory leaks
		};
	}, [debouncedSync]);
}

export default useNetworkListener;
