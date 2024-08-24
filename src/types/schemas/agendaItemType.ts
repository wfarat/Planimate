type AgendaItemType = {
	title: string;
	data: {
		time?: Date;
		duration: number;
		title: string;
		id: number;
		key: string;
		goalId: number;
		taskId: number;
		completed: boolean;
	}[];
};
export type AgendaItemData = {
	time?: Date;
	duration: number;
	title: string;
	id: number;
	key: string;
	goalId: number;
	taskId: number;
	completed: boolean;
};
export type RenderAgendaItemProps = {
	item: {
		time?: Date;
		duration: number;
		title: string;
		id: number;
		key: string;
		goalId: number;
		taskId: number;
		completed: boolean;
	};
};
export default AgendaItemType;
