import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BarChart, PieChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";
import { MiniCalendar } from "../../components/admin/MiniCalendar";
import { Colors } from "../../constants/theme";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  spacing,
} from "../../utils/responsive";

export default function AdminDashboard() {
  const router = useRouter();

  // Dummy data for charts
  const venueInsightData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [40, 65, 35, 85, 45, 70, 50],
      },
    ],
  };
  const barData = [
    { value: 85 },
    { value: 60 },
    { value: 35 },
    { value: 26 },
    { value: 16 },
    { value: 56 },
    { value: 40 },
  ];
  const cateringAndFoodData = [
    { value: 85, label: "Buffet", frontColor: Colors.primary },
    { value: 60, label: "Buffet", frontColor: Colors.primary },
    { value: 35, label: "Buffet", frontColor: Colors.primary },
  ];
  const pieData = [{ value: 54, color: Colors.primary, text: "40%" }];

  const recentBookings = [
    {
      client: "Sarah Khan",
      event: "Wedding",
      date: "OCT 30",
      amount: "$12000",
    },
    {
      client: "Ali Raza",
      event: "Corporate Dining",
      date: "Nov 05",
      amount: "$500",
    },
    {
      client: "Hamza Sheik",
      event: "Birthday",
      date: "Dec 01",
      amount: "$700",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.mainContent}>
          {/* Header with Action Buttons */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Dashboard</Text>
            <View style={styles.headerButtons}>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionBtnText}>+ Add Venue</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionBtnText}>+ Add Event</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtnWhite}>
                <Text style={styles.actionBtnTextDark}>View Inquiries</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Subtitle */}
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitleTitle}>
              Your Complete Event Management Control Center
            </Text>
            <Text style={styles.subtitleText}>
              Monitor bookings, manage vendors, and track your business growth -
              all from place
            </Text>
          </View>

          {/* Main Grid Layout */}
          <View style={styles.gridContainer}>
            {/* Left Column */}
            <View style={styles.leftColumn}>
              {/* Stats Cards */}
              <View style={styles.statsRow}>
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>Total Bookings</Text>
                  <Text style={styles.statValue}>248</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>Active Events</Text>
                  <Text style={styles.statValue}>15</Text>
                </View>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>Revenue This Month</Text>
                  <Text style={styles.statValue}>$24,300</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>Pending Approvals</Text>
                  <Text style={styles.statValue}>7</Text>
                </View>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>Customer Reviews</Text>
                  <Text style={styles.statValue}>45</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>Vendors Connected</Text>
                  <Text style={styles.statValue}>18</Text>
                </View>
              </View>

              {/* Recent Bookings */}
              <View style={styles.recentBookings}>
                <Text style={styles.sectionTitle}>Recent Booking</Text>
                <View style={styles.bookingTable}>
                  <View style={styles.tableHeader}>
                    <Text style={[styles.tableHeaderText, { flex: 0.5 }]}>
                      Client Name
                    </Text>
                    <Text style={[styles.tableHeaderText, { flex: 0.5 }]}>
                      Client Name
                    </Text>
                    <Text style={[styles.tableHeaderText, { flex: 0.5 }]}>
                      Dates
                    </Text>
                    <Text style={[styles.tableHeaderText, { flex: 0.5 }]}>
                      Amount
                    </Text>
                  </View>
                  {recentBookings.map((booking, index) => (
                    <View key={index} style={styles.tableRow}>
                      <Text style={[styles.tableCell, { flex: 0.5 }]}>
                        {booking.client}
                      </Text>
                      <Text style={[styles.tableCell, { flex: 0.5 }]}>
                        {booking.event}
                      </Text>
                      <Text style={[styles.tableCell, { flex: 0.5 }]}>
                        {booking.date}
                      </Text>
                      <Text style={[styles.tableCell, { flex: 0.5 }]}>
                        {booking.amount}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Catering Overview */}
              <View style={styles.chartContainer}>
                <View style={styles.chartHeader}>
                  <Text style={styles.sectionTitle}>
                    Catering & Food Overview
                  </Text>
                </View>

                <View style={styles.chartRow}>
                  <View style={styles.overviewBarChartContainer}>
                    <Text style={styles.chartSubtitle}>
                      Top Menu Packages Ordered
                    </Text>
                    <BarChart
                      initialSpacing={0}
                      data={cateringAndFoodData}
                      barWidth={11}
                      frontColor={Colors.primary}
                      spacing={5}
                      hideRules
                      width={responsiveWidth(0.15)}
                      height={responsiveHeight(0.1)}
                      hideYAxisText
                      yAxisThickness={0}
                      xAxisThickness={1}
                    />
                  </View>
                  <View style={styles.overviewBarChartContainer}>
                    <Text style={styles.chartSubtitle}>
                      Revenue By Category
                    </Text>
                    <BarChart
                      initialSpacing={0}
                      data={cateringAndFoodData}
                      barWidth={11}
                      frontColor={Colors.primary}
                      spacing={5}
                      hideRules
                      width={responsiveWidth(0.15)}
                      height={responsiveHeight(0.1)}
                      hideYAxisText
                      yAxisThickness={0}
                      xAxisThickness={1}
                    />
                  </View>
                </View>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingLabel}>
                    Vendor Performance Rating
                  </Text>
                  <View style={styles.rating}>
                    <Text style={styles.ratingValue}>4.5</Text>
                    <Text style={styles.stars}>★ ★ ★ ☆ ☆</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Right Column */}
            <View style={styles.rightColumn}>
              {/* Mini Calendar */}
              <View style={styles.calendar}>
                <View style={styles.calendarHeader}>
                  {["All", "Venue", "Food", "Decor", "Wedding"].map((day) => (
                    <TouchableOpacity key={day}>
                      <Text style={styles.dayLabel}>{day}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <MiniCalendar />
              </View>

              {/* Venue Insight */}
              <View style={styles.chartContainer}>
                <View style={styles.chartHeader}>
                  <Text style={styles.sectionTitle}>Venue & Event Insight</Text>
                </View>
                <View style={styles.chartRow}>
                  <View style={styles.barChartContainer}>
                    <Text style={styles.chartSubtitle}>Top Booked Venue</Text>
                    <BarChart
                      data={barData}
                      barWidth={5}
                      frontColor={Colors.primary}
                      roundedTop
                      spacing={2}
                      hideRules
                      width={responsiveWidth(0.15)}
                      height={responsiveHeight(0.1)}
                      hideYAxisText
                      yAxisThickness={0}
                      xAxisThickness={0}
                    />
                    <Text style={styles.chartLabel}>
                      Most Popular Event Type
                    </Text>
                  </View>

                  {/* Booking Value Pie Chart */}
                  <View style={styles.pieChartContainer}>
                    <PieChart
                      donut
                      radius={30}
                      innerRadius={15}
                      data={pieData}
                      centerLabelComponent={() => {
                        return (
                          <Text
                            style={{
                              fontSize: responsiveFontSize(10),
                              color: Colors.primary,
                            }}
                          >
                            40%
                          </Text>
                        );
                      }}
                    />
                    <View style={styles.pieChartLabel}>
                      <Text style={styles.pieChartTitle}>
                        Average Booking Value
                      </Text>
                      <Text style={styles.pieChartValue}>$1,520</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* User Management */}
              <View style={styles.userManagement}>
                <Text style={styles.sectionTitle}>
                  User & Vendor Management
                </Text>
                <View style={styles.userStats}>
                  <View style={styles.userStatItem}>
                    <Text style={styles.userStatLabel}>Active Events</Text>
                    <Text style={styles.userStatValue}>210</Text>
                  </View>
                  <View style={styles.userStatItem}>
                    <Text style={styles.userStatLabel}>Partner Vendor</Text>
                    <Text style={styles.userStatValue}>35</Text>
                  </View>
                  <View style={styles.userStatItem}>
                    <Text style={styles.userStatLabel}>New Registrations</Text>
                    <Text style={styles.userStatValue}>12</Text>
                  </View>
                </View>
                <View style={styles.userButtons}>
                  <TouchableOpacity style={styles.userBtn}>
                    <Text style={styles.userBtnText}>Manage User</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.userBtn}>
                    <Text style={styles.userBtnText}>View Vendor Details</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Financial Summary */}
              <View style={styles.financialSummary}>
                <Text style={styles.sectionTitle}>Financial Summary</Text>
                <View style={styles.financialRow}>
                  <View style={styles.financialItem}>
                    <Text style={styles.financialLabel}>Total Review</Text>
                    <Text style={styles.financialValue}>$35,500</Text>
                  </View>
                  <View style={styles.financialItem}>
                    <Text style={styles.financialLabel}>Pending Payments</Text>
                    <Text style={styles.financialValue}>$5,500</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.reportBtn}>
                  <Text style={styles.reportBtnText}>View Detailed Report</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
  mainContent: {
    flex: 1,
    paddingHorizontal: spacing.xs,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginVertical: spacing.sm,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: Colors.white,
    fontSize: responsiveFontSize(24),
    fontWeight: "900",
  },
  headerButtons: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  actionBtn: {
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
    borderRadius: 4,
  },
  actionBtnWhite: {
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
    borderRadius: 4,
  },
  actionBtnText: {
    color: Colors.white,
    fontSize: responsiveFontSize(6),
    fontWeight: "900",
  },
  actionBtnTextDark: {
    color: Colors.primary,
    fontSize: responsiveFontSize(6),
    fontWeight: "900",
  },
  subtitleContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  subtitleTitle: {
    color: Colors.primary,
    fontSize: responsiveFontSize(12),
    fontWeight: "bold",
    marginBottom: 2,
  },
  subtitleText: {
    color: Colors.black,
    fontSize: responsiveFontSize(10),
  },
  gridContainer: {
    flex: 1,
    flexDirection: "row",
    gap: spacing.xs,
    paddingHorizontal: spacing.xs,
  },
  leftColumn: {
    flex: 1,
    gap: spacing.xs,
  },
  rightColumn: {
    width: responsiveWidth(0.48),
    gap: spacing.xs,
  },
  statsRow: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: spacing.xs + 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  statLabel: {
    color: Colors.primary,
    fontSize: responsiveFontSize(9),
  },
  statValue: {
    color: Colors.primary,
    fontSize: responsiveFontSize(12),
    fontWeight: "900",
  },
  recentBookings: {
    backgroundColor: Colors.white,
    padding: spacing.xs + 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  sectionTitle: {
    color: Colors.primary,
    fontSize: responsiveFontSize(9),
    fontWeight: "bold",
    marginBottom: spacing.xs,
  },
  bookingTable: {
    gap: spacing.xs,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    paddingBottom: spacing.xs,
    alignItems: "center",
  },
  tableHeaderText: {
    color: Colors.primary,
    fontSize: responsiveFontSize(7),
    fontWeight: "900",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  tableCell: {
    textAlign: "center",
    color: Colors.primary,
    fontSize: responsiveFontSize(7),
  },
  chartContainer: {
    width: "100%",
    backgroundColor: Colors.white,
    padding: spacing.xs + 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  chartRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  chartHeader: {
    marginBottom: spacing.xs,
  },
  chartSubtitle: {
    color: Colors.primary,
    fontSize: responsiveFontSize(7),
    marginTop: 2,
  },
  barChartContainer: {
    width: responsiveWidth(0.25),
  },
  overviewBarChartContainer: {
    width: responsiveWidth(0.2),
    justifyContent: "center",
    alignItems: "center",
  },
  chartLabel: {
    color: Colors.primary,
    fontSize: responsiveFontSize(7),
    textAlign: "center",
  },
  ratingContainer: {
    marginTop: spacing.md,
  },
  ratingLabel: {
    color: Colors.primary,
    fontSize: responsiveFontSize(8),
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  ratingValue: {
    color: Colors.primary,
    fontSize: responsiveFontSize(16),
    fontWeight: "bold",
  },
  stars: {
    color: Colors.secondary,
    fontSize: responsiveFontSize(12),
  },
  calendar: {
    backgroundColor: Colors.white,
    padding: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: spacing.xs,
  },
  dayLabel: {
    color: Colors.white,
    backgroundColor: Colors.secondary,
    fontSize: responsiveFontSize(4),
    fontWeight: "900",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 2,
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  calendarDay: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dayNumber: {
    color: Colors.primary,
    fontSize: responsiveFontSize(9),
  },
  pieChartContainer: {
    width: responsiveWidth(0.2),
    justifyContent: "center",
    alignItems: "center",
  },
  pieChartLabel: {
    alignItems: "center",
    marginTop: spacing.xs,
  },
  pieChartTitle: {
    color: Colors.primary,
    fontSize: responsiveFontSize(7),
    textAlign: "center",
    marginBottom: spacing.xs,
  },
  pieChartValue: {
    color: Colors.primary,
    fontSize: responsiveFontSize(10),
    fontWeight: "900",
    textAlign: "center",
  },
  userManagement: {
    backgroundColor: Colors.white,
    padding: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  userStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  userStatItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  userStatLabel: {
    color: Colors.primary,
    fontSize: responsiveFontSize(5.8),
    marginBottom: spacing.xs,
    fontWeight: "900",
  },
  userStatValue: {
    color: Colors.primary,
    fontSize: responsiveFontSize(8),
    fontWeight: "900",
  },
  userButtons: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  userBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: spacing.xs,
    borderRadius: 4,
    alignItems: "center",
  },
  userBtnText: {
    color: Colors.white,
    fontSize: responsiveFontSize(6.7),
    fontWeight: "900",
  },
  financialSummary: {
    backgroundColor: Colors.white,
    padding: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  financialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  financialItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  financialLabel: {
    color: Colors.primary,
    fontSize: responsiveFontSize(7),
    fontWeight: "900",
    marginBottom: 4,
    textAlign: "center",
  },
  financialValue: {
    color: Colors.primary,
    fontSize: responsiveFontSize(10),
    fontWeight: "bold",
    textAlign: "center",
  },
  reportBtn: {
    width: responsiveWidth(0.3),
    backgroundColor: Colors.primary,
    padding: spacing.xs,
    borderRadius: 4,
    alignItems: "center",
  },
  reportBtnText: {
    color: Colors.white,
    fontSize: responsiveFontSize(8),
    fontWeight: "900",
  },
});
