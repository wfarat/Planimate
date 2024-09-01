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
