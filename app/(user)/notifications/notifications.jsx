import { Bell } from "lucide-react-native";
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../constants/theme";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
    spacing,
} from "../../../utils/responsive";

export default function Notifications() {
  const centers = [
    { id: "1", title: "Booking Confirmed" },
    { id: "2", title: "Payment Reminder" },
    { id: "3", title: "Decor Finalized" },
  ];

  const highlights = [
    { id: "h1", event: "Corporate Gala", status: "Setup", time: "03:00 PM" },
    { id: "h2", event: "Wedding Reception", status: "Confirmed", time: "07:00 PM" },
  ];

  const quickActions = [
    { id: "a1", label: "Book Now", action: () => console.log("Book Now") },
    { id: "a2", label: "Request Quote", action: () => console.log("Request Quote") },
    { id: "a3", label: "View Calendar", action: () => console.log("View Calendar") },
    { id: "a4", label: "Contact Manager", action: () => console.log("Contact Manager") },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Dashboard</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Notification Centers</Text>
          <View style={styles.list}>
            {centers.map((c) => (
              <View key={c.id} style={styles.listItem}>
                <View style={styles.iconBox}>
                  <Bell size={14} color={Colors.primary} />
                </View>
                <Text style={styles.listText}>{c.title}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.card, styles.highlightCard]}>
          <Text style={styles.cardTitle}>Today Highlights</Text>

          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, styles.colEvent]}>Event</Text>
            <Text style={[styles.tableCell, styles.colStatus]}>Status</Text>
            <Text style={[styles.tableCell, styles.colTime]}>Time</Text>
          </View>

          {highlights.map((h) => (
            <View key={h.id} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.colEvent]}>{h.event}</Text>
              <Text style={[styles.tableCell, styles.colStatus]}>{h.status}</Text>
              <Text style={[styles.tableCell, styles.colTime]}>{h.time}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quick Actions</Text>

          <FlatList
            data={quickActions}
            keyExtractor={(i) => i.id}
            numColumns={2}
            columnWrapperStyle={styles.actionRow}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.actionBtn} onPress={item.action}>
                <Text style={styles.actionText}>{item.label}</Text>
              </TouchableOpacity>
            )}
            scrollEnabled={false}
            contentContainerStyle={{ paddingTop: spacing.sm }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  container: {
    padding: spacing.md,
    paddingBottom: spacing.lg,
  },
  header: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: responsiveHeight(0.02),
    alignItems: "center",
    marginBottom: spacing.md,
  },
  headerText: {
    color: Colors.white,
    fontSize: responsiveFontSize(18),
    fontWeight: "900",
  },

  card: {
    backgroundColor: Colors.white,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e8dede",
    padding: spacing.md,
    marginBottom: spacing.md,
  },

  highlightCard: {
    // ensures spacing similar to design
  },

  cardTitle: {
    color: Colors.primary,
    fontSize: responsiveFontSize(15),
    fontWeight: "800",
    marginBottom: spacing.sm,
  },

  list: {
    marginTop: spacing.xs,
  },

  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.xs,
  },

  iconBox: {
    width: responsiveWidth(0.06),
    alignItems: "center",
    marginRight: spacing.sm,
  },

  listText: {
    color: Colors.primary,
    fontSize: responsiveFontSize(11),
  },

  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f0eaea",
    paddingVertical: spacing.xs,
    marginBottom: spacing.xs,
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: spacing.xs,
    alignItems: "center",
  },

  tableCell: {
    color: Colors.primary,
    fontSize: responsiveFontSize(11),
  },

  colEvent: { flex: 2 },
  colStatus: { flex: 1, textAlign: "center" },
  colTime: { flex: 1, textAlign: "right" },

  actionRow: {
    justifyContent: "space-between",
    marginTop: spacing.sm,
  },

  actionBtn: {
    backgroundColor: "#d6b66b",
    paddingVertical: responsiveHeight(0.015),
    paddingHorizontal: spacing.md,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginBottom: spacing.sm,
    marginHorizontal: spacing.xs,
  },

  actionText: {
    color: Colors.primary,
    fontWeight: "700",
    fontSize: responsiveFontSize(11),
  },
});