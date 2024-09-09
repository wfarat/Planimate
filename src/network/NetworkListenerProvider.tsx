import React, { ReactNode } from 'react';
import useNetworkListener from '@/network/useNetworkListener'; // Your custom network hook

export const NetworkListenerProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	useNetworkListener(); // Set up the network listener

	return <>{children}</>;
};
