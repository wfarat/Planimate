import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

function SwitchComponent() {
	const [isLeftOn, setIsLeftOn] = useState(true);

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.switchContainer}
				onPress={() => setIsLeftOn(!isLeftOn)}
			>
				<View style={[styles.switch, isLeftOn && styles.switchOn]}>
					<Text style={styles.text}>Left</Text>
				</View>
				<View style={[styles.switch, !isLeftOn && styles.switchOn]}>
					<Text style={styles.text}>Right</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	switchContainer: {
		flexDirection: 'row',
		borderWidth: 2,
		borderColor: '#007AFF',
		borderRadius: 25,
		overflow: 'hidden',
		width: 200,
		height: 50,
	},
	switch: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10,
	},
	switchOn: {
		backgroundColor: '#007AFF',
	},
	text: {
		fontSize: 16,
		color: '#fff',
	},
});

export default SwitchComponent;
