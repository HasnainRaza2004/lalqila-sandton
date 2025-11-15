import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../constants/theme";
import { responsiveFontSize, responsiveHeight, responsiveWidth, spacing } from "../../../utils/responsive";

const MOCK_RESTAURANTS = [
  {
    id: "lalqila-sandton",
    name: "Lal Qila Sandton",
    location: "Sandton, Johannesburg",
    timings: "Mon–Sun · 12:00–22:00",
    banner: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200",
    logo: "https://images.unsplash.com/photo-1503602642458-232111445657?w=200",
    rating: 4.7,
    offerTags: ["10% OFF Buffet", "Free Dessert"],
    buffetTypes: ["Lunch", "Dinner"],
    bookingTypes: ["Table", "Private Room", "Event"],
    branches: [
      { name: "Sandton Central", address: "123 Maude St, Sandton" },
      { name: "Sandton West", address: "45 Grayston Dr, Sandton" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200",
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1200",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200",
    ],
    description:
      "Experience authentic Mughlai flavors with a contemporary ambiance. Premium buffet with live stations and curated desserts.",
  },
  {
    id: "mughal-delights",
    name: "Mughal Delights",
    location: "Rosebank, Johannesburg",
    timings: "Tue–Sun · 11:00–21:30",
    banner: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200",
    logo: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=200",
    rating: 4.5,
    offerTags: ["Weekend Brunch"],
    buffetTypes: ["Breakfast", "Lunch"],
    bookingTypes: ["Table", "Event"],
    branches: [{ name: "Rosebank Mall", address: "Oxford Rd, Rosebank" }],
    gallery: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200",
      "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=1200",
    ],
    description: "Traditional cuisine with a modern twist. Fresh, flavorful, and family-friendly.",
  },
];

export default function RestaurantDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const data = useMemo(() => {
    return (
      MOCK_RESTAURANTS.find((r) => r.id === id) || MOCK_RESTAURANTS[0]
    );
  }, [id]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.lg }}>
        {/* Banner */}
        <View style={styles.bannerWrap}>
          <Image source={{ uri: data.banner }} style={styles.banner} />
          {data.logo ? <Image source={{ uri: data.logo }} style={styles.logo} /> : null}
        </View>

        {/* Heading */}
        <View style={styles.headCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{data.name}</Text>
            <Text style={styles.meta}>{data.location}</Text>
            <Text style={styles.meta}>{data.timings}</Text>
          </View>
          <View style={styles.rating}>
            <Text style={styles.ratingText}>⭐ {data.rating.toFixed(1)}</Text>
          </View>
        </View>

        {/* Reserve CTA */}
        <View style={styles.ctaRow}>
          <TouchableOpacity
            style={styles.ctaBtn}
            onPress={() => router.push("/(user)/bookings/reservation")}
          >
            <Text style={styles.ctaText}>Reserve a Table</Text>
          </TouchableOpacity>
        </View>

        {/* Offers */}
        {data.offerTags?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Offers</Text>
            <View style={styles.chipsRow}>
              {data.offerTags.map((t, i) => (
                <View key={i} style={[styles.chip, { backgroundColor: Colors.secondary }]}> 
                  <Text style={[styles.chipText, { color: Colors.white }]}>{t}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {/* Buffet Types */}
        {data.buffetTypes?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Buffet Types</Text>
            <View style={styles.chipsRow}>
              {data.buffetTypes.map((t, i) => (
                <View key={i} style={styles.chip}>
                  <Text style={styles.chipText}>{t}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {/* Booking Types */}
        {data.bookingTypes?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Booking Types</Text>
            <View style={styles.chipsRow}>
              {data.bookingTypes.map((t, i) => (
                <View key={i} style={styles.chipAlt}>
                  <Text style={styles.chipAltText}>{t}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {/* About */}
        {data.description ? (
          <View style={styles.section}> 
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.aboutText}>{data.description}</Text>
          </View>
        ) : null}

        {/* Branches */}
        {data.branches?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Branches</Text>
            {data.branches.map((b, i) => (
              <View key={i} style={styles.branchRow}>
                <Text style={styles.branchName}>{b.name}</Text>
                <Text style={styles.branchAddr}>{b.address}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {/* Gallery */}
        {data.gallery?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Gallery</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm }}>
              {data.gallery.map((g, i) => (
                <Image key={i} source={{ uri: g }} style={styles.galleryImg} />
              ))}
            </ScrollView>
          </View>
        ) : null}

        {/* Bottom CTA again */}
        <View style={[styles.ctaRow, { marginTop: spacing.md, marginBottom: spacing.lg }]}> 
          <TouchableOpacity
            style={styles.ctaBtn}
            onPress={() => router.push("/(user)/bookings/reservation")}
          >
            <Text style={styles.ctaText}>Proceed to Reservation</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  bannerWrap: { width: "100%", height: responsiveHeight(0.25), backgroundColor: Colors.cream },
  banner: { width: "100%", height: "100%" },
  logo: {
    position: "absolute",
    bottom: -responsiveWidth(0.06),
    left: spacing.md,
    width: responsiveWidth(0.18),
    height: responsiveWidth(0.18),
    borderRadius: 10,
    borderWidth: 3,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
  },
  headCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: spacing.md,
    marginTop: responsiveWidth(0.08),
    marginHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: "#eadfd6",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  title: { color: Colors.primary, fontSize: responsiveFontSize(16), fontWeight: "900" },
  meta: { color: Colors.primary, opacity: 0.75, fontSize: responsiveFontSize(9) },
  rating: { backgroundColor: Colors.primary, paddingHorizontal: spacing.md, paddingVertical: 8, borderRadius: 10 },
  ratingText: { color: Colors.white, fontWeight: "800", fontSize: responsiveFontSize(10) },
  ctaRow: { paddingHorizontal: spacing.md, marginTop: spacing.sm },
  ctaBtn: { backgroundColor: Colors.secondary, padding: spacing.sm, borderRadius: 10, alignItems: "center" },
  ctaText: { color: Colors.white, fontWeight: "800", fontSize: responsiveFontSize(11) },

  section: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: spacing.md,
    marginTop: spacing.sm,
    marginHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: "#eadfd6",
  },
  sectionTitle: {
    color: Colors.primary,
    fontSize: responsiveFontSize(12),
    fontWeight: "900",
    marginBottom: spacing.xs,
  },
  chipsRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  chip: { backgroundColor: Colors.primary, paddingHorizontal: spacing.md, paddingVertical: 6, borderRadius: 999 },
  chipText: { color: Colors.white, fontWeight: "800", fontSize: responsiveFontSize(9) },
  chipAlt: { backgroundColor: "#fde1d8", paddingHorizontal: spacing.md, paddingVertical: 6, borderRadius: 999 },
  chipAltText: { color: Colors.primary, fontWeight: "800", fontSize: responsiveFontSize(9) },

  aboutText: { color: Colors.primary, opacity: 0.85, fontSize: responsiveFontSize(9), lineHeight: 20 },
  branchRow: { marginTop: spacing.xs },
  branchName: { color: Colors.primary, fontWeight: "900", fontSize: responsiveFontSize(10) },
  branchAddr: { color: Colors.primary, opacity: 0.8, fontSize: responsiveFontSize(9) },
  galleryImg: { width: responsiveWidth(0.5), height: responsiveHeight(0.18), borderRadius: 12 },
});
