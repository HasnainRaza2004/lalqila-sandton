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
import CountryPicker from "react-native-country-picker-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/theme";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  spacing,
} from "../../utils/responsive";
import PhoneInput from "../../components/common/PhoneInput";

const logo = require("../../assets/images/logo.png");

export default function Register() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const pwdRef = useRef(null);
  const confirmRef = useRef(null);
  const [country, setCountry] = useState({});
  const [phonePrefix, setPhonePrefix] = useState("+27"); // default to South Africa

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: spacing.md,
            paddingBottom: spacing.lg,
          }}
        >
          <View style={styles.headerCard}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join us to plan your perfect</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="John Doe"
              placeholderTextColor="#9aa4ad"
              style={styles.input}
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current?.focus()}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              ref={emailRef}
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor="#9aa4ad"
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
              returnKeyType="next"
              onSubmitEditing={() => phoneRef.current?.focus()}
            />
            <PhoneInput />

            {/* <Text style={styles.label}>Phone</Text>
            <View style={styles.phoneRow}>
              <View style={styles.codeBox}>
                <CountryPicker
                  withFilter
                  withFlag
                  withCallingCode
                  withEmoji={false}
                  onSelect={(c) => {
                    const calling =
                      c.callingCode && c.callingCode[0]
                        ? `+${c.callingCode[0]}`
                        : "+27";
                    setPhonePrefix(calling);
                    setCountry(c);
                  }}
                  countryCode={country.cca2 || "ZA"}
                />
                <Text style={styles.codeText}>{phonePrefix}</Text>
              </View>

              <TextInput
                ref={phoneRef}
                value={phone}
                onChangeText={setPhone}
                placeholder="712 345 678"
                placeholderTextColor="#9aa4ad"
                keyboardType="phone-pad"
                style={[styles.input, styles.phoneInputInline]}
                returnKeyType="next"
                onSubmitEditing={() => pwdRef.current?.focus()}
              />
            </View> */}

            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                ref={pwdRef}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="#9aa4ad"
                secureTextEntry={!showPwd}
                style={[styles.input, { paddingRight: spacing.xl }]}
                returnKeyType="next"
                onSubmitEditing={() => confirmRef.current?.focus()}
              />
              <Pressable
                style={styles.eyeBtn}
                onPress={() => setShowPwd((s) => !s)}
              >
                {showPwd ? (
                  <EyeOff size={18} color={Colors.grey} />
                ) : (
                  <Eye size={18} color={Colors.grey} />
                )}
              </Pressable>
            </View>

            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                ref={confirmRef}
                value={confirm}
                onChangeText={setConfirm}
                placeholder="••••••••"
                placeholderTextColor="#9aa4ad"
                secureTextEntry={!showConfirm}
                style={[styles.input, { paddingRight: spacing.xl }]}
                returnKeyType="done"
              />
              <Pressable
                style={styles.eyeBtn}
                onPress={() => setShowConfirm((s) => !s)}
              >
                {showConfirm ? (
                  <EyeOff size={18} color={Colors.grey} />
                ) : (
                  <Eye size={18} color={Colors.grey} />
                )}
              </Pressable>
            </View>

            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => router.push("/(admin)/dashboard")}
            >
              <Text style={styles.primaryBtnText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => router.push("/(auth)/login")}
                activeOpacity={0.7}
              >
                <Text style={styles.linkText}>Sign In</Text>
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
  logo: { width: responsiveWidth(1), height: responsiveHeight(0.12) },
  title: {
    color: Colors.primary,
    fontSize: responsiveFontSize(18),
    fontWeight: "900",
  },
  subtitle: {
    color: Colors.primary,
    opacity: 0.75,
    fontSize: responsiveFontSize(11),
    textAlign: "center",
  },

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
    marginBottom: spacing.xs,
  },
  inputWithIcon: { position: "relative" },
  eyeBtn: {
    position: "absolute",
    right: spacing.sm,
    top: "50%",
    marginTop: -10,
    padding: 4,
  },

  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: responsiveHeight(0.018),
    marginTop: spacing.lg,
  },
  primaryBtnText: {
    color: Colors.white,
    fontWeight: "800",
    fontSize: responsiveFontSize(12),
  },
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
  linkText: {
    color: "#2f78bc",
    fontWeight: "700",
    fontSize: responsiveFontSize(10),
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  codeBox: {
    paddingHorizontal: spacing.sm,
    paddingVertical: responsiveHeight(0.01),
    justifyContent: "center",
    marginRight: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eadfd6",
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  codeText: {
    fontSize: responsiveFontSize(12),
    paddingLeft: 8,
  },
  phoneInputInline: {
    flex: 1,
    minWidth: responsiveWidth(0.51),
  },
});
