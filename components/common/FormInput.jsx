import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/theme";
import {
  responsiveFontSize,
  responsiveHeight,
  spacing,
} from "../../utils/responsive";

export default function FormInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  secureTextEntry = false,
  prefix,
  multiline = false,
  numberOfLines = 1,
  width = "100%",
  bgColor = Colors.primary,
}) {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.inputRow, { backgroundColor: bgColor }]}>
        {prefix ? <View style={styles.prefix}>{prefix}</View> : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.placeHolderGrey}
          placeHolderFontSize={responsiveFontSize(11)}
          style={[styles.input, multiline && styles.multiline, { width }]}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.sm,
  },
  label: {
    color: Colors.primary,
    fontSize: responsiveFontSize(10),
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 3,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 5,
    borderWidth: 1,
    borderColor: "#eadfd6",
  },
  prefix: {
    backgroundColor: Colors.dark?.background || "#fff",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
    marginRight: spacing.sm,
  },
  input: {
    width: "100%",
    color: Colors.placeHolderGrey,
    fontSize: responsiveFontSize(13),
    padding: 0,
    
  },
  multiline: {
    minHeight: responsiveHeight(0.08),
    textAlignVertical: "top",
  },
});
