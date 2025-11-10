import { parse } from "date-fns";
import { ChevronDown, Star } from "lucide-react-native";
import { useMemo, useState } from "react";
import {
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../constants/theme";
import {
    responsiveFontSize,
    responsiveHeight,
    spacing,
} from "../../../utils/responsive";

export default function EventHistory() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [showSortPicker, setShowSortPicker] = useState(false);

  const sortOptions = [
    { key: "recent", label: "Most Recent" },
    { key: "oldest", label: "Oldest" },
    { key: "highest", label: "Highest Rated" },
    { key: "lowest", label: "Lowest Rated" },
    { key: "venue_az", label: "Venue A–Z" },
  ];

  const events = useMemo(() => [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400",
      title: "Wedding Reception at LAL Qila",
      date: "12 May 2025",
      time: "2:00 PM",
      venue: "LAL Qila Banquet",
      rating: 3,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400",
      title: "Birthday Celebration at LAL Qila",
      date: "12 May 2024",
      time: "7:00 PM",
      venue: "City Hall",
      rating: 4,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400",
      title: "Corporate Dinner at LAL Qila",
      date: "01 Jan 2023",
      time: "6:00 PM",
      venue: "LAL Qila Banquet",
      rating: 5,
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400",
      title: "Anniversary Party",
      date: "05 Aug 2022",
      time: "7:00 PM",
      venue: "Grand Terrace",
      rating: 2,
    },
  ], []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={15}
        fill={index < rating ? "#FFD700" : "none"}
        color={index < rating ? "#FFD700" : "#D3D3D3"}
      />
    ));
  };

  const sortedEvents = useMemo(() => {
    const copy = [...events];
    const parseDate = (d) => {
      if (!d) return 0;
      // try native parse first (handles ISO / full date strings)
      const native = new Date(d);
      if (!isNaN(native.getTime())) return native.getTime();
      // fallback to parsing "dd MMM yyyy" like "12 May 2025"
      try {
        const parsed = parse(d, "dd MMM yyyy", new Date());
        return isNaN(parsed.getTime()) ? 0 : parsed.getTime();
      } catch {
        return 0;
      }
    };

    switch (sortBy) {
      case "oldest":
        return copy.sort((a, b) => parseDate(a.date) - parseDate(b.date));
      case "highest":
      case "highest_rated":
        return copy.sort((a, b) => b.rating - a.rating);
      case "lowest":
        return copy.sort((a, b) => a.rating - b.rating);
      case "venue_az":
        return copy.sort((a, b) => (a.venue || "").localeCompare(b.venue || ""));
      case "recent":
      default:
        return copy.sort((a, b) => parseDate(b.date) - parseDate(a.date));
    }
  }, [events, sortBy]);

  const selectedSortLabel = sortOptions.find((s) => s.key === sortBy)?.label ?? "Sort By";

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Event History</Text>
        <Text style={styles.headerSubtitle}>
          Review your past celebrations and book again with ease
        </Text>
      </View>

      <View style={styles.combinedSearch}>
        <TextInput
          style={styles.combinedInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Search your past events..."
          placeholderTextColor={Colors.grey}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.combinedSortBtn} onPress={() => setShowSortPicker(true)}>
          <Text style={styles.combinedSortText}>{selectedSortLabel}</Text>
          <ChevronDown size={16} color={Colors.grey} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.eventsList}>
        {sortedEvents
          .filter((e) =>
            search.trim()
              ? `${e.title} ${e.venue}`.toLowerCase().includes(search.toLowerCase())
              : true
          ).length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No Events Found</Text>
            <Text style={styles.emptyStateText}>
              {search.trim() 
                ? `No events match "${search}"`
                : "You don't have any past events yet"}
            </Text>
          </View>
        ) : (
          sortedEvents
          .filter((e) =>
            search.trim()
              ? `${e.title} ${e.venue}`.toLowerCase().includes(search.toLowerCase())
              : true
          )
           .map((event) => (
            <View key={event.id} style={styles.eventCard}>
              <Image
                source={{ uri: event.image }}
                style={styles.eventImage}
                resizeMode="cover"
              />
              <View style={styles.eventContent}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventDateTime}>
                  {event.date} • {event.time}
                </Text>
                <Text style={styles.eventVenue}>{event.venue}</Text>
                <View style={styles.ratingRow}>{renderStars(event.rating)}</View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.repeatButton}>
                    <Text style={styles.repeatButtonText}>Repeat Booking</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.feedbackButton}>
                    <Text style={styles.feedbackButtonText}>Share Feedback</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <Modal visible={showSortPicker} transparent animationType="fade" onRequestClose={() => setShowSortPicker(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {sortOptions.map((opt) => (
              <TouchableOpacity
                key={opt.key}
                style={[styles.sortItem, sortBy === opt.key && styles.sortItemSelected]}
                onPress={() => {
                  setSortBy(opt.key);
                  setShowSortPicker(false);
                }}
              >
                <Text style={[styles.sortItemText, sortBy === opt.key && styles.sortItemTextSelected]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setShowSortPicker(false)} style={styles.modalClose}>
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  header: {
    padding: spacing.md,
  },
  headerTitle: {
    fontSize: responsiveFontSize(24),
    color: Colors.primary,
    fontWeight: "900",
  },
  headerSubtitle: {
    fontSize: responsiveFontSize(12),
    color: Colors.primary,
    opacity: 0.8,
    marginTop: spacing.xs,
  },
  combinedSearch: {
    flexDirection: "row",
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xs,
  },
  combinedInput: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    color: Colors.grey,
    fontSize: responsiveFontSize(12),
  },
  combinedSortBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderLeftWidth: 1,
    borderLeftColor: "#eee",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    marginLeft: -1, // hide seam
  },
  combinedSortText: {
    color: Colors.grey,
    fontSize: responsiveFontSize(10),
    marginRight: spacing.xs,
  },
  eventsList: {
    padding: spacing.md,
  },
  eventCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: spacing.md,
  },
  eventImage: {
    width: "100%",
    height: responsiveHeight(0.165),
  },
  eventContent: {
    padding: spacing.md,
  },
  eventTitle: {
    fontSize: responsiveFontSize(14),
    fontWeight: "900",
    color: Colors.primary,
    marginBottom: spacing.xs,
  },
  eventDateTime: {
    fontSize: responsiveFontSize(10),
    color: Colors.primary,
    opacity: 0.6,
  },
  eventVenue: {
    fontSize: responsiveFontSize(10),
    color: Colors.primary,
    opacity: 0.6,
    marginBottom: spacing.sm,
  },
  ratingRow: {
    flexDirection: "row",
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  actionButtons: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  repeatButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: spacing.sm,
    borderRadius: 6,
    alignItems: "center",
  },
  repeatButtonText: {
    color: Colors.white,
    fontSize: responsiveFontSize(12),
    fontWeight: "600",
  },
  feedbackButton: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingVertical: spacing.sm,
    borderRadius: 6,
    alignItems: "center",
  },
  feedbackButtonText: {
    color: Colors.primary,
    fontSize: responsiveFontSize(12),
    fontWeight: "600",
  },

  /* sort modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: spacing.md,
  },
  sortItem: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  sortItemText: {
    color: Colors.primary,
    fontSize: responsiveFontSize(12),
  },
  sortItemSelected: {
    backgroundColor: "#f2f6fb",
    borderRadius: 6,
  },
  sortItemTextSelected: {
    fontWeight: "800",
  },
  modalClose: {
    marginTop: spacing.sm,
    alignItems: "center",
  },
  modalCloseText: {
    color: Colors.grey,
    fontSize: responsiveFontSize(12),
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  emptyStateTitle: {
    fontSize: responsiveFontSize(16),
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: spacing.xs,
  },
  emptyStateText: {
    fontSize: responsiveFontSize(12),
    color: Colors.grey,
    textAlign: 'center',
  },
});
