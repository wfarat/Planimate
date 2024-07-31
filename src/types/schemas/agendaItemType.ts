type AgendaItemType = {
	title: string;
	data: {
		date: Date;
		duration: number;
		title: string;
		id: number;
		key: string;
	}[];
};
export type AgendaItemData = {
	date: Date;
	duration: number;
	title: string;
	id: number;
	key: string;
};
export type RenderAgendaItemProps = {
	item: {
		date: Date;
		duration: number;
		title: string;
		id: number;
		key: string;
	};
};
export default AgendaItemType;
