import { ChevronDown } from "lucide-react-native";
import { useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/theme";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  spacing,
} from "../../utils/responsive";

export const BuffetCustomizer = () => {
  const [bbqSelected, setBbqSelected] = useState(false);
  const [dessertSelected, setDessertSelected] = useState(false);
  const [starterModalVisible, setStarterModalVisible] = useState(false);
  const [mainCourseModalVisible, setMainCourseModalVisible] = useState(false);
  const [selectedStarters, setSelectedStarters] = useState([]);
  const [selectedMainCourse, setSelectedMainCourse] = useState([]);

  const starterItems = [
    "Vegetable Spring Rolls",
    "Chicken Tikka",
    "Paneer Tikka",
    "Fish Amritsari",
    "Mushroom Manchurian",
    "Seekh Kebab"
  ];

  const mainCourseItems = [
    "Butter Chicken",
    "Palak Paneer",
    "Dal Makhani",
    "Biryani",
    "Mixed Vegetable Curry",
    "Lamb Rogan Josh"
  ];

  const renderDropdownModal = (visible, setVisible, items, selectedItems, setSelectedItems, title) => (
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
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => {
                  const isSelected = selectedItems.includes(item);
                  if (isSelected) {
                    setSelectedItems(selectedItems.filter(i => i !== item));
                  } else {
                    setSelectedItems([...selectedItems, item]);
                  }
                }}
              >
                <View style={styles.checkbox}>
                  {selectedItems.includes(item) && <View style={styles.checked} />}
                </View>
                <Text style={styles.menuItemText}>{item}</Text>
              </TouchableOpacity>
            ))}
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customized Your Buffet</Text>

      {/* Starter Dropdown */}
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setStarterModalVisible(true)}
        >
          <Text style={styles.dropdownText}>
            {selectedStarters.length ? `${selectedStarters.length} Starters Selected` : "Select Starters"}
          </Text>
          <ChevronDown size={18} color={Colors.primary} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Main Course Dropdown */}
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setMainCourseModalVisible(true)}
        >
          <Text style={styles.dropdownText}>
            {selectedMainCourse.length ? `${selectedMainCourse.length} Main Course Selected` : "Select Main Course"}
          </Text>
          <ChevronDown size={18} color={Colors.primary} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {renderDropdownModal(
        starterModalVisible,
        setStarterModalVisible,
        starterItems,
        selectedStarters,
        setSelectedStarters,
        "Select Starters"
      )}

      {renderDropdownModal(
        mainCourseModalVisible,
        setMainCourseModalVisible,
        mainCourseItems,
        selectedMainCourse,
        setSelectedMainCourse,
        "Select Main Course"
      )}

      {/* Selected Items */}
      <View style={styles.selectedItems}>
        <TouchableOpacity 
          style={styles.checkboxRow} 
          onPress={() => setBbqSelected(!bbqSelected)}
        >
          <View style={styles.checkbox}>
            {bbqSelected && <View style={styles.checked} />}
          </View>
          <Text style={styles.itemText}>Add Live BBQ Station</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.checkboxRow} 
          onPress={() => setDessertSelected(!dessertSelected)}
        >
          <View style={styles.checkbox}>
            {dessertSelected && <View style={styles.checked} />}
          </View>
          <Text style={styles.itemText}>Include Dessert Corner</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
  },
  title: {
    color: Colors.primary,
    fontWeight: "800",
    fontSize: responsiveFontSize(10),
  },
  dropdownContainer: {
    marginVertical: spacing.xs,
  },
  dropdown: {
    height: responsiveHeight(0.04),
    borderColor: Colors.grey,
    borderWidth: .2,
    borderRadius: 2,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  dropdownText: {
    color: Colors.primary,
    fontSize: responsiveFontSize(9),
    fontWeight: "500",
  },
  selectedItems: {
    borderRadius: 4,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xs,
  },
  checkbox: {
    width: responsiveFontSize(14),
    height: responsiveFontSize(14),
    borderWidth: 2,
    borderColor: Colors.primary,
    marginRight: spacing.sm,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    width: responsiveFontSize(8),
    height: responsiveFontSize(8),
    backgroundColor: Colors.primary,
    borderRadius: 1,
  },
  itemText: {
    color: Colors.primary,
    fontSize: responsiveFontSize(10),
    lineHeight: responsiveHeight(0.025),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: responsiveWidth(0.8),
    maxHeight: responsiveHeight(0.7),
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: spacing.md,
  },
  modalTitle: {
    fontSize: responsiveFontSize(12),
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  menuList: {
    maxHeight: responsiveHeight(0.5),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    fontSize: responsiveFontSize(10),
    color: Colors.primary,
    marginLeft: spacing.sm,
  },
  doneButton: {
    backgroundColor: Colors.primary,
    padding: spacing.sm,
    borderRadius: 4,
    marginTop: spacing.md,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(10),
    fontWeight: '600',
  },
});
