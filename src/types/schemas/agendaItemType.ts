type AgendaItemType = {
	title: string;
	data: {
		hour: string;
		duration: number;
		title: string;
		id: number;
		key: string;
	}[];
};
export type AgendaItemData = {
	hour: string;
	duration: number;
	title: string;
	id: number;
	key: string;
};
export type RenderAgendaItemProps = {
	item: {
		hour: string;
		duration: number;
		title: string;
		id: number;
		key: string;
	};
};
export default AgendaItemType;
