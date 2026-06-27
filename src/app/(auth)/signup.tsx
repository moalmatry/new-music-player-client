import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AmbientBackground } from "@/components/common/AmbientBackground";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useTheme } from "@/hooks/use-theme";
import { useAuthStore } from "@/store/useAuthStore";
import { createStyles } from "@/styles/screens/auth.styles";

export default function SignUpScreen() {
  const theme = useTheme();
  const scheme = useColorScheme();
  const styles = createStyles(theme);
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const signUp = useAuthStore((state) => state.signUp);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = () => {
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setError("");
    signUp(email);
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <AmbientBackground />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Back Button */}
        <Pressable
          onPress={() => router.back()}
          style={[styles.backButton, { top: top + 12 }]}
        >
          <View style={styles.backButtonCircle}>
            <Ionicons name="chevron-back" size={24} color={theme.text} />
          </View>
        </Pressable>

        <View style={styles.contentContainer}>
          <View style={styles.formCard}>
            <BlurView
              intensity={20}
              tint={scheme === "dark" ? "dark" : "light"}
              style={styles.cardBlur}
            />
            <View style={styles.cardContent}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>
                Start your journey into a beautiful premium music sound experience.
              </Text>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <View style={styles.inputGroup}>
                {/* Full Name Input */}
                <View
                  style={[
                    styles.inputContainer,
                    {
                      borderColor: nameFocused
                        ? theme.primary
                        : theme.text + "15",
                    },
                  ]}
                >
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={nameFocused ? theme.primary : theme.textSecondary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    placeholder="Full Name"
                    placeholderTextColor={theme.textSecondary + "90"}
                    style={styles.inputText}
                    value={name}
                    onChangeText={setName}
                    onFocus={() => setNameFocused(true)}
                    onBlur={() => setNameFocused(false)}
                    autoCorrect={false}
                  />
                </View>

                {/* Email Input */}
                <View
                  style={[
                    styles.inputContainer,
                    {
                      borderColor: emailFocused
                        ? theme.primary
                        : theme.text + "15",
                    },
                  ]}
                >
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={emailFocused ? theme.primary : theme.textSecondary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    placeholder="Email Address"
                    placeholderTextColor={theme.textSecondary + "90"}
                    style={styles.inputText}
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCorrect={false}
                  />
                </View>

                {/* Password Input */}
                <View
                  style={[
                    styles.inputContainer,
                    {
                      borderColor: passwordFocused
                        ? theme.primary
                        : theme.text + "15",
                    },
                  ]}
                >
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color={passwordFocused ? theme.primary : theme.textSecondary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    placeholder="Password (Min. 6 characters)"
                    placeholderTextColor={theme.textSecondary + "90"}
                    style={styles.inputText}
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              <Pressable
                onPress={handleSignUp}
                style={({ pressed }) => [
                  styles.btnSubmit,
                  { opacity: pressed ? 0.9 : 1 },
                ]}
              >
                <Text style={styles.btnSubmitText}>Create Account</Text>
              </Pressable>

              <View style={styles.footerRow}>
                <Text style={styles.footerText}>Already have an account?</Text>
                <Pressable onPress={() => router.replace("/signin")}>
                  <Text style={styles.footerLink}>Sign In</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
