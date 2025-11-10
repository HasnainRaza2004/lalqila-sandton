import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/theme";
import { responsiveFontSize, responsiveHeight, responsiveWidth, spacing } from "../../utils/responsive";

const logo = require("../../assets/images/logo.png");

export default function ForgetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const disabled = email.trim().length === 0;

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.md, paddingBottom: spacing.lg }}>
          <View style={styles.headerCard}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>Enter your email to receive a reset</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor="#9aa4ad"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="done"
              style={styles.input}
            />

            <TouchableOpacity
              style={[styles.primaryBtn, disabled && { opacity: 0.6 }]}
              disabled={disabled}
              onPress={() => {/* send reset */}}
            >
              <Text style={styles.primaryBtnText}>Send Reset Link</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.back()} style={{ alignSelf: "center", marginTop: spacing.md }}>
              <Text style={styles.linkText}>Back to Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  headerCard: { alignItems: "center", marginTop: spacing.lg, marginBottom: spacing.md, gap: spacing.xs },
  logo: { width: responsiveWidth(1), height: responsiveHeight(0.12) },
  title: { color: Colors.primary, fontSize: responsiveFontSize(18), fontWeight: "900" },
  subtitle: { color: Colors.primary, opacity: 0.75, fontSize: responsiveFontSize(11) },

  card: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: "#eadfd6",
    borderRadius: 14,
    padding: spacing.lg,
    alignSelf: "center",
    width: "100%",
    maxWidth: 520,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  label: { color: Colors.primary, fontWeight: "700", fontSize: responsiveFontSize(10), marginBottom: spacing.xs },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: "#eadfd6",
    borderRadius: 10,
    paddingHorizontal: spacing.sm,
    paddingVertical: responsiveHeight(0.015),
    color: Colors.primary,
    fontSize: responsiveFontSize(12),
    marginBottom: spacing.sm,
  },
  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: responsiveHeight(0.018),
    marginTop: spacing.sm,
  },
  primaryBtnText: { color: Colors.white, fontWeight: "800", fontSize: responsiveFontSize(12) },
  linkText: { color: "#2f78bc", fontWeight: "700", fontSize: responsiveFontSize(10) },
});