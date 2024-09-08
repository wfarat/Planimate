import { BaseAction } from '@/types/offlineActions/baseAction';
import { AgendaItemType } from '@/types/schemas';

export type AgendaAction = BaseAction & {
	agendaItem?: AgendaItemType;
	agendaDataId?: number;
	agendaItemTitle?: string;
};
