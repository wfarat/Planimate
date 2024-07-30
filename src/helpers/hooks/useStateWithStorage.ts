import { useEffect, useState } from 'react';
import { useStorage } from '@/storage/StorageContext';

export const useStateWithStorage = (key: string, initialValue?: string) => {
	const storage = useStorage();
	const [state, setState] = useState<string>(initialValue || '');
	const storageKey = `state.${key}`;
	useEffect(() => {
		const savedState = storage.getString(storageKey);
		if (savedState) {
			setState(savedState);
		}
	}, []);

	useEffect(() => {
		storage.set(storageKey, state);
	}, [state]);

	return { state, setState };
};
