import { useStorage } from '@/storage/StorageContext';
import { AgendaItemType, Task } from '@/types/schemas';
import { MarkedDates } from 'react-native-calendars/src/types';
import isEmpty from 'lodash/isEmpty';
import agendaItemType, { AgendaItemData } from '@/types/schemas/agendaItemType';

export const useAgendaItems = () => {
	const storage = useStorage();

	const loadStoredItems = () => {
		const storedItems = storage.getString('agenda');
		if (storedItems) {
			return JSON.parse(storedItems) as AgendaItemType[];
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
		updateItems(updatedItems);
	};

	const getMarkedDates = (items: agendaItemType[]) => {
		const marked: MarkedDates = {};

		items.forEach(item => {
			if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
				marked[item.title] = { marked: true };
			} else {
				marked[item.title] = { disabled: true };
			}
		});
		return marked;
	};

	const deleteAgendaItem = (item: AgendaItemData): AgendaItemType[] => {
		const agendaItems = loadStoredItems();
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
	const closeAgendaItem = (item: AgendaItemData): AgendaItemType[] => {
		const agendaItems = loadStoredItems();
		const updatedItems = agendaItems.map(agendaItem => {
			if (agendaItem.title === item.key) {
				return {
					...agendaItem,
					data: agendaItem.data.map(currentItem =>
						currentItem.id === item.id ? item : currentItem,
					),
				};
			}
			return agendaItem;
		});
		const storedTasks = storage.getString(item.taskStorageKey);
		if (storedTasks) {
			const tasks = JSON.parse(storedTasks) as Task[];
			const task = tasks.find(current => current.id === item.taskId);
			if (task) {
				if (task.duration && task.duration.remaining) {
					const updatedTask = {
						...task,
						duration: {
							...task.duration,
							remaining:
								task.duration.remaining >= item.duration
									? task.duration.remaining - item.duration
									: 0,
						},
					};
					storage.set(
						item.taskStorageKey,
						JSON.stringify(
							tasks.map(current =>
								current.id === task.id ? updatedTask : current,
							),
						),
					);
				}
			}
		}
		updateItems(updatedItems);
		return updatedItems;
	};

	return {
		getMarkedDates,
		addAgendaItem,
		deleteAgendaItem,
		loadStoredItems,
		closeAgendaItem,
	};
};
