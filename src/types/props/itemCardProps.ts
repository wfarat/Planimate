import { Task } from '@/types/schemas';

type ItemCardProps = {
	name: string;
	description: string;
	dueDate?: Date;
	task?: Task;
};

export default ItemCardProps;
