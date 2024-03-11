import { AntDesign } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useFonts } from "expo-font";
import { Fragment, useEffect, useState } from "react";
import { Button, Image, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-datepicker";
import { Dropdown } from "react-native-element-dropdown";
import SearchableDropDown from "react-native-searchable-dropdown";
import * as SplashScreen from "expo-splash-screen";
import COLORS from "../constants/colors";


export default function Registracija() {

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

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const data = [
    {label: 'Musko', value: '1'},
    {label: 'Zensko', value: '2'},
    {label: 'Drugo', value: '3'}
  ]

  // State variable to hold the password 
  const [password, setPassword] = useState(''); 
  
  // State variable to track password visibility 
  const [showPassword, setShowPassword] = useState(false); 

  // Function to toggle the password visibility state 
  const toggleShowPassword = () => { 
      setShowPassword(!showPassword); 
  }

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const getDate = () => {
    let tempDate = date.toString().split(' ');
    let mesec = `${tempDate[1]}`
    if(mesec === "Jan"){
      mesec = '01'
    }
    return date !== ''
      ? `${mesec}.${tempDate[2]}.${tempDate[3]}.`
      : '';
  };

  const toogleDatepicker = () => {
    setShowPicker(!showPicker);
  }

  const onChange = ({type}, selectedDate) => {
    if(type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if(Platform.OS === "android"){
        toogleDatepicker();
        setDate(currentDate);
      }

    } else {
      toogleDatepicker();
    }

    const confirmIOSDate = () => {
      setDate(date);
      toogleDatepicker();
    };

    const renderLabel = () => {
      if(value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue', fontFamily: "Montserrat-Regular"}]}>
            Dropdown label
          </Text>
        )
      }
    };

  }

  return (
    <ScrollView style = {{ backgroundColor: COLORS.white}}>
    <View style = {{ flex: 1}}>

    {/* <View>
        <Image
          source={require("../assets/opens2.png")}
          style={{
            height: 100,
            margin: "5%",
            width: "90%",
            position: "absolute",

          }}
        />
      </View> */}

    <View style={{ alignItems: "center", justifyContent: "center", marginTop: "10%" }}>
      {/* <Text style={{ fontFamily: "Montserrat-Bold", fontSize: 50, marginBottom: 40 }}>Registracija</Text> */}
      <View style={{ width: "80%", borderWidth: 2, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
        <TextInput style = {{height: 50, color: "black", fontFamily: "Montserrat-Regular"}} placeholder="Email" />
      </View>
      <View style={{ width: "80%", borderWidth: 2, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
        <TextInput style = {{height: 50, color: "black", fontFamily: "Montserrat-Regular"}} placeholder="Lozinka" />
      </View>
      <View style={{ width: "80%", borderWidth: 2, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
        <TextInput style = {{height: 50, color: "black", fontFamily: "Montserrat-Regular"}} placeholder="Ime" />
      </View>
      <View style={{ width: "80%", borderWidth: 2, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
        <TextInput style = {{height: 50, color: "black", fontFamily: "Montserrat-Regular"}} placeholder="Prezime" />
      </View>
      <View style={{ width: "80%", borderWidth: 2, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
        <Dropdown
          itemTextStyle = {{fontFamily: "Montserrat-Regular"}}
          placeholderStyle = {{fontFamily: "Montserrat-Regular"}}
          data={data}
          // search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Rod' : '...'}
          // searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
        {/* <TextInput style = {{height: 50, color: "black"}} placeholder="Rod" /> */}
      </View>
      <View style={{ width: "80%", borderWidth: 2, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
        <TextInput style = {{height: 50, color: "black", fontFamily: "Montserrat-Regular"}} keyboardType="numeric" placeholder="Godina rodjenja"/>
        {/* {showPicker && (
          <RNDateTimePicker mode = "date" display = "default" value={date} onChange={onChange} />
        )}

        {showPicker && Platform.OS === "ios" && (
          <View style = {{ flexDirection: "row", justifyContent: "space-around" }}>
            <TouchableOpacity style = {{backgroundColor: "#11182711", paddingHorizontal:20}} onPress={toogleDatepicker}>
              <Text style = {{fontSize: 14, fontWeight: "500", color: "#fff", fontFamily: "Montserrat-Regular"}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{backgroundColor: "#11182711", paddingHorizontal:20}} onPress={confirmIOSDate}>
              <Text style = {{fontSize: 14, fontWeight: "500", color: "#fff", fontFamily: "Montserrat-Regular"}}>Confirm</Text>
            </TouchableOpacity>
          </View>
        )}

        {!showPicker && (
          <Pressable onPress={toogleDatepicker}>
          <TextInput style = {{height: 50, color: "black", fontFamily: "Montserrat-Regular"}} placeholder="Datum rodjenja" editable = {false} value={getDate()} onChangeText={setDate} onPressIn={toogleDatepicker} />
        </Pressable>
        )} */}
        
      </View>
      <View style={{ width: "80%", borderWidth: 2, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
        <TextInput style = {{height: 50, color: "black", fontFamily: "Montserrat-Regular"}} placeholder="Mesto Boravista" />
      </View>
        <View style = {{flexDirection:"row", width: "80%"}}>
          <View style = {{flex: 1, borderWidth: 2, height: 50, justifyContent: "center", marginBottom: 20, padding: 20}}>
            <TextInput style = {{ height: 50, color:"black", fontFamily: "Montserrat-Regular" }} keyboardType="numeric" placeholder="+381" />
          </View>
          <View style={{flex: 4, borderWidth: 2, height: 50, justifyContent: "center", marginBottom: 20, padding: 20}}>
            <TextInput style = {{height: 50, color: "black", fontFamily: "Montserrat-Regular"}} keyboardType="numeric" placeholder="0631234567" />
          </View>
          </View>
      <View style= {{width:"50%", margin:10}}>
        {/* <Button title="Registracija"></Button> */}
        <TouchableOpacity style={{alignItems: 'center', backgroundColor: '#61CDCD', padding: 13}}>
          <Text style = {{fontFamily: "Montserrat-Regular"}}>Registracija</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
    </ScrollView>
  );
}

