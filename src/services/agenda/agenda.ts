import { instance } from '@/services/instance';
import AgendaItemType, {
	FetchedAgendaItem,
} from '@/types/schemas/agendaItemType';
import { objectToCamel, objectToSnake } from 'ts-case-convert/lib/caseConvert';

const convertToCamel = (fetchedAgendaItem: FetchedAgendaItem): AgendaItemType =>
	objectToCamel({
		...fetchedAgendaItem,
		// eslint-disable-next-line no-underscore-dangle
		id: fetchedAgendaItem._id,
		_id: undefined,
	});

export const fetchAgendaItems = async (
	token: string,
	lastUpdate?: string,
): Promise<AgendaItemType[]> => {
	const response = await instance.get(
		lastUpdate ? `agenda?last_update=${lastUpdate}` : 'agenda',
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);
	const responseData: FetchedAgendaItem[] = await response.json();
	return responseData.map((agendaItem: FetchedAgendaItem) =>
		convertToCamel(agendaItem),
	);
};

export const saveAgendaItem = async (
	agendaItem: AgendaItemType,
	token: string,
): Promise<AgendaItemType> => {
	const response = await instance.post('agenda', {
		json: objectToSnake(agendaItem),
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	const responseData = await response.json();
	return convertToCamel(responseData as FetchedAgendaItem);
};
export const saveAgendaItems = async (
	agendaItems: AgendaItemType[],
	token: string,
): Promise<AgendaItemType[]> => {
	const response = await instance.post('agenda/bulk', {
		json: objectToSnake(agendaItems),
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	const responseData = await response.json();
	return (responseData as FetchedAgendaItem[]).map(
		(agendaItem: FetchedAgendaItem) => convertToCamel(agendaItem),
	);
};

export const deleteAgendaItem = async (
	id: string,
	token: string,
	agendaDataId?: number,
): Promise<void> => {
	await instance.delete(`agenda/${id}/${agendaDataId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
};
export const editAgendaItem = async (
	agendaItem: AgendaItemType,
	token: string,
): Promise<void> => {
	await instance.put(`agenda/${agendaItem.id}`, {
		json: objectToSnake(agendaItem),
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
};

export const finishAgendaItem = async (
	id: string,
	token: string,
	agendaDataId?: number,
): Promise<void> => {
	await instance.put(`agenda/finish/${id}/${agendaDataId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
};
