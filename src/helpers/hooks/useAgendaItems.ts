import { useState } from 'react';
import { useStorage } from '@/storage/StorageContext';
import { AgendaItemType } from '@/types/schemas';
import { MarkedDates } from 'react-native-calendars/src/types';
import isEmpty from 'lodash/isEmpty';
import agendaItemType, { AgendaItemData } from '@/types/schemas/agendaItemType';

export const useAgendaItems = () => {
	const storage = useStorage();

	const [agendaItems, setAgendaItems] = useState<AgendaItemType[]>([]);

	const loadStoredItems = () => {
		const storedItems = storage.getString('agenda');
		if (storedItems) {
			const items = JSON.parse(storedItems) as AgendaItemType[];
			setAgendaItems(items);
			return items;
		}
		return [];
	};

	const updateItems = (updatedItems: AgendaItemType[]) => {
		storage.set('agenda', JSON.stringify(updatedItems));
	};
	const addAgendaItem = (newItem: AgendaItemType) => {
		const oldItems = loadStoredItems();
		const index = oldItems.findIndex(item => item.title === newItem.title);
		const updatedItems =
			index !== -1
				? [
						...oldItems.slice(0, index),
						{
							...oldItems[index],
							data: [...oldItems[index].data, ...newItem.data],
						},
						...oldItems.slice(index + 1),
				  ]
				: [...oldItems, newItem];
		setAgendaItems(updatedItems);
		updateItems(updatedItems);
	};

	const getMarkedDates = (items: agendaItemType[]) => {
		const marked: MarkedDates = {};

		items.forEach(item => {
			// NOTE: only mark dates with data
			if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
				marked[item.title] = { marked: true };
			} else {
				marked[item.title] = { disabled: true };
			}
		});
		return marked;
	};

	const deleteAgendaItem = (item: AgendaItemData): AgendaItemType[] => {
		loadStoredItems();
		const updatedItems = agendaItems.map(agendaItem => {
			if (agendaItem.title === item.key) {
				return {
					...agendaItem,
					data: agendaItem.data.filter(
						filteredItem => filteredItem.id !== item.id,
					),
				};
			}
			return agendaItem;
		});
		updateItems(updatedItems);
		return updatedItems;
	};

	return { getMarkedDates, addAgendaItem, deleteAgendaItem, loadStoredItems };
};
