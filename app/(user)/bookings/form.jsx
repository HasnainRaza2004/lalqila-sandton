import { format as formatDate } from "date-fns";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import CheckboxGroup from "../../../components/common/CheckboxGroup";
import FormInput from "../../../components/common/FormInput";
import PhoneInput from "../../../components/common/PhoneInput";
import SelectDropdown from "../../../components/common/SelectDropdown";
import TextArea from "../../../components/common/TextArea";
import { Colors } from "../../../constants/theme";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  spacing,
} from "../../../utils/responsive";

export default function BookingForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventType, setEventType] = useState(null);
  const [eventDate, setEventDate] = useState("");
  const [eventDateObj, setEventDateObj] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [guestCount, setGuestCount] = useState("");
  const [venue, setVenue] = useState("");
  const [menuType, setMenuType] = useState(null);
  const [cuisines, setCuisines] = useState([]);
  const [services, setServices] = useState([]);
  const [notes, setNotes] = useState("");

  const router = useRouter();
  const eventOptions = [
    "Wedding",
    "Birthday",
    "Corporate",
    "Anniversary",
    "Other",
  ];
  const menuOptions = ["Buffet", "Set Menu", "Plated", "BBQ"];
  const cuisineOptions = ["Pakistani", "Continental", "Chinese", "BBQ"];
  const serviceOptions = [
    "Venue Decoration",
    "Music Setup",
    "Photography",
    "Lighting",
  ];

  const handleConfirm = (date) => {
    // show both date and time in input (e.g. "24 Oct 2025, 03:30 PM")
    setEventDate(formatDate(date, "dd MMM yyyy, hh:mm a"));
    setEventDateObj(date);
    setShowDatePicker(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionTitle}>Personal Detail</Text>
        <FormInput
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full Name"
        />
        <FormInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email Address"
          keyboardType="email-address"
        />
        <PhoneInput value={phone} onChangeText={setPhone} />

        <Text style={styles.sectionTitle}>Event Information</Text>
        <SelectDropdown
          value={eventType}
          onSelect={(v) => setEventType(v)}
          options={eventOptions}
          placeholder="Event Type"
        />
        <View style={styles.row}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowDatePicker(true)}
            style={styles.dateInput}
          >
            <Text style={styles.dateText}>
              {eventDate ? eventDate : "Event Date & Time"}
            </Text>
          </TouchableOpacity>
          <FormInput
            value={guestCount}
            onChangeText={setGuestCount}
            placeholder="Number Of Guests"
            keyboardType="number-pad"
            width={responsiveWidth(0.32)}
          />
        </View>
        <DateTimePickerModal
          isVisible={showDatePicker}
          mode="datetime"
          // spinner gives the wheel UI like your screenshots; on Android behavior may vary by device.
          display="spinner"
          is24Hour={false}
          onConfirm={handleConfirm}
          onCancel={() => setShowDatePicker(false)}
        />
        <FormInput
          value={venue}
          onChangeText={setVenue}
          placeholder="Event Venue"
        />

        <Text style={styles.sectionTitle}>Catering & Setup Details</Text>
        <SelectDropdown
          value={menuType}
          onSelect={(v) => setMenuType(v)}
          options={menuOptions}
          placeholder="Select Menu Type"
        />
        <View style={styles.checkboxGroup}>
          <CheckboxGroup
            label="Cuisine Preference"
            options={cuisineOptions}
            selected={cuisines}
            onChange={setCuisines}
          />
          <CheckboxGroup
            label="Additional Services"
            options={serviceOptions}
            selected={services}
            onChange={setServices}
          />
        </View>

        <Text style={styles.sectionTitle}>Additional Notes</Text>
        <TextArea
          label=""
          value={notes}
          onChangeText={setNotes}
          placeholder="Special Instructions or Theme Preference"
        />

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => {
            /* submit handler */
          }}
        >
          <Text style={styles.submitText} >Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  sectionTitle: {
    color: Colors.primary,
    fontSize: responsiveFontSize(14),
    fontWeight: "900",
    marginBottom: spacing.xs,
    lineHeight: 20,
  },
  dateInput: {
    width: responsiveWidth(0.49),
    height: responsiveHeight(0.056),
    backgroundColor: Colors.primary,
    borderRadius: 3,
    paddingHorizontal: spacing.md,
    justifyContent: "center",
  },
  dateText: {
    color: "#fff",
    fontSize: responsiveFontSize(13),
  },
  row: {
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "space-between",
  },
  checkboxGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: responsiveHeight(0.015),
    borderRadius: 5,
    alignItems: "center",
    width: responsiveWidth(0.3),
    alignSelf: "flex-end",
  },
  submitText: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: responsiveFontSize(14),
  },
});
