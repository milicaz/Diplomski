import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import COLORS from "../constants/colors";
import httpCommon from "../http-common";
import axios from "axios";


export default function Registracija() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [ime, setIme] = useState("")
  const [prezime, setPrezime] = useState("")
  const [rod, setRod] = useState("")
  const [godine, setGodine] = useState("")
  const [mestoBoravista, setMestoBoravista] = useState("")
  const [brojTelefona, setBrojTelefona] = useState("")
  // const [uloga, setUloga] = useState([])

  const [phoneCode, setPhoneCode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")


  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf')
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
    setBrojTelefona(phoneCode + phoneNumber)
    console.log("Broj telefona je: " + brojTelefona)
  }, [phoneCode, phoneNumber])

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const data = [
    { label: 'muško', value: 'MUSKO' },
    { label: 'žensko', value: 'ZENSKO' },
    { label: 'drugo', value: 'DRUGO' }
  ]

  // State variable to hold the password 
  // const [password, setPassword] = useState('');

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
    if (mesec === "Jan") {
      mesec = '01'
    }
    return date !== ''
      ? `${mesec}.${tempDate[2]}.${tempDate[3]}.`
      : '';
  };

  const toogleDatepicker = () => {
    setShowPicker(!showPicker);
  }

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
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
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue', fontFamily: "Montserrat-Regular" }]}>
            Dropdown label
          </Text>
        )
      }
    };

  }

  const onChangeEmail = (email) => {
    setEmail(email)
  }

  const onChangePassword = (password) => {
    setPassword(password)
  }

  const onChangeIme = (ime) => {
    setIme(ime)
  }

  const onChangePrezime = (prezime) => {
    setPrezime(prezime)
  }

  const onChangeGodine = (godine) => {
    setGodine(godine)
  }

  const onChangeMestoBoravista = (mestoBoravista) => {
    setMestoBoravista(mestoBoravista)
  }

  const onChanegePhoneCode = (phoneCode) => {
    setPhoneCode(phoneCode)
  }

  const onChangePhoneNumber = (phoneNumber) => {
    setPhoneNumber(phoneNumber)
  }

  const registracija = async () => {
    try {
    const posetilac = {
      email,
      password,
      ime,
      prezime,
      rod,
      godine,
      mestoBoravista,
      brojTelefona,
    };

    console.log("Posetilac je: " + posetilac)

      const response = await axios.post('http://10.0.2.2:8080/api/auth/signupPosetilac', posetilac, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      alert("Uspešno ste se registrovali!");
  } catch (error) {
    console.error("Error during registration:", error);
    alert("Registration failed. Please try again.");
  }
  }

  return (
    <ScrollView style={{ backgroundColor: COLORS.white }}>
      <View style={{ flex: 1 }}>

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
          <View style={{ width: "80%", borderWidth: 1, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
            <TextInput value={email} onChangeText={onChangeEmail} style={{ height: 50, color: "black", fontFamily: "Montserrat-Regular" }} placeholder="Email" />
          </View>
          <View style={{ width: "80%", borderWidth: 1, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
            <TextInput value={password} onChangeText={onChangePassword} style={{ height: 50, color: "black", fontFamily: "Montserrat-Regular" }} placeholder="Lozinka" />
          </View>
          <View style={{ width: "80%", borderWidth: 1, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
            <TextInput value={ime} onChangeText={onChangeIme} style={{ height: 50, color: "black", fontFamily: "Montserrat-Regular" }} placeholder="Ime" />
          </View>
          <View style={{ width: "80%", borderWidth: 1, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
            <TextInput value={prezime} onChangeText={onChangePrezime} style={{ height: 50, color: "black", fontFamily: "Montserrat-Regular" }} placeholder="Prezime" />
          </View>
          <View style={{ width: "80%", borderWidth: 1, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
            <Dropdown
              itemTextStyle={{ fontFamily: "Montserrat-Regular" }}
              placeholderStyle={{ fontFamily: "Montserrat-Regular" }}
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
                setRod(item.value)
              }}
            />
            {/* <TextInput style = {{height: 50, color: "black"}} placeholder="Rod" /> */}
          </View>
          <View style={{ width: "80%", borderWidth: 1, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
            <TextInput value={godine} onChangeText={onChangeGodine} style={{ height: 50, color: "black", fontFamily: "Montserrat-Regular" }} keyboardType="numeric" placeholder="Godina rodjenja" />
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
          <View style={{ width: "80%", borderWidth: 1, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
            <TextInput value={mestoBoravista} onChangeText={onChangeMestoBoravista} style={{ height: 50, color: "black", fontFamily: "Montserrat-Regular" }} placeholder="Mesto Boravista" />
          </View>
          <View style={{ flexDirection: "row", width: "80%" }}>
            <View style={{ flex: 1, borderWidth: 1, height: 50, justifyContent: "center", marginBottom: 20, padding: 20, marginRight: 5 }}>
              <TextInput value={phoneCode} onChangeText={onChanegePhoneCode} style={{ height: 50, color: "black", fontFamily: "Montserrat-Regular" }} keyboardType="numeric" placeholder="+381" />
            </View>
            <View style={{ flex: 4, borderWidth: 1, height: 50, justifyContent: "center", marginBottom: 20, padding: 20 }}>
              <TextInput value={phoneNumber} onChangeText={onChangePhoneNumber} style={{ height: 50, color: "black", fontFamily: "Montserrat-Regular" }} keyboardType="numeric" placeholder="631234567" />
            </View>
          </View>
          <View style={{ width: "50%", margin: 10 }}>
            {/* <Button title="Registracija"></Button> */}
            <TouchableOpacity onPress={registracija} style={{ alignItems: 'center', backgroundColor: '#61CDCD', padding: 13 }}>
              <Text style={{ fontFamily: "Montserrat-Regular" }}>Registracija</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

