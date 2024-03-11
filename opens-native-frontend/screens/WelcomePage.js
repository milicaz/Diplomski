import { useEffect } from "react";
import { Button, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

export default function WelcomePage({ navigation }) {

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

  if(!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <View style={{ flex: 1 }}>

      <View>
        <Image
          source={require("../assets/opens2.png")}
          style={{
            height: 100,
            width: "90%",
            position: "absolute",
            margin: "5%",
            top: 100,
            // transform: [
            //   { translateX: 5 },
            //   { translateY: 50 },
            //   { rotate: "-15deg" },
            // ],
          }}
        />
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* <Button title="Registracija" textStyle = {{fontFamily: "Montserrat-Regular"}} onPress={() => navigation.navigate("Registracija")} /> */}
        <TouchableOpacity style={{alignItems: 'center', backgroundColor: '#61CDCD', padding: 13, width: "50%"}} onPress={() => navigation.navigate("Registracija")}>
          <Text style = {{fontFamily: "Montserrat-Regular"}}>Registracija</Text>
        </TouchableOpacity>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontFamily: "Montserrat-Regular" }}>Imate napravljen nalog?</Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={{ fontSize: 20, fontFamily: "Montserrat-Bold" }}>
              Prijavite se
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={{ paddingHorizontal: 22, position: "absolute", width: "100%" }}>
        <Pressable onPress={() => navigation.navigate("Main")}>
          <Text style={{ fontSize: 16, marginLeft: 4 }}>Home screen</Text>
        </Pressable>
      </View>
    </View>
  );
}
