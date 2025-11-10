import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { ChevronDown } from "lucide-react-native";
import { useState } from "react";
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
import { Colors } from "../../../constants/theme";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
    spacing,
} from "../../../utils/responsive";

export default function Reservation() {
  const router = useRouter();
  const [buffetType, setBuffetType] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [guests, setGuests] = useState("");
  const [venue, setVenue] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  // Modal states
  const [buffetModalVisible, setBuffetModalVisible] = useState(false);
  const [guestsModalVisible, setGuestsModalVisible] = useState(false);
  const [venueModalVisible, setVenueModalVisible] = useState(false);

  const buffetTypes = ["Breakfast", "Lunch", "Dinner"];
  const guestOptions = [...Array(20)].map((_, i) => String(i + 1));
  const venueOptions = [
    { label: "Main Hall", value: "main_hall" },
    { label: "Private Room", value: "private_room" },
    { label: "Garden Area", value: "garden" },
  ];

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
      buffetType,
      date,
      time,
      guests,
      venue,
      specialRequest,
    });
    router.push("/(user)/bookings/event-history");
  };

  const handleReset = () => {
    setBuffetType("");
    setDate(new Date());
    setTime(new Date());
    setGuests("");
    setVenue("");
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
            <Text style={styles.headerTitle}>Book Your Reservation</Text>
          </View>

          <View style={styles.subHeader}>
            <Text style={styles.subHeaderTitle}>
              Reserve Your Table, Taste Luxury,{"\n"}One Bite at a Time
            </Text>
            <Text style={styles.subHeaderText}>
              Experience the finest buffet dining with instant booking,{"\n"}
              flexible timing, and curated cuisines - all in one place
            </Text>
          </View>

          {/* Reservation Form */}
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Make a Reservation</Text>

            {/* Row 1: Buffet Type | Date & Time */}
            <View style={styles.formRow}>
              <View style={[styles.inputGroup, styles.col]}>
                <Text style={styles.label}>Select Buffet Type</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setBuffetModalVisible(true)}
                >
                  <Text style={styles.dropdownText}>
                    {buffetType || "Select Buffet Type"}
                  </Text>
                  <ChevronDown size={15} color={Colors.white} strokeWidth={2} />
                </TouchableOpacity>
              </View>

              <View style={[styles.inputGroup, styles.col]}>
                <Text style={styles.label}>Choose Date & Time</Text>
                <View style={styles.inlineRow}>
                  <TouchableOpacity
                    style={[styles.dateTimeButton, styles.flex1]}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text style={styles.dateTimeIcon}>📅</Text>
                    <Text style={styles.dateTimeText}>Date</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.dateTimeButton, styles.flex1]}
                    onPress={() => setShowTimePicker(true)}
                  >
                    <Text style={styles.dateTimeIcon}>🕐</Text>
                    <Text style={styles.dateTimeText}>Time</Text>
                  </TouchableOpacity>
                </View>
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
                {showTimePicker && (
                  <DateTimePicker
                    value={time}
                    mode="time"
                    display="default"
                    onChange={(event, selectedTime) => {
                      setShowTimePicker(false);
                      if (selectedTime) setTime(selectedTime);
                    }}
                  />
                )}
              </View>
            </View>

            {/* Row 2: Guests | Venue */}
            <View style={styles.formRow}>
              <View style={[styles.inputGroup, styles.col]}>
                <Text style={styles.label}>Number of Guests</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setGuestsModalVisible(true)}
                >
                  <Text style={styles.dropdownText}>
                    {guests || "Select Guests"}
                  </Text>
                  <ChevronDown
                    size={18}
                    color={Colors.primary}
                    strokeWidth={2}
                  />
                </TouchableOpacity>
              </View>

              <View style={[styles.inputGroup, styles.col]}>
                <Text style={styles.label}>Select Venue</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setVenueModalVisible(true)}
                >
                  <Text style={styles.dropdownText}>
                    {venueOptions.find((v) => v.value === venue)?.label ||
                      "Select Venue"}
                  </Text>
                  <ChevronDown
                    size={18}
                    color={Colors.primary}
                    strokeWidth={2}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Row 3: Special Request (full width) */}
            <View style={[styles.inputGroup]}>
              <Text style={styles.label}>Special Request</Text>
              <TextInput
                value={specialRequest}
                onChangeText={setSpecialRequest}
                placeholder="Add notes or Preferences"
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
                <Text style={styles.confirmButtonText}>Confirm Booking</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleReset}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Payment Section */}
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

      {/* Modals */}
      {renderDropdownModal(
        buffetModalVisible,
        setBuffetModalVisible,
        buffetTypes,
        buffetType,
        setBuffetType,
        "Select Buffet Type"
      )}

      {renderDropdownModal(
        guestsModalVisible,
        setGuestsModalVisible,
        guestOptions,
        guests,
        setGuests,
        "Number of Guests"
      )}

      {renderDropdownModal(
        venueModalVisible,
        setVenueModalVisible,
        venueOptions,
        venue,
        setVenue,
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
    alignItems: "center",
  },
  headerTitle: {
    color: Colors.white,
    fontSize: responsiveFontSize(16),
    fontWeight: "900",
  },

  // Subheader
  subHeader: {
    backgroundColor: Colors.cream,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: "#eadfd6",
  },
  subHeaderTitle: {
    color: Colors.primary,
    fontSize: responsiveFontSize(12),
    fontWeight: "800",
    marginBottom: spacing.xs,
  },
  subHeaderText: {
    color: Colors.primary,
    fontSize: responsiveFontSize(9),
    opacity: 0.8,
  },

  // Form Card
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
  formTitle: {
    color: Colors.primary,
    fontSize: responsiveFontSize(15),
    fontWeight: "900",
    marginBottom: spacing.md,
  },

  // Grid
  formRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  col: { flex: 1 },
  inlineRow: { flexDirection: "row", gap: spacing.xs },
  flex1: { flex: 1 },

  // Inputs
  inputGroup: { marginBottom: spacing.xs },
  label: {
    color: Colors.primary,
    fontSize: responsiveFontSize(8),
    fontWeight: "900",
    marginBottom: spacing.xs,
  },
  dropdown: {
    height: responsiveHeight(0.04),
    borderColor: Colors.grey,
    borderWidth: 0.2,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  dropdownText: {
    color: Colors.white,
    fontSize: responsiveFontSize(8),
    fontWeight: "500",
  },

  // Date/Time Buttons
  dateTimeButton: {
    backgroundColor: Colors.primary,
    padding: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    height: responsiveHeight(0.04),
  },
  dateTimeIcon: { fontSize: responsiveFontSize(8) },
  dateTimeText: {
    color: Colors.cream,
    fontSize: responsiveFontSize(8),
    fontWeight: "600",
  },

  // Text Area (full width row)
  textArea: {
    backgroundColor: Colors.primary,
    padding: spacing.sm,
    color: Colors.white,
    fontSize: responsiveFontSize(11),
    textAlignVertical: "top",
    minHeight: responsiveHeight(0.1),
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

  // Modal Styles
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
