import { useRef, useCallback, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
	ExpandableCalendar,
	AgendaList,
	CalendarProvider,
	WeekCalendar,
} from 'react-native-calendars';
import { useAgendaItems } from '@/helpers/hooks/useAgendaItems';
import AgendaItem from '@/components/molecules/AgendaItem/AgendaItem';
import {
	getTheme,
	themeColor,
	lightThemeColor,
} from '@/helpers/utils/calendarTheme';
import testIDs from './testIDs';
import {LocaleConfig} from 'react-native-calendars';
import { default as PL } from '@/translations/pl/calendar';
import { default as EN } from '@/translations/en/calendar';
import i18next from 'i18next';


LocaleConfig.locales['pl'] = PL;
LocaleConfig.locales['en'] = EN;


interface Props {
	weekView?: boolean;
}

function Calendar({ weekView = false }: Props) {
	const { agendaItems, getMarkedDates } = useAgendaItems();
	const marked = useRef(getMarkedDates());
	const theme = useRef(getTheme());
	const todayBtnTheme = useRef({
		todayButtonTextColor: themeColor,
	});
	const [languageKey, setLanguageKey] = useState(i18next.language);

	useEffect(() => {
		const handleLanguageChange = (lng: string) => {
			if (languageKey !== lng) {
				setLanguageKey(lng);
				LocaleConfig.defaultLocale = lng;
			}
		};

		i18next.on('languageChanged', handleLanguageChange);

		return () => {
			i18next.off('languageChanged', handleLanguageChange);
		};
	}, [languageKey]);
	// const onDateChanged = useCallback((date, updateSource) => {
	//   console.log('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
	// }, []);

	// const onMonthChange = useCallback(({dateString}) => {
	//   console.log('ExpandableCalendarScreen onMonthChange: ', dateString);
	// }, []);
	const calendarKey = `calendar-${languageKey}`;
	const renderItem = useCallback(({ item }: any) => {
		return <AgendaItem item={item} />;
	}, []);
	const today = new Date().toISOString().split('T')[0];
	return (
		<CalendarProvider
			key={calendarKey}
			date={today}
			// onDateChanged={onDateChanged}
			// onMonthChange={onMonthChange}
			showTodayButton
			// disabledOpacity={0.6}
			theme={todayBtnTheme.current}
			// todayBottomMargin={16}
		>
			{weekView ? (
				<WeekCalendar
					testID={testIDs.weekCalendar.CONTAINER}
					firstDay={1}
					markedDates={marked.current}
				/>
			) : (
				<ExpandableCalendar
					testID={testIDs.expandableCalendar.CONTAINER}
					// horizontal={false}
					// hideArrows
					// disablePan
					// hideKnob
					// initialPosition={ExpandableCalendar.positions.OPEN}
					// calendarStyle={styles.calendar}
					// headerStyle={styles.header} // for horizontal only
					// disableWeekScroll
					theme={theme.current}
					// disableAllTouchEventsForDisabledDays
					firstDay={1}
					markedDates={marked.current}
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
