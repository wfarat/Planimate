type AgendaItemType = {
	title: string;
	data: {
		date: Date;
		duration: number;
		title: string;
		id: number;
		key: string;
		taskStorageKey: string;
		taskId: number;
	}[];
};
export type AgendaItemData = {
	date: Date;
	duration: number;
	title: string;
	id: number;
	key: string;
	taskStorageKey: string;
	taskId: number;
};
export type RenderAgendaItemProps = {
	item: {
		date: Date;
		duration: number;
		title: string;
		id: number;
		key: string;
		taskStorageKey: string;
		taskId: number;
	};
};
export default AgendaItemType;
