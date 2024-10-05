import { useRef, useCallback, useState, useEffect } from 'react';

import {
	ExpandableCalendar,
	AgendaList,
	CalendarProvider,
	LocaleConfig,
} from 'react-native-calendars';
import { useAgendaItems } from '@/hooks/agenda/useAgendaItems';
import AgendaItem from '@/components/molecules/AgendaItem/AgendaItem';
import { getTheme } from '@/utils/calendarTheme';
import PreviousArrow from '@/theme/assets/images/previousArrow.png';
import NextArrow from '@/theme/assets/images/nextArrow.png';
import PL from '@/translations/pl/calendar';
import EN from '@/translations/en/calendar';
import i18next from 'i18next';
import { MarkedDates } from 'react-native-calendars/src/types';
import { AgendaItemType } from '@/types/schemas';
import { useIsFocused } from '@react-navigation/native';
import { useTheme } from '@/theme';
import { RenderAgendaItemProps } from '@/types/schemas/agendaItemType';
import { isImageSourcePropType } from '@/types/guards/image';
import { GreenRoundedButton } from '@/components/atoms';
import { View } from 'react-native';
import { RootScreenProps } from '@/types/navigation';
import { useAgendaHandlers } from '@/hooks/agenda/useAgendaHandlers';
import testIDs from './testIDs';

LocaleConfig.locales.pl = PL;
LocaleConfig.locales.en = EN;
LocaleConfig.defaultLocale = i18next.language;

function Calendar({ navigation }: RootScreenProps<'Calendar'>) {
	const { getMarkedDates, getItems } = useAgendaItems();
	const theme = useRef(getTheme());
	const [markedDates, setMarkedDates] = useState<MarkedDates>();
	const [agendaItems, setAgendaItems] = useState<AgendaItemType[]>([]);
	const { handleDelete, handleComplete } = useAgendaHandlers(
		setAgendaItems,
		setMarkedDates,
	);
	const { components, layout, gutters, backgrounds } = useTheme();
	const isFocused = useIsFocused();
	useEffect(() => {
		const newItems = getItems();
		if (newItems) {
			setAgendaItems(newItems);
			setMarkedDates(getMarkedDates(newItems));
		}
	}, [isFocused]);
	const [languageKey, setLanguageKey] = useState(i18next.language);
	const handleLanguageChange = (lng: string) => {
		if (languageKey !== lng) {
			setLanguageKey(lng);
			LocaleConfig.defaultLocale = lng;
		}
	};
	useEffect(() => {
		i18next.on('languageChanged', handleLanguageChange);
		return () => {
			i18next.off('languageChanged', handleLanguageChange);
		};
	}, [languageKey, agendaItems]);

	const renderItem = useCallback(({ item }: RenderAgendaItemProps) => {
		return (
			<AgendaItem
				item={item}
				onDelete={() => handleDelete(item)}
				onComplete={() => handleComplete(item)}
			/>
		);
	}, []);
	if (
		!isImageSourcePropType(PreviousArrow) ||
		!isImageSourcePropType(NextArrow)
	) {
		throw new Error('Image source is not valid');
	}
	const today = new Date().toISOString().split('T')[0];
	const calendarKey = `calendar-${languageKey}`;
	const handlePress = () => {
		navigation.push('FillAgendaWeek');
	};
	return (
		<CalendarProvider key={calendarKey} date={today}>
			<ExpandableCalendar
				testID={testIDs.expandableCalendar.CONTAINER}
				// horizontal={false}
				// hideArrows
				leftArrowImageSource={PreviousArrow}
				rightArrowImageSource={NextArrow}
				// disablePan
				// hideKnob
				// initialPosition={ExpandableCalendar.positions.OPEN}
				// calendarStyle={styles.calendar}
				// headerStyle={styles.header} // for horizontal only
				// disableWeekScroll
				theme={theme.current}
				// disableAllTouchEventsForDisabledDays
				firstDay={1}
				markedDates={markedDates}
				// animateScroll
				// closeOnDayPress={false}
			/>
			<AgendaList
				sections={agendaItems}
				renderItem={renderItem}
				// scrollToNextEvent
				sectionStyle={components.section}
				// dayFormat={'yyyy-MM-d'}
			/>
			<View
				style={[
					layout.absolute,
					layout.bottom0,
					layout.itemsCenter,
					layout.fullWidth,
					gutters.paddingRight_32,
					gutters.paddingLeft_32,
					backgrounds.purple100,
				]}
			>
				<GreenRoundedButton handlePress={handlePress} text="fillWeek" />
			</View>
		</CalendarProvider>
	);
}
export default Calendar;
