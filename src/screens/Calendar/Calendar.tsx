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
import { useTheme } from '@/theme';
import { RenderAgendaItemProps } from '@/types/schemas/agendaItemType';
import { isImageSourcePropType } from '@/types/guards/image';
import { GreenRoundedButton } from '@/components/atoms';
import { View } from 'react-native';
import { RootScreenProps } from '@/types/navigation';
import { useMMKVString } from 'react-native-mmkv';
import { storage } from '@/storage/storage';
import { AgendaItemType } from '@/types/schemas';
import testIDs from './testIDs';

LocaleConfig.locales.pl = PL;
LocaleConfig.locales.en = EN;
LocaleConfig.defaultLocale = i18next.language;

function Calendar({ navigation }: RootScreenProps<'Calendar'>) {
	const { getMarkedDates, deleteAgendaItem, completeAgendaItem } =
		useAgendaItems();
	const theme = useRef(getTheme());
	const [agendaItemsString] = useMMKVString('agenda', storage);
	const { components, gutters } = useTheme();
	const agendaItems = agendaItemsString
		? (JSON.parse(agendaItemsString) as AgendaItemType[])
		: [];
	const markedDates = getMarkedDates(agendaItems);
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
				onDelete={() => deleteAgendaItem(item)}
				onComplete={() => completeAgendaItem(item)}
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
				contentContainerStyle={gutters.paddingBottom_120}
				sectionStyle={components.section}
				// dayFormat={'yyyy-MM-d'}
			/>
			<View style={components.bottomButtonContainer}>
				<GreenRoundedButton handlePress={handlePress} text="fillWeek" />
			</View>
		</CalendarProvider>
	);
}
export default Calendar;
