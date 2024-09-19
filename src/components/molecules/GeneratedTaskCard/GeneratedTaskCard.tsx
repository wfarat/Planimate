import { GeneratedTask } from '@/types/schemas';

type Props = {
	generatedTask: GeneratedTask;
};
function GeneratedTaskCard({ generatedTask }: Props) {
	const { name, description, dueDate, divisible, duration } = generatedTask;
}

export default GeneratedTaskCard;
