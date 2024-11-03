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
	repeats?: number;
};

export default ItemCardProps;
