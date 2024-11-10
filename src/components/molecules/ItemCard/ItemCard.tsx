import { useEffect, useRef, useState } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/theme';
import type ItemCardProps from '@/types/props/itemCardProps';
import * as Progress from 'react-native-progress';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';
import { daysBetween } from '@/utils/formatTime';
import { dayString } from '@/utils/dayString';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PickDaysDialog from '@/components/molecules/PickDaysDialog/PickDaysDialog';

function ItemCard({ name, description, dueDate, task }: ItemCardProps) {
	const { duration, repeats, repeatDays, completed } = task ?? {};
	const [visible, setVisible] = useState(false);
	const { layout, gutters, borders, fonts, backgrounds, components, colors } =
		useTheme();
	const { t } = useTranslation(['goals', 'common']);
	const progress = useRef(new Animated.Value(0)).current;
	const [progressValue, setProgressValue] = useState(0);
	useEffect(() => {
		if (duration) {
			const fullDuration = repeats ? repeats * duration.base : duration.base;
			const animation = Animated.timing(progress, {
				toValue:
					duration.elapsed > fullDuration ? 1 : duration.elapsed / fullDuration,
				duration: 1000,
				useNativeDriver: false,
			});

			animation.start();

			const listenerId = progress.addListener(({ value }) => {
				setProgressValue(value);
			});

			return () => {
				progress.removeListener(listenerId);
			};
		}
	}, [duration]);
	return (
		<View
			style={[
				gutters.marginBottom_16,
				borders.gray400,
				borders.w_1,
				layout.fullWidth,
				borders.rounded_4,
				gutters.padding_16,
				completed ? backgrounds.green400 : backgrounds.purple100,
			]}
		>
			{task && (
				<PickDaysDialog
					task={task}
					onCancel={() => setVisible(false)}
					setVisible={setVisible}
					visible={visible}
					oldDays={repeatDays}
				/>
			)}
			<View style={gutters.paddingRight_60}>
				<Text style={[fonts.gray100, fonts.bold, fonts.size_16]}>{name}</Text>
				<Text style={[fonts.gray100]}>{description}</Text>

				{dueDate && (
					<View>
						<Text style={fonts.gray100}>
							{t('goals:endDate')} {new Date(dueDate).toLocaleDateString()}
						</Text>
						<Text style={fonts.gray100}>
							{t('goals:daysLeft')} {daysBetween(new Date(dueDate))}
						</Text>
					</View>
				)}
				{repeatDays && (
					<View style={layout.row}>
						{repeatDays.map(
							(isRepeat, index) =>
								isRepeat && (
									<View key={index} style={components.dayIcon}>
										<Text style={[fonts.size_12, fonts.gray100, fonts.bold]}>
											{t(`common:daysAbv.${dayString(index)}`)}
										</Text>
									</View>
								),
						)}
						<TouchableOpacity onPress={() => setVisible(true)}>
							<MaterialCommunityIcons
								name="plus-circle"
								size={30}
								color={colors.green400}
							/>
						</TouchableOpacity>
					</View>
				)}
			</View>
			{!isEmpty(duration) && (
				<View
					style={[
						layout.absolute,
						layout.top0,
						layout.right0,
						gutters.margin_12,
					]}
				>
					<Progress.Pie
						progress={progressValue}
						size={50}
						color="#76c7c0"
						borderWidth={2}
						borderColor="#fff"
					/>
				</View>
			)}
		</View>
	);
}

export default ItemCard;
