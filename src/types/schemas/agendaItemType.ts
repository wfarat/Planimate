import { Updatable } from '@/types/schemas/updatable';

type AgendaItemType = Updatable & {
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
	updated_at: string;
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
