import { Alert, Button, Text, TouchableOpacity, View } from "react-native";

export default function Dostupnost() {

    const mestaAlert = () => {
        Alert.alert('Trenutno ima 40 slobodnih mesta.')
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

    return(
        
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text style={{ fontWeight: "bold", fontSize: 50, marginBottom: 40, fontStyle:"italic" }}>Dostupnost</Text>
            <View style = {{width: "80%", marginBottom: 20}}>
                <Button title = "Broj dostupnih mesta" color= "#5f9ea0" titleStyle = {{fontSize:20}} onPress={mestaAlert} />
            </View>
            <View style = {{width: "80%", marginBottom: 20}}>
                <Button title = "Broj dostupnih laptopova" color= "#5f9ea0" onPress={laptopAlert} />
            </View>
            <View style = {{width: "80%", marginBottom: 20}}>
                <Button title = "Broj dostupnih miseva" color= "#5f9ea0" onPress={misAlert} />
            </View>
            <View style = {{width: "80%", marginBottom: 20}}>
                <Button title = "Dostupnost sony-a" color= "#5f9ea0" onPress={sonyAlert} />
            </View>
        </View>
    )
}