import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import { Colors } from "../../constants/theme";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  spacing,
} from "../../utils/responsive";
import FormInput from "./FormInput";

export default function PhoneInput({
  label,
  prefix = "+27",
  value,
  onChangeText,
  onChangePrefix, // optional callback when country code changes
}) {
  const [country, setCountry] = useState({ cca2: "ZA", callingCode: ["27"] });
  const [localPrefix, setLocalPrefix] = useState(prefix);

  useEffect(() => {
    if (prefix && prefix !== localPrefix) {
      setLocalPrefix(prefix);
      // keep cca2 as ZA when unknown; country picker will let user choose properly
      if (prefix.replace) {
        const p = prefix.replace("+", "");
        setCountry((c) => ({ ...c, callingCode: [p] }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefix]);

  const onSelect = (c) => {
    setCountry(c);
    const code = `+${(c.callingCode && c.callingCode[0]) || ""}`;
    setLocalPrefix(code);
    if (typeof onChangePrefix === "function") onChangePrefix(code);
  };

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.row}>
        <View style={styles.codeBox}>
          {/* CountryPicker renders a pressable flag + name; withCallingCode shows code in picker */}
          <CountryPicker
            withFilter
            withFlag
            withCallingCode
            withEmoji={false}
            onSelect={onSelect}
            countryCode={country.cca2 || "ZA"}
            translation="eng"
          />
          <Text style={styles.codeText}>{localPrefix}</Text>
        </View>

        <FormInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          width={responsiveWidth(0.53)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  row: { flexDirection: "row" },
  codeBox: {
    backgroundColor: Colors.primary,
    paddingHorizontal: spacing.md,
    height: responsiveHeight(0.055),
    justifyContent: "center",
    borderRadius: 3,
    marginRight: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
  },
  codeText: {
    color: Colors.placeHolderGrey,
    fontSize: responsiveFontSize(13),
    paddingLeft: 8,
  },
  label: {
    color: Colors.primary,
    fontSize: responsiveFontSize(10),
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
});
