import { useCallback, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import englishFlag from '../assets/flags/english.png';
import serbianFlag from '../assets/flags/serbian.png';
import COLORS from "../constants/colors";
import { AuthContext } from "../contexts/AuthContext";
import i18next from '../services/i18next';
import { globalStyles } from "../utils/styles";
import { useFocusEffect } from "@react-navigation/native";

export default function WelcomePage({ navigation }) {
  const { t } = useTranslation();
  const { login } = useContext(AuthContext);
  const { height: windowHeight } = useWindowDimensions();

  const changeLng = lng => {
    i18next.changeLanguage(lng);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ email: '', password: '' });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const onChangeEmail = (email) => {
    setEmail(email);
    if (error.email) {
      setError({ ...error, email: '' });
    }
  }

  const onChangePassword = (password) => {
    setPassword(password);
    if (error.password) {
      setError({ ...error, password: '' });
    }
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useFocusEffect(
    useCallback(() => {
      setError({ email: '', password: '' });  // Clear errors when the screen is focused
    }, [])
  );

  const handleLogin = async () => {
    let valid = true;
    const newError = { email: '', password: '' };

    if (!email) {
      newError.email = t('welcome-page.error.emailRequired');
      valid = false;
    } else if (!validateEmail(email)) {
      newError.email = t('welcome-page.error.invalidEmail');
      valid = false;
    }

    if (!password) {
      newError.password = t('welcome-page.error.passwordRequired');
      valid = false;
    }

    setError(newError);

    if (valid) {
      const loginDTO = { email, password };
      login(loginDTO);
    }
  };

  return (
    <ScrollView style={globalStyles.scrollView}>
      <View style={globalStyles.container}>
        <View>
          <Image
            source={require("../assets/images/opens2.png")}
            style={globalStyles.image(windowHeight)}
          />
        </View>

        {/* <View style={styles.languageSwitcher(windowHeight)}>
          <TouchableOpacity onPress={() => changeLng('sr')}>
            <Image source={serbianFlag} style={styles.flag} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeLng('en')}>
            <Image source={englishFlag} style={styles.flag} />
          </TouchableOpacity>
        </View> */}

        <View style={globalStyles.form(windowHeight)}>
          <View style={[globalStyles.inputContainer, { borderColor: error.email ? COLORS.red : COLORS.black, marginBottom: error.email ? 10 : 20 }]}>
            <TextInput value={email} onChangeText={onChangeEmail} style={globalStyles.input} placeholder={t('welcome-page.input.email')} />
          </View>
          {error.email ? <Text style={globalStyles.errorText}>{error.email}</Text> : null}
          <View style={[globalStyles.inputContainer, { borderColor: error.password ? COLORS.red : COLORS.black, marginBottom: error.password ? 10 : 20 }]}>
            <TextInput value={password} onChangeText={onChangePassword} secureTextEntry={!showPassword} style={globalStyles.input} placeholder={t('welcome-page.input.password')} />
            <TouchableOpacity onPress={toggleShowPassword} style={globalStyles.visibilityToggle}>
              <Icon name={showPassword ? 'visibility-off' : 'visibility'} size={24} color={COLORS.grey} />
            </TouchableOpacity>
          </View>
          {error.password ? <Text style={globalStyles.errorText}>{error.password}</Text> : null}
          <View style={globalStyles.buttonContainer}>
            <TouchableOpacity onPress={handleLogin} style={globalStyles.button}>
              <Text style={globalStyles.buttonText}>{t('welcome-page.text.login')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity >
              <Text style={styles.forgotPasswordText} onPress={() => navigation.navigate("ForgotPassword")}>{t('welcome-page.text.forgot-password')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>{t('welcome-page.text.no-account')}</Text>
            <TouchableOpacity>
              <Text style={styles.registerLink} onPress={() => navigation.navigate("Registracija")}>{t('welcome-page.text.register')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  languageSwitcher: (windowHeight) => ({
    flexDirection: 'row',
    marginHorizontal: 12,
    top: windowHeight * 0.49,
    justifyContent: 'flex-end'
  }),
  flag: {
    width: 30,
    height: 20,
    marginRight: 5
  },
  forgotPasswordContainer: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center"
  },
  forgotPasswordText: {
    fontSize: 18,
    fontFamily: "Montserrat-Regular"
  },
  registerContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12
  },
  registerText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Regular'
  },
  registerLink: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    marginLeft: 8
  }
});
