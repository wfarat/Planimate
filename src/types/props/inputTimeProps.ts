export type InputTimeProps = {
	time?: Date;
	setTime?: (date: Date) => void;
	setDuration?: (number: number) => void;
	message: 'duration' | 'time';
};
