type AgendaItemType = {
	id?: string;
	userId?: string;
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

export type FetchedAgendaItem = {
	_id?: string;
	title: string;
	user_id?: string;
	data: {
		time?: Date;
		duration: number;
		title: string;
		id: number;
		key: string;
		goal_id: number;
		task_id: number;
		completed: boolean;
	}[];
};
export default AgendaItemType;
