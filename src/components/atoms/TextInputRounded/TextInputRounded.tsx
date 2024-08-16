import { TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';

type Props = {
	onChangeText: (value: string) => void;
	value: string;
	text: 'email' | 'password' | 'repeat' | 'username' | 'title' | 'description';
	secure?: boolean;
};
function TextInputRounded({
	value,
	onChangeText,
	text,
	secure = false,
}: Props) {
	const { components, colors } = useTheme();
	const { t } = useTranslation(['common']);
	return (
		<TextInput
			style={components.textInputRounded}
			value={value}
			secureTextEntry={secure}
			onChangeText={onChangeText}
			placeholder={t(`common:textInput.${text}`)}
			placeholderTextColor={colors.gray400}
		/>
	);
}

export default TextInputRounded;
