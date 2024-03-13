import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Alert, Button, Image, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import ReactNativeModal from "react-native-modal";
import { useState } from "react/cjs/react.development";
import COLORS from "../constants/colors";

export default function Dostupnost() {

    const [fontsLoaded] = useFonts({
        'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat-BoldItalic': require('../assets/fonts/Montserrat-BoldItalic.ttf') 
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

    const mestaAlert = () => {
        Alert.alert('Trenutno ima 40 slobodnih mesta')
    }

    const laptopAlert = () => {
        Alert.alert('Trenutno ima 10 slobodnih laptopova.')
    }

    const misAlert = () => {
        Alert.alert('Trenutno ima 2 slobodna misa.')
    }

    const sonyAlert = () => {
        Alert.alert('Sony je zauzet.')
    }

    const headphonesAlert = () => {
        Alert.alert('Broj dostupnih slusalica je 5.')
    }

    return(
        
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.white}}>
            <Text style={{ fontFamily: "Montserrat-Bold", fontSize: 50, marginBottom: 40}}>Dostupnost</Text>
            <View style = {{ flexDirection: "row", width: "90%", marginBottom: 20}}>
                <View style = {{flex : 1}}>
                    <Image source = {require("../assets/stolica.png")} style={{ height: 55, width: 55}}/>
                </View>
                <View style = {{flex: 4}}>
                    <Text style = {{fontFamily: "Montserrat-Regular", backgroundColor: '#A3C57B', padding: 18}}>40 slobodnih mesta.</Text>
                </View>
            </View>
            <View style = {{flexDirection:"row", width: "90%", marginBottom: 20}}>
                <View style = {{flex: 1}}>
                    <Image source = {require("../assets/laptop.png")} style={{ height: 55, width: 55}}/>
                </View>
                <View style = {{flex: 4}}>
                <Text style = {{fontFamily: "Montserrat-Regular", backgroundColor: '#F56F66', padding: 18}}>10 slobodnih laptopova.</Text>
                </View>
            </View>
            <View style = {{flexDirection:"row", width: "90%", marginBottom: 20}}>
                <View style = {{flex : 1}}>
                    <Image source = {require("../assets/mis.png")} style={{ height: 55, width: 55}}/>
                </View>
                <View style = {{flex: 4}}>
                    <Text style = {{fontFamily: "Montserrat-Regular", backgroundColor: '#FBB537', padding: 18}}>2 slobodna miša.</Text>
                </View>
            </View>
            <View style = {{flexDirection:"row", width: "90%", marginBottom: 20}}>
                <View style = {{flex: 1}}>
                    <Image source = {require("../assets/slusalice.png")} style={{ height: 55, width: 55}}/>
                </View>
                <View style = {{flex : 4}}>
                    <Text style = {{fontFamily: "Montserrat-Regular", backgroundColor: '#61CDCD', padding: 18}}>5 slobodnih slušsalica</Text>
                </View>
            </View>
            <View style = {{flexDirection:"row", width: "90%", marginBottom: 20}}>
                <View style = {{flex: 1}}>
                    <Image source = {require("../assets/sony.png")} style={{ height: 55, width: 55}}/>
                </View>
                <View style = {{flex : 4}}>
                    <Text style = {{fontFamily: "Montserrat-Regular", backgroundColor: '#A18BBD', padding: 18}}>Sony je zeuzet.</Text>
                </View>
            </View>
        </View>
    )
}