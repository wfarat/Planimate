import { useEffect, useState } from 'react';
import { useStorage } from '@/storage/StorageContext';
import { AgendaItemType } from '@/types/schemas';
import { MarkedDates } from 'react-native-calendars/src/types';
import isEmpty from 'lodash/isEmpty';

export const useAgendaItems = () => {
	const storage = useStorage();

	const [agendaItems, setAgendaItems] = useState<AgendaItemType[]>([]);
	useEffect(() => {
		const storedItems = storage.getString('agenda');
		if (storedItems) {
			setAgendaItems(JSON.parse(storedItems) as AgendaItemType[]);
		}
	}, []);

	const updateItems = (updatedItems: AgendaItemType[]) => {
		storage.set('agenda', JSON.stringify(updatedItems));
	};
	const addAgendaItem = (newItem: AgendaItemType) => {
		const updatedItems = [...agendaItems, newItem];
		setAgendaItems(updatedItems);
		updateItems(updatedItems);
	};

	const getMarkedDates = () => {
		const marked: MarkedDates = {};

		agendaItems.forEach(item => {
			// NOTE: only mark dates with data
			if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
				marked[item.title] = { marked: true };
			} else {
				marked[item.title] = { disabled: true };
			}
		});
		return marked;
	};

	return { getMarkedDates, agendaItems, addAgendaItem };
};
