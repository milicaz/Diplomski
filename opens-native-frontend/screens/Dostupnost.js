import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Alert, Button, Image, Modal, Text, TouchableOpacity, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import ReactNativeModal from "react-native-modal";
import { useState } from "react/cjs/react.development";

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
        
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text style={{ fontFamily: "Montserrat-BoldItalic", fontSize: 50, marginBottom: 40 }}>Dostupnost</Text>
            <View style = {{ flexDirection: "row", width: "80%", marginBottom: 20}}>
                <View style = {{flex : 1}}>
                    <Image source = {require("../assets/stolica.png")} style={{ height: 45, width: 45}}/>
                </View>
                <View style = {{flex: 4}}>
                    {/* <Button title = "Broj dostupnih mesta" color= "#5f9ea0" titleStyle = {{fontSize:20}} onPress={mestaAlert} /> */}
                    <TouchableOpacity style={{alignItems: 'center', backgroundColor: '#A3C57B', padding: 13,}} onPress={mestaAlert}>
                        <Text style = {{fontFamily: "Montserrat-Regular"}}>Broj dostupnih mesta</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {{flexDirection:"row", width: "80%", marginBottom: 20}}>
                <View style = {{flex: 1}}>
                    <Image source = {require("../assets/laptop.png")} style={{ height: 45, width: 45}}/>
                </View>
                <View style = {{flex: 4}}>
                    {/* <Button title = "Broj dostupnih laptopova" color= "#5f9ea0" onPress={laptopAlert} /> */}
                    <TouchableOpacity style={{alignItems: 'center', backgroundColor: '#F56F66', padding: 13,}} onPress={laptopAlert}>
                        <Text style = {{fontFamily: "Montserrat-Regular"}}>Broj dostupnih laptopova</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {{flexDirection:"row", width: "80%", marginBottom: 20}}>
                <View style = {{flex : 1}}>
                    <Image source = {require("../assets/mis.png")} style={{ height: 45, width: 45}}/>
                </View>
                <View style = {{flex: 4}}>
                    {/* <Button title = "Broj dostupnih miseva" color= "#5f9ea0" onPress={misAlert} /> */}
                    <TouchableOpacity style={{alignItems: 'center', backgroundColor: '#FBB537', padding: 13,}} onPress={misAlert}>
                        <Text style = {{fontFamily: "Montserrat-Regular"}}>Broj dostupnih miseva</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {{flexDirection:"row", width: "80%", marginBottom: 20}}>
                <View style = {{flex: 1}}>
                    <Image source = {require("../assets/slusalice.png")} style={{ height: 45, width: 45}}/>
                </View>
                <View style = {{flex : 4}}>
                    {/* <Button title = "Broj dostupnih slusalica" color= "#5f9ea0" onPress={headphonesAlert} /> */}
                    <TouchableOpacity style={{alignItems: 'center', backgroundColor: '#61CDCD', padding: 13,}} onPress={headphonesAlert}>
                        <Text style = {{fontFamily: "Montserrat-Regular"}}>Broj dostupnih slusalica</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {{flexDirection:"row", width: "80%", marginBottom: 20}}>
                <View style = {{flex: 1}}>
                    <Image source = {require("../assets/sony.png")} style={{ height: 45, width: 45}}/>
                </View>
                <View style = {{flex : 4}}>
                    {/* <Button title = "Dostupnost sony-a" color= "#5f9ea0" onPress={sonyAlert} /> */}
                    <TouchableOpacity style={{alignItems: 'center', backgroundColor: '#A18BBD', padding: 13,}} onPress={sonyAlert}>
                        <Text style = {{fontFamily: "Montserrat-Regular"}}>Dostupnost sony-a</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}