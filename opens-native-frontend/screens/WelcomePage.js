import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import englishFlag from '../assets/flags/english.png';
import serbianFlag from '../assets/flags/serbian.png';
import COLORS from "../constants/colors";
import i18next from '../services/i18next';
import axios from "axios";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function WelcomePage({ navigation }) {

  const { t } = useTranslation();

  const changeLng = lng => {
    i18next.changeLanguage(lng);
  };

  const [email, setEmail] = useState('');

  // State variable to hold the password 
  const [password, setPassword] = useState('');

  // State variable to track password visibility 
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle the password visibility state 
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
    // console.log("Email je: " + email)
    setEmail(email)
  }

  const onChangePassword = (password) => {
    // console.log("Password je: " + password)
    setPassword(password)
  }

  const handleLogin = async () => {
    const loginDTO = {
      email,
      password
    }

    // console.log("login je: " + loginDTO)

    const response = await axios.post('http://10.0.2.2:8080/api/auth/loginPosetilac', loginDTO, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log("Response je: " + response)
      navigation.navigate('Main')
  }

  return (
    <ScrollView style={{ backgroundColor: COLORS.white }}>
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>

      <View>
        <Image
          source={require("../assets/opens2.png")}
          style={{
            height: 300,
            width: "100%",
            position: "absolute",
          }}
        />
      </View>

      <View style={{ flexDirection: "row", marginHorizontal: 12, top: 305, justifyContent: 'flex-end' }}>
        <TouchableOpacity onPress={() => changeLng('sr')}>
          <Image source={serbianFlag} style={{ width: 30, height: 20, marginRight: 5 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeLng('en')}>
          <Image source={englishFlag} style={{ width: 30, height: 20, marginRight: 5 }} />
        </TouchableOpacity>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", height: 950 }}>
        {/* <Button title="Registracija" textStyle = {{fontFamily: "Montserrat-Regular"}} onPress={() => navigation.navigate("Registracija")} />
        <TouchableOpacity style={{alignItems: 'center', backgroundColor: '#61CDCD', padding: 13, width: "50%"}} onPress={() => navigation.navigate("Registracija")}>
          <Text style = {{fontFamily: "Montserrat-Bold", color: "black"}}>Registracija</Text>
        </TouchableOpacity>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontFamily: "Montserrat-Regular" }}>Imate napravljen nalog?</Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={{ fontSize: 20, fontFamily: "Montserrat-Bold" }}>
              Prijavite se
            </Text>
          </Pressable>
        </View> */}
        <View style={{ width: "80%", borderWidth: 1, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
          <TextInput value={email} onChangeText={onChangeEmail} style={{ height: 50, color: "black", fontFamily: "Montserrat-Regular" }} placeholder={t('welcome-page.input.email')} />
        </View>
        <View style={{ width: "80%", borderWidth: 1, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
          <TextInput value={password} onChangeText={onChangePassword} secureTextEntry={!showPassword} style={{ height: 50, color: "black", fontFamily: "Montserrat-Regular" }} placeholder={t('welcome-page.input.password')} />
          <TouchableOpacity onPress={toggleShowPassword} style={{ position: 'absolute', right: 10 }}>
              <Icon name={showPassword ? 'visibility-off' : 'visibility'} size={24} color="gray" />
            </TouchableOpacity>
        </View>
        <View style={{ width: "90%", alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity >
            <Text style={{ fontSize: 18, fontFamily: "Montserrat-Regular" }} onPress={() => navigation.navigate("ResetPassword")}>{t('welcome-page.text.forgot-password')}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "50%", margin: 10 }}>
          <TouchableOpacity onPress={handleLogin} style={{ alignItems: 'center', backgroundColor: '#61CDCD', padding: 13 }}>
            <Text style={{ fontFamily: "Montserrat-Bold" }}>{t('welcome-page.text.login')}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "80%", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontFamily: "Montserrat-Regular" }}>{t('welcome-page.text.no-account')}</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 30 }}>
            <TouchableOpacity>
              <Text style={{ fontSize: 18, fontFamily: "Montserrat-Bold" }} onPress={() => navigation.navigate("Registracija")}>{t('welcome-page.text.register')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ paddingHorizontal: 22, position: "absolute", width: "100%" }}>
        <Pressable onPress={() => navigation.navigate("Main")}>
          <Text style={{ fontSize: 16, marginLeft: 4 }}>Home screen</Text>
        </Pressable>
      </View>
    </View>
    </ScrollView>
  );
}
