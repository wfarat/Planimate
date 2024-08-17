import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

type Props = {
	leftText: string;
	rightText: string;
	handleChange: () => void;
	startPosition: boolean;
};
function Switch({ leftText, rightText, handleChange, startPosition }: Props) {
	const [isLeftOn, setIsLeftOn] = useState(startPosition);
	const handlePress = () => {
		setIsLeftOn(!isLeftOn);
		handleChange();
	};
	return (
		<TouchableOpacity style={styles.switchContainer} onPress={handlePress}>
			<View style={[styles.switch, isLeftOn && styles.switchOn]}>
				<Text style={styles.text}>{leftText}</Text>
			</View>
			<View style={[styles.switch, !isLeftOn && styles.switchOn]}>
				<Text style={styles.text}>{rightText}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	switchContainer: {
		flexDirection: 'row',
		borderWidth: 2,
		borderColor: '#007AFF',
		borderRadius: 25,
		overflow: 'hidden',
		margin: 16,
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

export default Switch;
