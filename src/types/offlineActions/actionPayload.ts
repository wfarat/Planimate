import { GoalAction } from '@/types/offlineActions/goalAction';
import { TaskAction } from '@/types/offlineActions/taskAction';
import { AgendaAction } from '@/types/offlineActions/agendaAction';

export type ActionsPayload = {
	goal: GoalAction[];
	task: TaskAction[];
	agenda: AgendaAction[];
};
