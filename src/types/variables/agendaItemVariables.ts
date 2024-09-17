import AgendaItemType from '../schemas/agendaItemType';

type AgendaItemVariables = {
	agendaItem: AgendaItemType;
	token: string;
};

export type AgendaItemsVariables = {
	agendaItems: AgendaItemType[];
	token: string;
};
export default AgendaItemVariables;
