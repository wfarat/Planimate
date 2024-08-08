type ItemCardProps = {
	name: string;
	description: string;
	completed?: boolean;
	dueDate?: Date;
	duration?: {
		base: number;
		elapsed: number;
	};
};

export default ItemCardProps;
