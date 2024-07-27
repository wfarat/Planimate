type AgendaItemType = {
	title: string;
	data: {
		hour: string;
		duration: string;
		title: string;
		id: number;
		key: string;
	}[];
};
export type AgendaItemData = {
	hour: string;
	duration: string;
	title: string;
	id: number;
	key: string;
};

export default AgendaItemType;
