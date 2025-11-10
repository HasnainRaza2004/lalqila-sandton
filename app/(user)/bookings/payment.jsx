import { format as formatDate } from "date-fns";
import { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../constants/theme";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  spacing,
} from "../../../utils/responsive";

export default function PaymentScreen() {
  const [method, setMethod] = useState("card"); // 'card' | 'wallet'
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [expiryDateObj, setExpiryDateObj] = useState(null);
  const [showExpiryPicker, setShowExpiryPicker] = useState(false);
  const [cvv, setCvv] = useState("");
  const [amount] = useState("$500");
  const [couponCode, setCouponCode] = useState("");

  const handleExpiryConfirm = (date) => {
    // store as MM/YY
    setExpiry(formatDate(date, "MM/yy"));
    setExpiryDateObj(date);
    setShowExpiryPicker(false);
  };
  const accentBlue = "#2f78bc";

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Payment</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Payment Methods</Text>

        <View style={styles.methodsRow}>
          <TouchableOpacity
            style={[
              styles.methodCard,
              method === "card" && { borderColor: accentBlue, shadowColor: accentBlue },
            ]}
            onPress={() => setMethod("card")}
            activeOpacity={0.8}
          >
            <View style={styles.methodInner}>
              <View style={[styles.radioOuter, method === "card" && { borderColor: accentBlue }]}>
                {method === "card" && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.methodText}>Credit Card</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodCard,
              method === "wallet" && { borderColor: accentBlue, shadowColor: accentBlue },
            ]}
            onPress={() => setMethod("wallet")}
            activeOpacity={0.8}
          >
            <View style={styles.methodInner}>
              <View style={[styles.radioOuter, method === "wallet" && { borderColor: accentBlue }]}>
                {method === "wallet" && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.methodText}>Mobile Wallet</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.cardBox}>
          <Text style={styles.fieldLabel}>Card Number</Text>
          <TextInput
            style={styles.input}
            value={cardNumber}
            onChangeText={setCardNumber}
            placeholder="9441 56643 7376362"
            placeholderTextColor="#999"
            keyboardType="number-pad"
            maxLength={23}
          />

          <View style={styles.row}>
            <View style={[styles.col, { marginRight: spacing.sm }]}>
              <Text style={styles.fieldLabel}>Expiry Date</Text>
              <TouchableOpacity
                style={[styles.input, { justifyContent: "center" }]}
                activeOpacity={0.8}
                onPress={() => setShowExpiryPicker(true)}
              >
                <Text style={{ color: expiry ? Colors.primary : "#999", fontSize: responsiveFontSize(12) }}>
                  {expiry ? expiry : "MM/YY"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.col, { width: responsiveWidth(0.28) }]}>
              <Text style={styles.fieldLabel}>CVV</Text>
              <TextInput
                style={styles.input}
                value={cvv}
                onChangeText={setCvv}
                placeholder="123"
                placeholderTextColor="#999"
                keyboardType="number-pad"
                secureTextEntry={Platform.OS !== "web"}
                maxLength={4}
              />
            </View>
          </View>

          {/* expiry date picker modal */}
          <DateTimePickerModal
            isVisible={showExpiryPicker}
            mode="date"
            display="spinner"
            onConfirm={handleExpiryConfirm}
            onCancel={() => setShowExpiryPicker(false)}
            minimumDate={new Date()}
          />

          <Text style={[styles.fieldLabel, { marginTop: spacing.md }]}>Amount</Text>
          <Text style={styles.amountText}>{amount}</Text>

          <TouchableOpacity style={styles.payButton} activeOpacity={0.85}>
            <Text style={styles.payText}>Payment Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.couponBox}>
          <TextInput
            style={[styles.input, styles.couponInput]}
            value={couponCode}
            onChangeText={setCouponCode}
            placeholder="Add Coupon"
            placeholderTextColor="#999"
          />
          <TouchableOpacity onPress={() => {/* handle coupon */}}>
            <Text style={styles.couponAction}>Add Coupon</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginVertical: spacing.sm,
    marginHorizontal: spacing.sm,
    borderRadius: 8,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: responsiveFontSize(30),
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 0.5,
  },

  container: {
    marginHorizontal: spacing.md,
    padding: spacing.md,
  },

  sectionTitle: {
    color: Colors.primary,
    fontSize: responsiveFontSize(12),
    fontWeight: "800",
    marginBottom: spacing.sm,
  },

  methodsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },

  methodCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e6eef7",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },

  methodInner: { flexDirection: "row", alignItems: "center" },

  radioOuter: {
    width: responsiveFontSize(18),
    height: responsiveFontSize(18),
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#cfcfcf",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.sm,
  },

  radioInner: {
    width: responsiveFontSize(10),
    height: responsiveFontSize(10),
    borderRadius: 6,
    backgroundColor: "#2f78bc",
  },

  methodText: {
    color: Colors.primary,
    fontSize: responsiveFontSize(11),
    fontWeight: "700",
  },

  cardBox: {
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#dde6ef",
    padding: spacing.md,
    marginBottom: spacing.md,
  },

  fieldLabel: {
    color: Colors.primary,
    fontSize: responsiveFontSize(10),
    marginBottom: spacing.xs,
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#f5f8fb",
    borderRadius: 6,
    paddingHorizontal: spacing.sm,
    paddingVertical: responsiveHeight(0.012),
    color: Colors.primary,
    fontSize: responsiveFontSize(12),
    borderWidth: 1,
    borderColor: "#e6eef7",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.sm,
  },

  col: { flex: 1 },

  amountText: {
    color: Colors.primary,
    fontSize: responsiveFontSize(16),
    fontWeight: "800",
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },

  payButton: {
    backgroundColor: "#2f78bc",
    paddingVertical: responsiveHeight(0.016),
    borderRadius: 6,
    alignItems: "center",
    marginTop: spacing.sm,
  },

  payText: {
    color: "#fff",
    fontSize: responsiveFontSize(13),
    fontWeight: "800",
  },

  couponBox: {
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#dde6ef",
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  couponInput: {
    flex: 1,
    marginRight: spacing.md,
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
  },
  couponAction: {
    color: "#2f78bc",
    fontSize: responsiveFontSize(12),
    fontWeight: "700",
  },
});