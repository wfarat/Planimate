export function resetStates(...resetFunctions: Array<(state: string) => void>) {
	resetFunctions.forEach(resetFunction => resetFunction(''));
}
