import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/theme";
import {
  responsiveFontSize,
  responsiveWidth,
  spacing,
} from "../../utils/responsive";

export const StatsCard = ({ title, value }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: responsiveWidth(0.21),
    backgroundColor: Colors.white,
    borderRadius: 6,
    paddingVertical: spacing.sm + 7,
    paddingHorizontal: spacing.xs,
    alignItems: "center",
  },
  title: {
    color: Colors.primary,
    fontSize: responsiveFontSize(9),
    marginBottom: 8,
    textAlign: "center",
    lineHeight: 10,
  },
  value: {
    color: Colors.primary,
    fontSize: responsiveFontSize(20),
    fontWeight: "bold",
  },
});
