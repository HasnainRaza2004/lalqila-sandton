import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/theme";
import { responsiveFontSize, responsiveHeight, spacing } from "../../utils/responsive";

export default function TextArea({ label, value, onChangeText, placeholder }) {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.placeHolderGrey}
        style={styles.textarea}
        multiline
        numberOfLines={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: spacing.md },
  label: {
    color: Colors.primary,
    fontSize: responsiveFontSize(10),
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  textarea: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    borderRadius: 8,
    padding: spacing.sm,
    fontSize: responsiveFontSize(11),
    minHeight: responsiveHeight(0.12),
    textAlignVertical: "top",
  },
});