import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/theme";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
    spacing,
} from "../../utils/responsive";

export default function RestaurantCard({
  item,
  onPress,
}) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: item.banner || item.image || "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800" }}
          style={styles.image}
          resizeMode="cover"
        />
        {item.logo ? (
          <Image source={{ uri: item.logo }} style={styles.logo} />
        ) : null}
        {item.offer ? (
          <View style={styles.offerBadge}>
            <Text style={styles.offerText}>{item.offer}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.body}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.meta} numberOfLines={1}>
            {item.location}
          </Text>
          <Text style={styles.meta} numberOfLines={1}>
            {item.timings}
          </Text>
        </View>
        {typeof item.rating === "number" ? (
          <View style={styles.rating}>
            <Text style={styles.ratingText}>⭐ {item.rating.toFixed(1)}</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#eadfd6",
    width: "100%",
  },
  imageWrap: {
    width: "100%",
    height: responsiveHeight(0.18),
    backgroundColor: Colors.cream,
  },
  image: { width: "100%", height: "100%" },
  logo: {
    position: "absolute",
    bottom: spacing.sm,
    left: spacing.sm,
    width: responsiveWidth(0.12),
    height: responsiveWidth(0.12),
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
  },
  offerBadge: {
    position: "absolute",
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: Colors.secondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
  },
  offerText: {
    color: Colors.white,
    fontWeight: "800",
    fontSize: responsiveFontSize(8.5),
  },
  body: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.md,
  },
  name: {
    color: Colors.primary,
    fontSize: responsiveFontSize(12),
    fontWeight: "900",
    marginBottom: 2,
  },
  meta: {
    color: Colors.primary,
    opacity: 0.75,
    fontSize: responsiveFontSize(9),
  },
  rating: {
    backgroundColor: Colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    color: Colors.white,
    fontWeight: "800",
    fontSize: responsiveFontSize(9),
  },
});
