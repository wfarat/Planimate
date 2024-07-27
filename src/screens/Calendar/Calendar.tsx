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

import PL from '@/translations/pl/calendar';
import EN from '@/translations/en/calendar';
import i18next from 'i18next';
import { MarkedDates } from 'react-native-calendars/src/types';
import { AgendaItemType } from '@/types/schemas';
import { useStorage } from '@/storage/StorageContext';
import { useIsFocused } from '@react-navigation/native';
import { AgendaItemData } from '@/types/schemas/agendaItemType';
import testIDs from './testIDs';

LocaleConfig.locales.pl = PL;
LocaleConfig.locales.en = EN;

interface Props {
	weekView?: boolean;
}

function Calendar({ weekView = false }: Props) {
	const { getMarkedDates, deleteAgendaItem } = useAgendaItems();
	const theme = useRef(getTheme());
	const storage = useStorage();
	const todayBtnTheme = useRef({
		todayButtonTextColor: themeColor,
	});
	const [markedDates, setMarkedDates] = useState<MarkedDates>();
	const [agendaItems, setAgendaItems] = useState<AgendaItemType[]>([]);
	useEffect(() => {
		const storedItems = storage.getString('agenda');
		if (storedItems) {
			const newItems = JSON.parse(storedItems) as AgendaItemType[];
			setAgendaItems(newItems);
			setMarkedDates(getMarkedDates(newItems));
		}
	}, [useIsFocused()]);
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
	}, [languageKey, agendaItems]);

	const handleDelete = (item: AgendaItemData) => {
		const newItems = deleteAgendaItem(item);
		setAgendaItems(newItems);
	};
	const calendarKey = `calendar-${languageKey}`;
	const renderItem = useCallback(({ item }: any) => {
		return <AgendaItem item={item} handleDelete={() => handleDelete(item)} />;
	}, []);
	const today = new Date().toISOString().split('T')[0];
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
