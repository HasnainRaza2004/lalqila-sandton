import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PhoneInput from "../../../components/common/PhoneInput";
import { Colors } from "../../../constants/theme";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  spacing,
} from "../../../utils/responsive";

export default function Reservation() {
  const router = useRouter();

  // personal & reservation fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [partySize, setPartySize] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  // date + slots
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [slots, setSlots] = useState(() => generateSlots(new Date()));
  const [selectedSlot, setSelectedSlot] = useState(null);

  // dropdowns / modals kept for backward compatibility (buffet/venue etc)
  const [buffetModalVisible, setBuffetModalVisible] = useState(false);
  const [venueModalVisible, setVenueModalVisible] = useState(false);
  const buffetTypes = ["Breakfast", "Lunch", "Dinner"];
  const venueOptions = [
    { label: "Main Hall", value: "main_hall" },
    { label: "Private Room", value: "private_room" },
    { label: "Garden Area", value: "garden" },
  ];

  useEffect(() => {
    // regenerate dummy slots whenever date changes
    setSlots(generateSlots(date));
    setSelectedSlot(null);
  }, [date]);

  function formatDate(d) {
    try {
      return d.toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return d.toDateString();
    }
  }

  function formatTimeLabel(d) {
    return d.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  function generateSlots(baseDate) {
    const slotsArr = [];
    const day = baseDate.getDay(); // 0 = Sun, 6 = Sat

    const pushHourlyRange = (date, startHour, endHour) => {
      // generate 1-hour slots starting at startHour, up to but excluding endHour
      for (let h = startHour; h < endHour; h++) {
        const s = new Date(date);
        s.setHours(h, 0, 0, 0);
        slotsArr.push({
          id: slotsArr.length,
          time: s,
          label: formatTimeLabel(s),
          seats: 220,
          duration: "1 hour",
        });
      }
    };

    if (day === 0 || day === 6) {
      // Weekend buffet timings: 12pm–5pm and 6pm–9pm
      pushHourlyRange(baseDate, 12, 17); // 12,13,14,15,16
      pushHourlyRange(baseDate, 18, 21); // 18,19,20
    } else {
      // Weekdays: keep previous behavior, 8 hourly slots from 6pm
      const start = new Date(baseDate);
      start.setHours(18, 0, 0, 0);
      for (let i = 0; i < 8; i++) {
        const s = new Date(start.getTime() + i * 60 * 60 * 1000);
        slotsArr.push({
          id: slotsArr.length,
          time: s,
          label: formatTimeLabel(s),
          seats: 220,
          duration: "1 hour",
        });
      }
    }

    return slotsArr;
  }

  const renderDropdownModal = (
    visible,
    setVisible,
    items,
    selectedItem,
    setSelectedItem,
    title,
    isVenue = false
  ) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <ScrollView style={styles.menuList}>
            {items.map((item, index) => {
              const displayText = isVenue ? item.label : item;
              const itemValue = isVenue ? item.value : item;
              const isSelected = selectedItem === itemValue;

              return (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={() => {
                    setSelectedItem(itemValue);
                    setVisible(false);
                  }}
                >
                  <View style={styles.checkbox}>
                    {isSelected && <View style={styles.checked} />}
                  </View>
                  <Text style={styles.menuItemText}>{displayText}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => setVisible(false)}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const handleConfirmBooking = () => {
    console.log("Booking confirmed:", {
      fullName,
      email,
      phone,
      partySize,
      date,
      selectedSlot,
      specialRequest,
    });
    router.push("/(user)/bookings/event-history");
  };

  const handleReset = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setPartySize("");
    setDate(new Date());
    setSlots(generateSlots(new Date()));
    setSelectedSlot(null);
    setSpecialRequest("");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: spacing.md,
            paddingBottom: spacing.xl,
          }}
        >
          {/* Header Section */}
          <View style={styles.headerBanner}>
            <Text style={styles.headerTitle}>Reservation Details</Text>
          </View>

          {/* Top form row: Name / Email */}
          <View style={[styles.formCard, { paddingBottom: spacing.md }]}>
            <View style={styles.inputRow}>
              <View style={[styles.inputCol]}>
                <Text style={styles.label}>Full Name *</Text>
                <TextInput
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="John Doe"
                  placeholderTextColor="#b89a7e"
                  style={styles.input}
                />
              </View>

              <View style={[styles.inputCol]}>
                <Text style={styles.label}>Email Address *</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="john@example.com"
                  placeholderTextColor="#b89a7e"
                  keyboardType="email-address"
                  style={styles.input}
                />
              </View>
            </View>

            {/* Phone / Party Size */}
            <View style={styles.phoneInputRow}>
              <View style={[styles.inputCol]}>
                <PhoneInput
                  label="Phone Number *"
                  value={phone}
                  onChangeText={setPhone}
                  width={responsiveWidth(0.44)}
                />
              </View>

              <View style={[styles.inputCol]}>
                <Text style={styles.label}>Party Size *</Text>
                <TextInput
                  value={partySize}
                  onChangeText={setPartySize}
                  placeholder="1"
                  placeholderTextColor="#b89a7e"
                  keyboardType="number-pad"
                  style={styles.input}
                />
              </View>
            </View>

            {/* Reservation Date & buffet tag */}
            <View style={{ marginTop: spacing.md }}>
              <Text style={styles.label}>Reservation Date *</Text>
              <TouchableOpacity
                style={styles.dateRow}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateText}>📅 {formatDate(date)}</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Buffet Day</Text>
                </View>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) setDate(selectedDate);
                  }}
                />
              )}
            </View>

            {/* Time slots */}
            <View style={{ marginTop: spacing.md }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: spacing.xs,
                }}
              >
                <Text style={[styles.label, { marginBottom: 0 }]}>
                  Select Time Slot *
                </Text>
                <View style={styles.smallBadge}>
                  <Text style={styles.smallBadgeText}>1-hour buffet slots</Text>
                </View>
              </View>

              <View style={styles.slotList}>
                {slots.map((s) => {
                  const selected = selectedSlot && selectedSlot.id === s.id;
                  return (
                    <TouchableOpacity
                      key={s.id}
                      style={[
                        styles.slotItem,
                        selected ? styles.slotItemSelected : null,
                      ]}
                      onPress={() => setSelectedSlot(s)}
                    >
                      <Text
                        style={[
                          styles.slotTimeText,
                          selected ? { color: Colors.white } : null,
                        ]}
                      >
                        {s.label}
                      </Text>
                      <Text
                        style={[
                          styles.slotSeatsText,
                          selected ? { color: Colors.white } : null,
                        ]}
                      >
                        {s.seats} seats
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Special Requests */}
            <View style={{ marginTop: spacing.md }}>
              <Text style={styles.label}>Special Requests (Optional)</Text>
              <TextInput
                value={specialRequest}
                onChangeText={setSpecialRequest}
                placeholder="Dietary restrictions, celebration notes, seating preferences..."
                placeholderTextColor="#b89a7e"
                multiline
                numberOfLines={3}
                style={styles.textArea}
              />
            </View>

            {/* Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirmBooking}
              >
                <Text style={styles.confirmButtonText}>
                  Confirm Reservation
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleReset}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Payment Card (kept) */}
          <View style={styles.paymentCard}>
            <View style={styles.paymentHeader}>
              <Text style={styles.paymentIcon}>💳</Text>
              <Text style={styles.paymentTitle}>Secure Payment Options</Text>
            </View>
            <Text style={styles.paymentText}>
              Pay easily using credit, debit cards, mobile wallets, or on-site
              payment. Your reservation will be confirmed instantly once payment
              is processed.
            </Text>
            <TouchableOpacity
              style={styles.paymentButton}
              onPress={handleConfirmBooking}
            >
              <Text style={styles.paymentButtonText}>Confirm Booking</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Re-use dropdown modals if needed */}
      {renderDropdownModal(
        buffetModalVisible,
        setBuffetModalVisible,
        buffetTypes,
        null,
        () => {},
        "Select Buffet Type"
      )}

      {renderDropdownModal(
        venueModalVisible,
        setVenueModalVisible,
        venueOptions,
        null,
        () => {},
        "Select Venue",
        true
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },

  // Header
  headerBanner: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    alignItems: "flex-start",
  },
  headerTitle: {
    color: Colors.white,
    fontSize: responsiveFontSize(16),
    fontWeight: "900",
  },

  // Form Card (re-used)
  formCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: "#eadfd6",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 3,
  },

  // input row / columns
  inputRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  phoneInputRow: {},
  inputCol: { flex: 1 },
  input: {
    backgroundColor: Colors.primary,
    padding: spacing.sm,
    color: Colors.white,
    fontSize: responsiveFontSize(11),
    height: responsiveHeight(0.055),
  },
  label: {
    color: Colors.primary,
    fontSize: responsiveFontSize(8),
    fontWeight: "900",
    marginBottom: spacing.xs,
  },

  // date row
  dateRow: {
    backgroundColor: Colors.primary,
    padding: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateText: {
    color: Colors.cream,
    fontSize: responsiveFontSize(9),
    fontWeight: "700",
  },
  badge: {
    backgroundColor: "#ffedd5",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: "#b45309",
    fontSize: responsiveFontSize(8),
    fontWeight: "700",
  },

  smallBadge: {
    backgroundColor: "#fde1d8",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
  },
  smallBadgeText: {
    color: "#b45309",
    fontSize: responsiveFontSize(8),
    fontWeight: "700",
  },

  // slots
  slotList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  slotItem: {
    width: responsiveWidth(0.19), // changed from 0.28 -> fits 4 items per row
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#f3c6b7",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.sm,
    backgroundColor: Colors.white,
    alignItems: "center",
  },
  slotItemSelected: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  slotTimeText: {
    color: Colors.primary,
    fontSize: responsiveFontSize(9),
    fontWeight: "800",
    marginBottom: spacing.xs,
  },
  slotSeatsText: {
    color: "#6b7280",
    fontSize: responsiveFontSize(8),
  },

  // text area
  textArea: {
    backgroundColor: Colors.primary,
    padding: spacing.sm,
    color: Colors.white,
    fontSize: responsiveFontSize(11),
    textAlignVertical: "top",
    minHeight: responsiveHeight(0.1),
    marginTop: spacing.xs,
  },

  // Buttons
  buttonRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: Colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.sm,
  },
  confirmButtonText: {
    color: Colors.white,
    fontSize: responsiveFontSize(11),
    fontWeight: "800",
  },
  resetButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  resetButtonText: {
    color: Colors.white,
    fontSize: responsiveFontSize(11),
    fontWeight: "800",
  },

  // Payment Card
  paymentCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: "#eadfd6",
  },
  paymentHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  paymentIcon: { fontSize: responsiveFontSize(14) },
  paymentTitle: {
    color: "#6b7280",
    fontSize: responsiveFontSize(12),
    fontWeight: "700",
  },
  paymentText: {
    color: Colors.primary,
    fontSize: responsiveFontSize(9),
    opacity: 0.8,
    marginBottom: spacing.md,
  },
  paymentButton: {
    backgroundColor: Colors.secondary,
    padding: spacing.sm,
    alignItems: "center",
  },
  paymentButtonText: {
    color: Colors.white,
    fontSize: responsiveFontSize(11),
    fontWeight: "800",
  },

  // Modal Styles (re-used)
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: responsiveWidth(0.8),
    maxHeight: responsiveHeight(0.7),
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: spacing.md,
  },
  modalTitle: {
    fontSize: responsiveFontSize(12),
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: spacing.md,
    textAlign: "center",
  },
  menuList: {
    maxHeight: responsiveHeight(0.5),
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  checkbox: {
    width: responsiveFontSize(14),
    height: responsiveFontSize(14),
    borderWidth: 2,
    borderColor: Colors.primary,
    marginRight: spacing.sm,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    width: responsiveFontSize(8),
    height: responsiveFontSize(8),
    backgroundColor: Colors.primary,
    borderRadius: 1,
  },
  menuItemText: {
    fontSize: responsiveFontSize(10),
    color: Colors.primary,
    marginLeft: spacing.sm,
  },
  doneButton: {
    backgroundColor: Colors.primary,
    padding: spacing.sm,
    borderRadius: 10,
    marginTop: spacing.md,
    alignItems: "center",
  },
  doneButtonText: {
    color: "#FFFFFF",
    fontSize: responsiveFontSize(10),
    fontWeight: "600",
  },
});
