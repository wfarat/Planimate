import React, { createContext, useContext } from 'react';
import { fetchLastUpdateTimestamp } from '@/controllers/users';

// Define the shape of the context state
interface TimestampContextType {
	lastUpdateTimestamp: string | undefined;
}

// Create the context with a default value
const TimestampContext = createContext<TimestampContextType | undefined>(
	undefined,
);

// Custom hook to use the TimestampContext
export const useTimestamp = (): TimestampContextType => {
	const context = useContext(TimestampContext);
	if (!context) {
		throw new Error('useTimestamp must be used within a TimestampProvider');
	}
	return context;
};

// TimestampProvider component
const TimestampProvider: React.FC<{
	token: string | undefined;
	children: React.ReactNode;
}> = ({ token, children }) => {
	const { data: lastUpdateTimestamp } = fetchLastUpdateTimestamp(token);

	// Provide the timestamp to the rest of the app
	return (
		<TimestampContext.Provider value={{ lastUpdateTimestamp }}>
			{children}
		</TimestampContext.Provider>
	);
};

export default TimestampProvider;
