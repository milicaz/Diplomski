import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RFValue } from "react-native-responsive-fontsize";
import { scale, verticalScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../constants/colors";
import useAuth from "../hooks/useAuth";
import { globalStyles } from "../utils/styles";

export default function WelcomePage({ navigation }) {
  const { t, i18n } = useTranslation();
  const { login } = useAuth();
  const { height: windowHeight } = useWindowDimensions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ email: "", password: "" });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onChangeEmail = (email) => {
    setEmail(email);
    if (error.email) {
      setError({ ...error, email: "" });
    }
  };

  const onChangePassword = (password) => {
    setPassword(password);
    if (error.password) {
      setError({ ...error, password: "" });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useFocusEffect(
    useCallback(() => {
      setError({ email: "", password: "" }); // Clear errors when the screen is focused
    }, [])
  );

  useEffect(() => {
    // Kada se promeni jezik, re-izračunaj tekst greške
    setError((prevError) => ({
      email: prevError.email
        ? !email
          ? t("welcome-page.error.emailRequired")
          : !validateEmail(email)
          ? t("welcome-page.error.invalidEmail")
          : ""
        : "",
      password: prevError.password
        ? !password
          ? t("welcome-page.error.passwordRequired")
          : ""
        : "",
    }));
  }, [i18n.language]);

  const handleLogin = async () => {
    let valid = true;
    const newError = { email: "", password: "" };

    if (!email) {
      newError.email = t("welcome-page.error.emailRequired");
      valid = false;
    } else if (!validateEmail(email)) {
      newError.email = t("welcome-page.error.invalidEmail");
      valid = false;
    }

    if (!password) {
      newError.password = t("welcome-page.error.passwordRequired");
      valid = false;
    }

    setError(newError);

    if (valid) {
      const loginDTO = { email, password };
      login(loginDTO);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: COLORS.white }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={globalStyles.container}>
          <View>
            <Image
              source={require("../assets/images/opens2.png")}
              style={globalStyles.image(windowHeight)}
            />
          </View>

          <View style={globalStyles.form(windowHeight)}>
            <View
              style={[
                globalStyles.inputContainer,
                {
                  borderColor: error.email ? COLORS.red : COLORS.black,
                  marginBottom: error.email ? 10 : 20,
                },
              ]}
            >
              <TextInput
                value={email}
                onChangeText={onChangeEmail}
                style={globalStyles.input}
                placeholder={t("welcome-page.input.email")}
                placeholderTextColor="#999"
              />
            </View>
            {error.email ? (
              <Text
                style={[
                  globalStyles.errorText,
                  { width: "80%", textAlign: "left" },
                ]}
              >
                {error.email}
              </Text>
            ) : null}
            <View
              style={[
                globalStyles.inputContainer,
                {
                  borderColor: error.password ? COLORS.red : COLORS.black,
                  marginBottom: error.password ? 10 : 20,
                },
              ]}
            >
              <TextInput
                value={password}
                onChangeText={onChangePassword}
                secureTextEntry={!showPassword}
                style={globalStyles.input}
                placeholder={t("welcome-page.input.password")}
                placeholderTextColor="#999"
              />
              <TouchableOpacity
                onPress={toggleShowPassword}
                style={globalStyles.visibilityToggle}
              >
                <Icon
                  name={showPassword ? "visibility-off" : "visibility"}
                  size={24}
                  color={COLORS.grey}
                />
              </TouchableOpacity>
            </View>
            {error.password ? (
              <Text
                style={[
                  globalStyles.errorText,
                  { width: "80%", textAlign: "left" },
                ]}
              >
                {error.password}
              </Text>
            ) : null}
            <View style={globalStyles.buttonContainer}>
              <TouchableOpacity
                onPress={handleLogin}
                style={globalStyles.button}
              >
                <Text style={globalStyles.buttonText}>
                  {t("welcome-page.text.login")}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity>
                <Text
                  style={styles.forgotPasswordText}
                  onPress={() => navigation.navigate("ForgotPassword")}
                >
                  {t("welcome-page.text.forgot-password")}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>
                {t("welcome-page.text.no-account")}
              </Text>
              <TouchableOpacity>
                <Text
                  style={styles.registerLink}
                  onPress={() => navigation.navigate("Registracija")}
                >
                  {t("welcome-page.text.register")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  forgotPasswordContainer: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  forgotPasswordText: {
    fontSize: RFValue(15),
    fontFamily: "Montserrat-Regular",
  },
  registerContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(6),
  },
  registerText: {
    fontSize: RFValue(15),
    fontFamily: "Montserrat-Regular",
  },
  registerLink: {
    fontSize: RFValue(15),
    fontFamily: "Montserrat-Bold",
    marginLeft: scale(8),
  },
});
