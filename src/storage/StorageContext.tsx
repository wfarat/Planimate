// StorageContext.tsx
import React, { createContext, ReactNode, useContext } from 'react';
import { storage } from './storage';

const StorageContext = createContext(storage);

export const StorageProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	return (
		<StorageContext.Provider value={storage}>
			{children}
		</StorageContext.Provider>
	);
};

export const useStorage = () => useContext(StorageContext);
