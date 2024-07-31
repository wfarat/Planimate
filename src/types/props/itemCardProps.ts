type ItemCardProps = {
	name: string;
	description: string;
	completed?: boolean;
	dueDate?: Date;
	duration?: {
		base: number;
		remaining: number;
	};
};

export default ItemCardProps;
