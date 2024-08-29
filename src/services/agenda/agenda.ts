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
	const response = await instance.post('goals', {
		json: objectToSnake(agendaItem),
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});
	const responseData = await response.json();
	return convertToCamel(responseData as FetchedAgendaItem);
};
