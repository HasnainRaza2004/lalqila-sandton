import { useRouter } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import { useRef, useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/theme";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
    spacing,
} from "../../utils/responsive";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const passwordRef = useRef(null);
  const logo = require("../../assets/images/logo.png");

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.md, paddingBottom: spacing.lg }}>
          <View style={styles.headerCard}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>
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
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
              style={styles.input}
            />

            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                ref={passwordRef}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="#9aa4ad"
                secureTextEntry={!showPwd}
                style={[styles.input, { paddingRight: spacing.xl }]}
                returnKeyType="done"
              />
              <Pressable style={styles.eyeBtn} onPress={() => setShowPwd((s) => !s)}>
                {showPwd ? <EyeOff size={18} color={Colors.grey} /> : <Eye size={18} color={Colors.grey} />}
              </Pressable>
            </View>

            <TouchableOpacity onPress={() => router.push("/(auth)/forget-password")} style={styles.linkRight}>
              <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push("/(user)/restaurants")}>
              <Text style={styles.primaryBtnText}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Don&apos;t have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/register")} activeOpacity={0.7}>
                <Text style={styles.linkText}>Create one</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  headerCard: {
    alignItems: "center",
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  logo: {
    width: responsiveWidth(1),
    height: responsiveHeight(0.12),
  },
  title: { color: Colors.primary, fontSize: responsiveFontSize(18), fontWeight: "900" },
  subtitle: { color: Colors.primary, opacity: 0.75, fontSize: responsiveFontSize(11) },

  card: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: "#eadfd6",
    borderRadius: 14,
    padding: spacing.lg,
    gap: spacing.xs,
    alignSelf: "center",
    width: "100%",
    maxWidth: 520,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  label: {
    color: Colors.primary,
    fontWeight: "700",
    fontSize: responsiveFontSize(10),
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: "#eadfd6",
    borderRadius: 10,
    paddingHorizontal: spacing.sm,
    paddingVertical: responsiveHeight(0.015),
    color: Colors.primary,
    fontSize: responsiveFontSize(12),
  },
  inputWithIcon: { position: "relative" },
  eyeBtn: { position: "absolute", right: spacing.sm, top: "50%", marginTop: -10, padding: 4 },

  linkRight: { alignSelf: "flex-end", marginTop: spacing.sm, marginBottom: spacing.xs },
  linkText: { color: "#2f78bc", fontWeight: "700", fontSize: responsiveFontSize(10) },

  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: responsiveHeight(0.018),
    marginTop: spacing.md,
  },
  primaryBtnText: { color: Colors.white, fontWeight: "800", fontSize: responsiveFontSize(12) },

  footerRow: { 
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center",
    marginTop: spacing.md,
    flexWrap: "wrap",
  },
  footerText: {
    color: Colors.primary,
    fontSize: responsiveFontSize(10),
   },
});