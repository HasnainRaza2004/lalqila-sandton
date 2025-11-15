import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/theme";
import { responsiveFontSize, spacing } from "../../utils/responsive";
import FormInput from "../common/FormInput";
import SelectDropdown from "../common/SelectDropdown";

export default function RestaurantFilters({
  search,
  setSearch,
  location,
  setLocation,
  buffet,
  setBuffet,
  onClear,
  locations = [],
  buffets = [],
}) {
  const locationOptions = useMemo(
    () => locations.map((l) => ({ label: l, value: l })),
    [locations]
  );
  const buffetOptions = useMemo(
    () => buffets.map((b) => ({ label: b, value: b })),
    [buffets]
  );

  return (
    <View style={styles.wrap}>
      <FormInput
        label="Search"
        value={search}
        onChangeText={setSearch}
        placeholder="Search restaurants, cuisines..."
        compact
      />
      <View style={styles.row}>
        <View style={styles.col}>
          <SelectDropdown
            label="Location"
            value={location}
            onSelect={(opt) => setLocation(opt.value || opt.label)}
            options={locationOptions}
            placeholder="Any"
            compact
          />
        </View>
        <View style={styles.col}>
          <SelectDropdown
            label="Buffet Type"
            value={buffet}
            onSelect={(opt) => setBuffet(opt.value || opt.label)}
            options={buffetOptions}
            placeholder="All"
            compact
          />
        </View>
      </View>
      <TouchableOpacity onPress={onClear} style={styles.clearBtn}>
        <Text style={styles.clearText}>Clear filters</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: "#eadfd6",
    marginBottom: spacing.xs,
  },
  row: { flexDirection: "row", gap: spacing.xs },
  col: { flex: 1 },
  clearBtn: {
    alignSelf: "flex-end",
    marginTop: spacing.xs,
    paddingVertical: 4,
    paddingHorizontal: 0,
  },
  clearText: {
    color: Colors.blue,
    fontWeight: "800",
    fontSize: responsiveFontSize(8.5),
  },
});
