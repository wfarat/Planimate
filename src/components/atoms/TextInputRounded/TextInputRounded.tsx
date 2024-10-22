import { TextInput, TextInputProps } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';

type Props = TextInputProps & {
	text:
		| 'email'
		| 'password'
		| 'repeat'
		| 'username'
		| 'title'
		| 'description'
		| 'taskName'
		| 'taskDescription'
		| 'taskRepeats';
};
function TextInputRounded(props: Props) {
	const { text } = props;
	const { components, colors } = useTheme();
	const { t } = useTranslation(['common']);
	return (
		<TextInput
			style={components.textInputRounded}
			placeholder={t(`common:textInput.${text}`)}
			placeholderTextColor={colors.gray400}
			{...props}
		/>
	);
}

export default TextInputRounded;
