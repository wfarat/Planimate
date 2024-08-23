export function convertKeysToSnakeCase(data) {
	const formattedData = {};
	Object.keys(data).forEach(key => {
		const snakeCaseKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
		formattedData[snakeCaseKey] = data[key];
	});
	return formattedData;
}
export function convertKeysToCamelCase(data) {
	const formattedData = {};
	const id = '_id';
	Object.keys(data).forEach(key => {
		if (key !== id) {
			const camelCaseKey = key.replace(/_./g, match =>
				match.charAt(1).toUpperCase(),
			);
			formattedData[camelCaseKey] = data[key];
		} else {
			formattedData[id] = data[id];
		}
	});
	return formattedData;
}
