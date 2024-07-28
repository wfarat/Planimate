import { useEffect, useState } from 'react';
import { useStorage } from '@/storage/StorageContext';

export const useStateWithStorage = (key: string, initialValue: string) => {
	const storage = useStorage();
	const [state, setState] = useState<string>(initialValue);

	useEffect(() => {
		const savedState = storage.getString(key);
		if (savedState) {
			setState(savedState);
		}
	}, []);

	useEffect(() => {
		storage.set(key, state);
	}, [state]);

	return { state, setState };
};
