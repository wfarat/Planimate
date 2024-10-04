type AgendaItemType = {
	title: string;
	data: AgendaItemData[];
};
export type AgendaItemData = {
	time?: string;
	duration: number;
	title: string;
	id: number;
	key: string;
	goalId: number;
	parentId?: number;
	taskId: number;
	completed: boolean;
};
export type RenderAgendaItemProps = {
	item: AgendaItemData;
};

export type FetchedAgendaItem = {
	_id?: string;
	title: string;
	user_id?: string;
	updated_at: string;
	data: {
		time?: Date;
		duration: number;
		title: string;
		id: number;
		key: string;
		goal_id: number;
		task_id: number;
		parent_id?: number;
		completed: boolean;
	}[];
};
export default AgendaItemType;
