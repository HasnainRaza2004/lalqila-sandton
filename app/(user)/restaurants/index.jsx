import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RestaurantCard from "../../../components/user/RestaurantCard";
import RestaurantFilters from "../../../components/user/RestaurantFilters";
import { Colors } from "../../../constants/theme";
import { responsiveFontSize, responsiveWidth, spacing } from "../../../utils/responsive";

const MOCK_RESTAURANTS = [
  {
    id: "lalqila-sandton",
    name: "Lal Qila Sandton",
    location: "Sandton, Johannesburg",
    timings: "Mon–Sun · 12:00–22:00",
    banner: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200",
    logo: "https://images.unsplash.com/photo-1503602642458-232111445657?w=200",
    rating: 4.7,
    offer: "10% OFF Buffet",
    buffetType: "Dinner",
  },
  {
    id: "mughal-delights",
    name: "Mughal Delights",
    location: "Rosebank, Johannesburg",
    timings: "Tue–Sun · 11:00–21:30",
    banner: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200",
    logo: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=200",
    rating: 4.5,
    offer: "Weekend Brunch",
    buffetType: "Lunch",
  },
  {
    id: "royal-spice",
    name: "Royal Spice",
    location: "Melrose, Johannesburg",
    timings: "Wed–Mon · 13:00–23:00",
    banner: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1200",
    logo: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=200",
    rating: 4.2,
    offer: "Kids Eat Free Tue",
    buffetType: "Dinner",
  },
];

export default function RestaurantListing() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState(null);
  const [buffet, setBuffet] = useState(null);

  const filtered = useMemo(() => {
    let data = MOCK_RESTAURANTS;
    if (search?.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (r) => r.name.toLowerCase().includes(q) || r.location.toLowerCase().includes(q)
      );
    }
    if (location) data = data.filter((r) => r.location.includes(location));
    if (buffet) data = data.filter((r) => r.buffetType === buffet);
    return data;
  }, [search, location, buffet]);

  const clearFilters = () => {
    setSearch("");
    setLocation(null);
    setBuffet(null);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.lg }}>
        {/* Header */}
        <View style={styles.header}> 
          <Text style={styles.title}>Restaurants</Text>
          <Text style={styles.sub}>Discover and book your next meal</Text>
        </View>

        {/* Filters */}
        <View style={{ paddingHorizontal: spacing.md }}>
          <RestaurantFilters
            search={search}
            setSearch={setSearch}
            location={location}
            setLocation={setLocation}
            buffet={buffet}
            setBuffet={setBuffet}
            onClear={clearFilters}
            locations={["Sandton", "Rosebank", "Melrose"]}
            buffets={["Breakfast", "Lunch", "Dinner"]}
          />
        </View>

        {/* Result count */}
        <View style={styles.countRow}>
          <Text style={styles.countText}>{filtered.length} restaurants found</Text>
        </View>

        {/* Grid list */}
        <View style={{ paddingHorizontal: spacing.md }}>
          <FlatList
            data={filtered}
            renderItem={({ item }) => (
              <View style={styles.cardCol}>
                <RestaurantCard
                  item={item}
                  onPress={() => router.push({ pathname: "/(user)/restaurants/[id]", params: { id: item.id } })}
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
            numColumns={responsiveWidth(1) > 700 ? 3 : 1}
            columnWrapperStyle={responsiveWidth(1) > 700 ? { gap: spacing.sm } : undefined}
            ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginVertical: spacing.sm,
    marginHorizontal: spacing.sm,
    borderRadius: 8,
  },
  title: {
    color: Colors.white,
    fontSize: responsiveFontSize(20),
    fontWeight: "900",
  },
  sub: {
    color: Colors.white,
    opacity: 0.9,
    fontSize: responsiveFontSize(9),
    marginTop: 2,
  },
  countRow: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  countText: {
    color: Colors.primary,
    fontSize: responsiveFontSize(9),
    opacity: 0.8,
    fontWeight: "700",
  },
  cardCol: {
    flex: 1,
  },
});
