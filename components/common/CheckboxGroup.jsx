import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/theme";
import {
  responsiveFontSize,
  responsiveWidth,
  spacing,
} from "../../utils/responsive";

export default function CheckboxGroup({
  label,
  options = [],
  selected = [],
  onChange,
}) {
  const toggle = (opt) => {
    const exists = selected.includes(opt);
    onChange(exists ? selected.filter((s) => s !== opt) : [...selected, opt]);
  };

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.row}>
        {options.map((opt, i) => (
          <TouchableOpacity
            key={i}
            style={styles.option}
            onPress={() => toggle(opt)}
          >
            <View style={[styles.checkbox]}>
              {selected.includes(opt) && <View style={styles.checked} />}
            </View>
            <Text style={styles.optText} numberOfLines={0}>
              {opt}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
    width: responsiveWidth(0.5),
  },
  label: {
    color: Colors.primary,
    fontSize: responsiveFontSize(10),
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  row: {
    flexDirection: "column",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
    marginBottom: spacing.xs,
    maxWidth: "100%",
  },
  checkbox: {
    width: responsiveFontSize(12),
    height: responsiveFontSize(12),
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    width: responsiveFontSize(12),
    height: responsiveFontSize(12),
    backgroundColor: Colors.primary,
    borderRadius: 1,
  },
  inner: {
    width: responsiveFontSize(6),
    height: responsiveFontSize(6),
    backgroundColor: "#fff",
    borderRadius: 1,
  },
  optText: {
    color: Colors.primary,
    fontSize: responsiveFontSize(10),
    marginLeft: spacing.xs,
    flexShrink: 1,
    flexWrap: "wrap",
  },
});
