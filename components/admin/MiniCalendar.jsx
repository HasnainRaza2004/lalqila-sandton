import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/theme";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  spacing,
} from "../../utils/responsive";

export const MiniCalendar = () => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const calendarDays = [
    [null, null, null, null, null, null, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, 29],
    [30, 31, null, null, null, null, null],
  ];

  const bookingDays = [3, 10, 11, 18, 19, 25];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendar</Text>

      {/* Days of week header */}
      <View style={styles.weekHeader}>
        {daysOfWeek.map((day, index) => (
          <View key={index} style={styles.dayHeader}>
            <Text style={styles.dayHeaderText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendar grid */}
      {calendarDays.map((week, weekIndex) => (
        <View key={weekIndex} style={styles.weekRow}>
          {week.map((day, dayIndex) => (
            <View key={dayIndex} style={styles.dayCell}>
              {day !== null && (
                <View
                  style={[
                    styles.dayContainer,
                    bookingDays.includes(day) && styles.bookingDay,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      bookingDays.includes(day) && styles.bookingDayText,
                    ]}
                  >
                    {day}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: spacing.sm - 5,
  },
  title: {
    color: Colors.primary,
    fontSize: responsiveFontSize(14),
    fontWeight: "bold",
    textAlign: "center",
  },
  weekHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  dayHeader: {
    width: responsiveWidth(0.05),
  },
  dayHeaderText: {
    color: Colors.grey,
    fontSize: responsiveFontSize(7),
    textAlign: "center",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  dayCell: {
    width: responsiveWidth(0.05),
    height: responsiveHeight(0.025),
    alignItems: "center",
  },
  dayContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
  },
  bookingDay: {
    backgroundColor: Colors.primary,
  },
  dayText: {
    fontSize: responsiveFontSize(10),
    color: Colors.black,
  },
  bookingDayText: {
    color: Colors.white,
    fontWeight: "bold",
  },
});
