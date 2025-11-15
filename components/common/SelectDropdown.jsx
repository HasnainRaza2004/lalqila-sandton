import { useState } from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors } from "../../constants/theme";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
    spacing,
} from "../../utils/responsive";

export default function SelectDropdown({
  label,
  value,
  onSelect,
  options = [],
  placeholder = "Select",
  compact = false,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={[styles.wrapper, compact && styles.wrapperCompact]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TouchableOpacity
        style={[styles.trigger, compact && styles.triggerCompact]}
        onPress={() => setVisible(true)}
      >
        <Text style={[styles.triggerText, compact && styles.triggerTextCompact]}>{value ?? placeholder}</Text>
      </TouchableOpacity>

      <Modal
        transparent
        visible={visible}
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>{label || "Select"}</Text>
            <ScrollView style={styles.list}>
              {options.map((opt, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.item}
                  onPress={() => {
                    onSelect(opt);
                    setVisible(false);
                  }}
                >
                  <Text style={styles.itemText}>{opt.label ?? opt}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: spacing.sm },
  wrapperCompact: { marginBottom: spacing.xs },
  label: {
    color: Colors.primary,
    fontSize: responsiveFontSize(10),
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  trigger: {
    backgroundColor: Colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 5,
    borderRadius: 3,
  },
  triggerCompact: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs + 2,
    borderRadius: 3,
  },
  triggerText: { color: Colors.placeHolderGrey, fontSize: responsiveFontSize(13) },
  triggerTextCompact: { fontSize: responsiveFontSize(10.5) },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: responsiveWidth(0.85),
    maxHeight: responsiveHeight(0.7),
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: spacing.md,
  },
  modalTitle: {
    textAlign: "center",
    color: Colors.primary,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  list: { marginBottom: spacing.sm },
  item: {
    paddingVertical: spacing.sm,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  itemText: { color: Colors.primary, fontSize: responsiveFontSize(10) },
  closeBtn: { marginTop: spacing.sm, alignItems: "center" },
  closeText: { color: Colors.primary, fontWeight: "700" },
});
