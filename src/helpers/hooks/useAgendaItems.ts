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
		// Use map to create a new updated array
		const updatedItems = oldItems.map(item =>
			item.title === newItem.title ? newItem : item,
		);

		// If no matching item was found, append the new item
		if (!oldItems.some(item => item.title === newItem.title)) {
			updatedItems.push(newItem);
		}
		updateItems(updatedItems);
	};
	const createAgendaItem = (
		date: Date,
		task: Task,
		duration: number,
		time?: Date,
	) => {
		const title = date.toISOString().split('T')[0];
		const storedId = storage.getNumber('agenda.id');
		const id = storedId || 0;
		const newItem: AgendaItemType = {
			title,
			data: [
				{
					time,
					duration,
					title: task.name,
					id: id + 1,
					key: title,
					goalId: task.goalId,
					taskId: task.taskId,
					completed: false,
				},
			],
		};
		storage.set('agenda.id', id + 1);
		const oldItems = loadStoredItems();
		const oldItem = oldItems.find(item => item.title === newItem.title);
		if (!oldItem) return newItem;
		return { ...oldItem, data: [...oldItem.data, ...newItem.data] };
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
		const filteredItems = updatedItems.filter(
			agendaItem => agendaItem.data.length > 0,
		);
		updateItems(filteredItems);
		return filteredItems;
	};

	function updateTaskDuration(
		tasks: Task[],
		task: Task,
		duration: number,
		storageKey: string,
	): void {
		if (task.duration?.elapsed !== undefined) {
			const updatedTaskElapsedTime = task.duration.elapsed
				? task.duration.elapsed + duration
				: duration;
			const updatedTask = {
				...task,
				duration: { ...task.duration, elapsed: updatedTaskElapsedTime },
			};
			storage.set(
				storageKey,
				JSON.stringify(
					tasks.map(current =>
						current.taskId === task.taskId ? updatedTask : current,
					),
				),
			);
		}
	}
	const updateAgendaItem = (item: AgendaItemData): AgendaItemType[] => {
		const agendaItems = loadStoredItems();
		const updatedItems = agendaItems.map(agendaItem => {
			return agendaItem.title === item.key
				? {
						...agendaItem,
						data: agendaItem.data.map(currentItem =>
							currentItem.id === item.id ? item : currentItem,
						),
				  }
				: agendaItem;
		});
		updateItems(updatedItems);
		return updatedItems;
	};
	const completeAgendaItem = (item: AgendaItemData): AgendaItemType[] => {
		const updatedItems = updateAgendaItem({ ...item, completed: true });
		const taskStorageKey = item.taskId
			? `goals.${item.goalId}.${item.taskId}`
			: `goals.${item.goalId}`;
		const storedTasksString = storage.getString(taskStorageKey);
		if (storedTasksString) {
			const tasks = JSON.parse(storedTasksString) as Task[];
			const targetTask = tasks.find(current => current.taskId === item.taskId);
			if (targetTask) {
				updateTaskDuration(tasks, targetTask, item.duration, taskStorageKey);
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
		completeAgendaItem,
		createAgendaItem,
		updateAgendaItem,
	};
};
