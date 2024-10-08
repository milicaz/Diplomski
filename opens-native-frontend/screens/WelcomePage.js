import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import englishFlag from '../assets/flags/english.png';
import serbianFlag from '../assets/flags/serbian.png';
import COLORS from "../constants/colors";
import { AuthContext } from "../contexts/AuthContext";
import i18next from '../services/i18next';

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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf')
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();

  }, [])

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  const onChangeEmail = (email) => {
    setEmail(email)
  }

  const onChangePassword = (password) => {
    setPassword(password)
  }

  const handleLogin = async () => {
    const loginDTO = { email, password };

    try {
      login(loginDTO);
    } catch (error) {
      if (error.response) {
        Alert.alert('Error', error.response.data.message || 'Login failed.');
      } else if (error.request) {
        Alert.alert('Error', 'No response from the server.');
      } else {
        Alert.alert('Error', 'An error occurred during login.');
      }
    }
  };

  return (
    <ScrollView style={{ backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>

        <View>
          <Image
            source={require("../assets/opens2.png")}
            style={{
              height: windowHeight * 0.47,
              width: "100%",
              position: "absolute",
            }}
          />
        </View>

        <View style={{ flexDirection: "row", marginHorizontal: 12, top: windowHeight * 0.49, justifyContent: 'flex-end' }}>
          <TouchableOpacity onPress={() => changeLng('sr')}>
            <Image source={serbianFlag} style={{ width: 30, height: 20, marginRight: 5 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeLng('en')}>
            <Image source={englishFlag} style={{ width: 30, height: 20, marginRight: 5 }} />
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center", top: windowHeight * 0.20, width: "100%", height: windowHeight }}>
          <View style={{ width: "80%", borderWidth: 1, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
            <TextInput value={email} onChangeText={onChangeEmail} style={{ height: 50, color: "black", fontFamily: "Montserrat-Regular" }} placeholder={t('welcome-page.input.email')} />
          </View>
          <View style={{ width: "80%", borderWidth: 1, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
            <TextInput value={password} onChangeText={onChangePassword} secureTextEntry={!showPassword} style={{ height: 50, color: "black", fontFamily: "Montserrat-Regular" }} placeholder={t('welcome-page.input.password')} />
            <TouchableOpacity onPress={toggleShowPassword} style={{ position: 'absolute', right: 10 }}>
              <Icon name={showPassword ? 'visibility-off' : 'visibility'} size={24} color="gray" />
            </TouchableOpacity>
          </View>
          <View style={{ width: "80%", margin: 10 }}>
            <TouchableOpacity onPress={handleLogin} style={{
              alignItems: 'center', borderColor: COLORS.blue, borderWidth: 2, alignItems: 'center',
              justifyContent: 'center', backgroundColor: COLORS.blue, padding: 13
            }}>
              <Text style={{ fontSize: 18, fontFamily: "Montserrat-Bold", color: COLORS.white }}>{t('welcome-page.text.login')}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "90%", alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity >
              <Text style={{ fontSize: 18, fontFamily: "Montserrat-Regular" }} onPress={() => navigation.navigate("ForgotPassword")}>{t('welcome-page.text.forgot-password')}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "80%", flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 12 }}>
            <Text style={{ fontSize: 18, fontFamily: "Montserrat-Regular" }}>{t('welcome-page.text.no-account')}</Text>
            <TouchableOpacity>
              <Text style={{ fontSize: 18, fontFamily: "Montserrat-Bold", marginLeft: 8 }} onPress={() => navigation.navigate("Registracija")}>{t('welcome-page.text.register')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
