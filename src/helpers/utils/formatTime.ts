function renderTime(time: number) {
	return time > 9 ? time : `0${time}`;
}
export function hoursAndMinutes(dateInput: Date) {
	return `${renderTime(dateInput.getHours())} : ${renderTime(
		dateInput.getMinutes(),
	)}`;
}
