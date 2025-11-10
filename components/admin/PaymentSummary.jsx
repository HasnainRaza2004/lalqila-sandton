import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/theme";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  spacing,
} from "../../utils/responsive";
import { useRouter } from "expo-router";

export const PaymentSummary = () => {
    const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Summary</Text>

      <View style={styles.summaryContainer}>
        {/* Total Amount */}
        <View style={styles.row}>
          <Text style={styles.text}>Total Amount</Text>
          <Text style={styles.text}>$5,500</Text>
        </View>

        {/* Amount Paid */}
        <View style={styles.row}>
          <Text style={styles.text}>Amount Paid</Text>
          <Text style={styles.text}>$5,000</Text>
        </View>

        {/* Balance Due */}
        <View style={styles.row}>
          <Text style={styles.text}>Balance Due</Text>
          <Text style={styles.text}>$500</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/(user)/bookings/payment")}>
            <Text style={styles.buttonText}>Pay Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/(user)/bookings/event-history")}>
            <Text style={styles.buttonText}>Generate Invoice</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    gap: spacing.xs,
  },
  title: {
    color: Colors.primary,
    fontWeight: "800",
    fontSize: responsiveFontSize(10),
  },
  summaryContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    // padding: spacing.sm,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: spacing.xs,
    marginHorizontal: spacing.sm,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey,
    paddingBottom: spacing.xs,
  },
  text: {
    color: Colors.primary,
    fontSize: responsiveFontSize(10),
    fontWeight: "900",
  },
  buttonRow: {
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: 'flex-end',
    marginHorizontal: spacing.sm,
    marginVertical: spacing.md,
  },
  button: {
    backgroundColor: Colors.secondary,
    width: responsiveWidth(0.19),
    paddingVertical: responsiveHeight(0.007),
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.white,
    fontSize: responsiveFontSize(7.5),
    fontWeight: "700",
  },
});
