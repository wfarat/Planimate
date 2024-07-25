import { useEffect, useState } from 'react';
import { useStorage } from '@/storage/StorageContext';
import { AgendaItemType } from '@/types/schemas';
import { MarkedDates } from 'react-native-calendars/src/types';
import isEmpty from 'lodash/isEmpty';
import agendaItemType, { AgendaItemData } from '@/types/schemas/agendaItemType';

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
		const index = agendaItems.findIndex(item => item.title === newItem.title);
		const updatedItems = index !== -1
			? [
				...agendaItems.slice(0, index),
				{
					...agendaItems[index],
					data: [
						...agendaItems[index].data,
						...newItem.data
					]
				},
				...agendaItems.slice(index + 1)
			]
			: [...agendaItems, newItem];
			setAgendaItems(updatedItems);
			updateItems(updatedItems)
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
		const storedItems = storage.getString('agenda');
		if (storedItems) {
			const oldItems = (JSON.parse(storedItems) as AgendaItemType[]);
			console.log(oldItems)
			const updatedItems = oldItems.map(agendaItem => {
				if (agendaItem.title === item.key) {
					console.log('same');
					return {
						...agendaItem,
						data: agendaItem.data.filter(filteredItem => filteredItem.id !== item.id)
					};
				}
				return agendaItem;
			});
			updateItems(updatedItems);
			return updatedItems;
		} else return []
	};

	return { getMarkedDates, addAgendaItem, deleteAgendaItem };
};
