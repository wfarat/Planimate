type ItemCardProps = {
	name: string;
	description: string;
	completed?: boolean;
	dueDate?: Date;
	duration?: {
		base: number;
		elapsed: number;
	};
	repeatDays?: boolean[];
};

export default ItemCardProps;
