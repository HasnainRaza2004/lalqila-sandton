import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/theme";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  spacing,
} from "../../utils/responsive";

export const SetupCard = ({ image, title, capacity, price }) => {
    const router = useRouter();
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="cover" />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Capacity</Text>
            <Text style={styles.capacityText}>{capacity}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Price</Text>
            <Text style={styles.priceText}>{price}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(user)/notifications/notifications")}
        >
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: responsiveWidth(1) / 3 - spacing.md,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: spacing.sm,
  },
  imageContainer: {
    width: "100%",
    height: responsiveHeight(0.1),
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    padding: spacing.xs,
  },
  title: {
    color: Colors.primary,
    fontSize: responsiveFontSize(7),
    fontWeight: "900",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    // gap: spacing.sm,
    marginVertical: spacing.sm,
  },
  infoItem: {
    // alignItems: "flex-start",
  },
  label: {
    color: Colors.primary,
    fontSize: responsiveFontSize(8),
  },
  capacityText: {
    color: Colors.primary,
    fontSize: responsiveFontSize(8),
  },
  priceText: {
    color: Colors.primary,
    fontSize: responsiveFontSize(8),
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: spacing.xs,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: responsiveFontSize(8),
  },
});
