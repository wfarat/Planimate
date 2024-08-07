import { useRef, useCallback, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
	ExpandableCalendar,
	AgendaList,
	CalendarProvider,
	WeekCalendar,
	LocaleConfig,
} from 'react-native-calendars';
import { useAgendaItems } from '@/helpers/hooks/useAgendaItems';
import AgendaItem from '@/components/molecules/AgendaItem/AgendaItem';
import {
	getTheme,
	themeColor,
	lightThemeColor,
} from '@/helpers/utils/calendarTheme';
import PreviousArrow from '@/theme/assets/images/previous@2x.png';
import NextArrow from '@/theme/assets/images/next@2x.png';
import PL from '@/translations/pl/calendar';
import EN from '@/translations/en/calendar';
import i18next from 'i18next';
import { MarkedDates } from 'react-native-calendars/src/types';
import { AgendaItemType } from '@/types/schemas';
import { useIsFocused } from '@react-navigation/native';
import {
	AgendaItemData,
	RenderAgendaItemProps,
} from '@/types/schemas/agendaItemType';
import { CalendarProps } from '@/types/props/calendarProps';
import { isImageSourcePropType } from '@/types/guards/image';
import testIDs from './testIDs';

LocaleConfig.locales.pl = PL;
LocaleConfig.locales.en = EN;
LocaleConfig.defaultLocale = i18next.language;

function Calendar({ weekView }: CalendarProps) {
	const {
		getMarkedDates,
		deleteAgendaItem,
		loadStoredItems,
		completeAgendaItem,
	} = useAgendaItems();
	const theme = useRef(getTheme());

	const todayBtnTheme = useRef({
		todayButtonTextColor: themeColor,
	});
	const [markedDates, setMarkedDates] = useState<MarkedDates>();
	const [agendaItems, setAgendaItems] = useState<AgendaItemType[]>([]);

	useEffect(() => {
		const newItems = loadStoredItems();
		if (newItems) {
			setAgendaItems(newItems);
			setMarkedDates(getMarkedDates(newItems));
		}
	}, [useIsFocused()]);

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

	const handleDelete = (item: AgendaItemData) => {
		const newItems = deleteAgendaItem(item);
		setAgendaItems(newItems);
		setMarkedDates(getMarkedDates(newItems));
	};
	const handleComplete = (item: AgendaItemData) => {
		const newItems = completeAgendaItem(item);
		setAgendaItems(newItems);
		setMarkedDates(getMarkedDates(newItems));
	};
	const renderItem = useCallback(({ item }: RenderAgendaItemProps) => {
		return (
			<AgendaItem
				item={item}
				handleDelete={() => handleDelete(item)}
				handleComplete={() => handleComplete(item)}
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
	return (
		<CalendarProvider
			key={calendarKey}
			date={today}
			showTodayButton
			// disabledOpacity={0.6}
			theme={todayBtnTheme.current}
			// todayBottomMargin={16}
		>
			{weekView ? (
				<WeekCalendar
					testID={testIDs.weekCalendar.CONTAINER}
					firstDay={1}
					markedDates={markedDates}
				/>
			) : (
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
			)}
			<AgendaList
				sections={agendaItems}
				renderItem={renderItem}
				// scrollToNextEvent
				sectionStyle={styles.section}
				// dayFormat={'yyyy-MM-d'}
			/>
		</CalendarProvider>
	);
}
export default Calendar;

const styles = StyleSheet.create({
	calendar: {
		paddingLeft: 20,
		paddingRight: 20,
	},
	header: {
		backgroundColor: 'lightgrey',
	},
	section: {
		backgroundColor: lightThemeColor,
		color: 'grey',
		textTransform: 'capitalize',
	},
});
