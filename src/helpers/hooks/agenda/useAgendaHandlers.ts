import { AgendaItemData } from '@/types/schemas/agendaItemType';
import { AgendaItemType } from '@/types/schemas';
import { MarkedDates } from 'react-native-calendars/src/types';
import { useAgendaItems } from '@/helpers/hooks/agenda/useAgendaItems';

export const useAgendaHandlers = (
	setAgendaItems?: (newItems: AgendaItemType[]) => void,
	setMarkedDates?: (markedDates: MarkedDates) => void,
) => {
	const {
		deleteAgendaItem,
		completeAgendaItem,
		getMarkedDates,
		addOfflineAction,
	} = useAgendaItems();
	const handleDelete = (item: AgendaItemData) => {
		const newItems = deleteAgendaItem(item);
		if (setAgendaItems && setMarkedDates) {
			setAgendaItems(newItems);
			setMarkedDates(getMarkedDates(newItems));
		}
	};
	const handleComplete = (item: AgendaItemData) => {
		const newItems = completeAgendaItem(item);
		if (setAgendaItems) setAgendaItems(newItems);
	};
	const handleOfflineDelete = (id?: string, agendaDataId?: number) => {
		addOfflineAction({ type: 'DELETE', id, agendaDataId });
	};
	const handleOfflineComplete = (id?: string, agendaDataId?: number) => {
		addOfflineAction({ type: 'COMPLETE', id, agendaDataId });
	};
	return {
		handleComplete,
		handleDelete,
		handleOfflineComplete,
		handleOfflineDelete,
	};
};
