import ActionDialog, {
	ActionDialogProps,
} from '@/components/molecules/ActionDialog/ActionDialog';

type AgendaProps = ActionDialogProps & {
	data: { agendaDataId: number; agendaItemTitle: string; id?: string };
	offlineAction: (data: {
		id?: string;
		agendaDataId?: number;
		agendaItemTitle?: string;
	}) => void;
};
function AgendaActionDialog({
	data,
	offlineAction,
	...restProps
}: AgendaProps) {
	return (
		<ActionDialog offlineAction={offlineAction} data={data} {...restProps} />
	);
}

export default AgendaActionDialog;
