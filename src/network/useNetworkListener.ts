import { useCallback } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useOfflineActions } from '@/hooks/useOfflineActions';
import { debounce } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { storage } from '@/storage/storage';
import { onlineManager } from '@tanstack/react-query';
import useSyncActions from './useSyncActions';
// Custom hook for network listener and debouncing sync
function useNetworkListener() {
	const { mutate } = useSyncActions();
	const { getLocalActions } = useOfflineActions();

	const token = storage.getString('token');
	// Memoize the debounced function using useCallback to ensure it remains stable between renders
	const debouncedSync = useCallback(
		debounce(() => {
			const actions = getLocalActions();
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
		[getLocalActions, mutate, token], // Dependencies for debounce
	);

	// Set up network listener to trigger sync
	onlineManager.setEventListener(setOnline => {
		return NetInfo.addEventListener(state => {
			const isConnected = !!state.isConnected;
			setOnline(isConnected); // Update react-query's online state

			// Trigger sync when reconnecting
			if (isConnected) {
				debouncedSync(); // Fire debounced sync when online
			}
		});
	});
}

export default useNetworkListener;
