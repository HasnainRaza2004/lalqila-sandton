import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import components
import { BuffetCustomizer } from "../../components/admin/BuffetCustomizer";
import { MiniCalendar } from "../../components/admin/MiniCalendar";
import { PaymentSummary } from "../../components/admin/PaymentSummary";
import { SetupCard } from "../../components/admin/SetupCard";
import { StatsCard } from "../../components/admin/StatsCard";
import { Colors } from "../../constants/theme";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  spacing,
} from "../../utils/responsive";

export default function AdminDashboard() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Dashboard</Text>
        </View>

        {/* Subtitle */}
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleTitle}>
            Manage Your Bookings, Events, and Decor - All in One
          </Text>
          <Text style={styles.subtitleText}>
            Your perfect events starts with a single click
          </Text>
        </View>

        {/* Your Upcoming Bookings Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Upcoming Bookings</Text>
            <TouchableOpacity
              style={styles.newBookingBtn}
              onPress={() => router.push("/(user)/bookings/reservation")}
            >
              <Plus size={12} color={Colors.white} strokeWidth={2.5} />
              <Text style={styles.newBookingText}>New Bookings</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statsAndCalendarContainer}>
            <View style={styles.statsGrid}>
              <StatsCard title="Total Bookings" value="12" />
              <StatsCard title="Pending Approvals" value="3" />
              <StatsCard title="Confirmed Events" value="7" />
              <StatsCard title="Completed Events" value="2" />
            </View>
            <View style={styles.calendarWrapper}>
              <MiniCalendar />
            </View>
          </View>
        </View>

        {/* Setup Cards Section */}
        <View style={styles.setupSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.setupCardsContainer}
          >
            <SetupCard
              image={{
                uri: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400",
              }}
              title="Royal Mughal Setup"
              capacity="300"
              price="$3,500"
            />
            <SetupCard
              image={{
                uri: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400",
              }}
              title="Modern Elegant Setup"
              capacity="150"
              price="$2,500"
            />
            <SetupCard
              image={{
                uri: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400",
              }}
              title="Modern Elegant Setup"
              capacity="150"
              price="$2,500"
            />
            <SetupCard
              image={{
                uri: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400",
              }}
              title="Modern Elegant Setup"
              capacity="150"
              price="$2,500"
            />
            <SetupCard
              image={{
                uri: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400",
              }}
              title="Modern Elegant Setup"
              capacity="150"
              price="$2,500"
            />
            <SetupCard
              image={{
                uri: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400",
              }}
              title="Modern Elegant Setup"
              capacity="150"
              price="$2,500"
            />
            <SetupCard
              image={{
                uri: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400",
              }}
              title="Modern Elegant Setup"
              capacity="150"
              price="$2,500"
            />
            <SetupCard
              image={{
                uri: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400",
              }}
              title="Modern Elegant Setup"
              capacity="150"
              price="$2,500"
            />
            <SetupCard
              image={{
                uri: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400",
              }}
              title="Modern Elegant Setup"
              capacity="150"
              price="$2,500"
            />
          </ScrollView>
        </View>

        {/* Bottom Section - Buffet & Payment */}
        <View style={styles.bottomSection}>
          <BuffetCustomizer />
          <PaymentSummary />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginVertical: spacing.sm,
    marginHorizontal: spacing.sm,
    borderRadius: 8,
  },
  headerText: {
    color: Colors.white,
    fontSize: responsiveFontSize(30),
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  subtitleContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  subtitleTitle: {
    color: Colors.primary,
    fontSize: responsiveFontSize(16),
    fontWeight: "bold",
    marginBottom: 4,
    lineHeight: 24,
  },
  subtitleText: {
    color: Colors.primary,
    fontSize: responsiveFontSize(13),
  },
  section: {
    paddingHorizontal: spacing.md,
    marginBottom: 0,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: spacing.sm,
  },
  sectionTitle: {
    color: Colors.primary,
    fontSize: responsiveFontSize(14),
    fontWeight: "bold",
  },
  newBookingBtn: {
    backgroundColor: Colors.secondary,
    width: responsiveWidth(0.2),
    paddingVertical: responsiveHeight(0.007),
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  newBookingText: {
    color: Colors.white,
    fontSize: responsiveFontSize(7.5),
    fontWeight: "700",
  },
  statsAndCalendarContainer: {
    width: responsiveWidth(1),
    flexDirection: "row",
    gap: spacing.sm,
  },
  statsGrid: {
    width: responsiveWidth(0.45),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  calendarWrapper: {
    width: responsiveWidth(0.45),
  },
  setupSection: {
    marginVertical: spacing.sm,
    marginHorizontal: spacing.md,
  },
  setupCardsContainer: {
    gap: spacing.sm - 1,
  },
  bottomSection: {
    flexDirection: "row",
    gap: spacing.xs,
    marginHorizontal: spacing.md,
  },
});
