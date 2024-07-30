import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import englishFlag from '../assets/flags/english.png';
import serbianFlag from '../assets/flags/serbian.png';
import COLORS from "../constants/colors";
import i18next from '../services/i18next';

export default function WelcomePage({ navigation }) {
  const { t } = useTranslation();

  const changeLng = lng => {
    i18next.changeLanguage(lng);
  };

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
          <TextInput style={{ height: 50, color: "black", fontFamily: "Montserrat-Regular" }} placeholder="Email" />
        </View>
        <View style={{ width: "80%", borderWidth: 1, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
          <TextInput secureTextEntry={!showPassword} value={password} onChangeText={setPassword} style={{ height: 50, color: "black", fontFamily: "Montserrat-Regular" }} placeholder="Password" />
        </View>
        <View style={{ width: "90%", alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity>
            <Text style={{ fontSize: 18, fontFamily: "Montserrat-Regular" }}>Zaboravili ste lozinku?</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "50%", margin: 10 }}>
          <TouchableOpacity style={{ alignItems: 'center', backgroundColor: '#61CDCD', padding: 13 }}>
            <Text style={{ fontFamily: "Montserrat-Bold" }}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "80%", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontFamily: "Montserrat-Regular" }}>Nemate nalog?</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 30 }}>
            <TouchableOpacity>
              <Text style={{ fontSize: 18, fontFamily: "Montserrat-Bold" }} onPress={() => navigation.navigate("Registracija")}>Registracija</Text>
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
