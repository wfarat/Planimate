import { useMutation } from '@tanstack/react-query';
import { syncActions } from '@/services/syncActions/syncActions';
import { useOfflineActions } from '@/hooks/useOfflineActions';
import { ActionsPayload } from '@/types/offlineActions/actionPayload';

type Variables = {
	token: string;
	actions: ActionsPayload;
};
function useSyncActions() {
	const { clearActions } = useOfflineActions();
	return useMutation({
		mutationFn: ({ token, actions }: Variables) => syncActions(token, actions),
		onSuccess: () => {
			clearActions(); // Clear local storage on successful sync
		},
		onError: error => {
			console.error('Sync failed:', error);
			// Handle error, maybe show a message to the user
		},
		retry: 3, // Retry the mutation up to 3 times on failure
		retryDelay: 1000, // Delay between retries
	});
}

export default useSyncActions;
