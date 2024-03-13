import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Button, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import COLORS from "../constants/colors";


export default function Login() {

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

  // State variable to hold the password 
  const [password, setPassword] = useState(''); 
  
  // State variable to track password visibility 
  const [showPassword, setShowPassword] = useState(false); 

  // Function to toggle the password visibility state 
  const toggleShowPassword = () => { 
      setShowPassword(!showPassword); 
  }

  return (

      <View style={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.white}}>

      {/* <Text style={{fontFamily: "Montserrat-Bold", fontSize: 50, marginBottom: 40 }}>Login</Text> */}
      <View style={{ width: "80%", borderWidth: 2, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
        <TextInput style={{ height: 50, color: "black", fontFamily: "Montserrat-Regular" }} placeholder="Email" />
      </View>
      <View style={{ width: "80%", borderWidth: 2, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
        <TextInput secureTextEntry={!showPassword} value={password} onChangeText={setPassword} style={{ height: 50, color: "black", fontFamily: "Montserrat-Regular" }} placeholder="Password" />
      </View>
      <TouchableOpacity>
        <Text style={{ fontSize: 18, fontFamily: "Montserrat-Regular" }}>Zaboravili ste lozinku?</Text>
      </TouchableOpacity>
      <View  style = {{ width: "50%", margin: 10}}>
      <TouchableOpacity style={{alignItems: 'center', backgroundColor: '#61CDCD', padding: 13}}>
          <Text style = {{fontFamily: "Montserrat-Regular"}}>Login</Text>
        </TouchableOpacity>
      </View>
      </View>
  );
}
