import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import COLORS from "../constants/colors";
import httpCommon from "../http-common";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import Checkbox from "expo-checkbox";


export default function Registracija() {
  const { t } = useTranslation();

  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [rod, setRod] = useState("");
  const [godine, setGodine] = useState("");
  const [mestoBoravista, setMestoBoravista] = useState("");
  const [brojTelefona, setBrojTelefona] = useState("");

  const [phoneCode, setPhoneCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isChecked, setIsChecked] = useState(false)


  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
    setBrojTelefona(phoneCode + phoneNumber);
  }, [phoneCode, phoneNumber]);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const data = [
    { label: t("gender-label.male"), value: "MUSKO" },
    { label: t("gender-label.female"), value: "ZENSKO" },
    { label: t("gender-label.other"), value: "DRUGO" },
  ];

  // State variable to hold the password
  // const [password, setPassword] = useState('');

  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const getDate = () => {
    let tempDate = date.toString().split(" ");
    let mesec = `${tempDate[1]}`;
    if (mesec === "Jan") {
      mesec = "01";
    }
    return date !== "" ? `${mesec}.${tempDate[2]}.${tempDate[3]}.` : "";
  };

  const toogleDatepicker = () => {
    setShowPicker(!showPicker);
  };

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
          <Text
            style={[
              styles.label,
              isFocus && { color: "blue", fontFamily: "Montserrat-Regular" },
            ]}
          >
            Dropdown label
          </Text>
        );
      }
    };
  };

  const onChangeEmail = (email) => {
    setEmail(email);
    validateEmail(email);
  };

  const onChangePassword = (password) => {
    setPassword(password);
    validatePassword(password);
  };

  const onChangeIme = (ime) => {
    setIme(ime);
  };

  const onChangePrezime = (prezime) => {
    setPrezime(prezime);
  };

  const onChangeGodine = (godine) => {
    setGodine(godine);
  };

  const onChangeMestoBoravista = (mestoBoravista) => {
    setMestoBoravista(mestoBoravista);
  };

  const onChanegePhoneCode = (phoneCode) => {
    setPhoneCode(phoneCode);
  };

  const onChangePhoneNumber = (phoneNumber) => {
    const cleanedPhoneNumber = phoneNumber.startsWith("0")
      ? phoneNumber.slice(1)
      : phoneNumber;
    setPhoneNumber(cleanedPhoneNumber);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(t("setEmailError"));
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password) => {
    // Password must contain at least 8 characters, 1 uppercase letter, 1 number, and 1 special character
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(t("setPasswordError"));
    } else {
      setPasswordError("");
    }
  };

  const registracija = async () => {
      if (emailError || passwordError) {
        // alert("Morate uneti validnu e-mail adresu i validnu lozinku!");
        Alert.alert(t("alertEmailPasswordError"))
        return;
      } else if(!isChecked){
        Alert.alert(t("alertCheckbox"));
        return;
      }

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

      const response = await axios.post(
        "http://10.0.2.2:8080/api/auth/signupPosetilac",
        posetilac,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Alert.alert(t("alertRegistrationSuccess"));
      navigation.navigate("Welcome");
    } catch (error) {
      console.error(t("consoleRegistrationError"), error);
      Alert.alert(t("alertRegistrationFailed"));
    }
  };

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

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10%",
          }}
        >
          {/* <Text style={{ fontFamily: "Montserrat-Bold", fontSize: 50, marginBottom: 40 }}>Registracija</Text> */}
          <View
            style={{
              width: "80%",
              borderWidth: 1,
              height: 50,
              marginBottom: 20,
              justifyContent: "center",
              padding: 20,
            }}
          >
            <TextInput
              value={email}
              onChangeText={onChangeEmail}
              style={{
                height: 50,
                color: "black",
                fontFamily: "Montserrat-Regular",
              }}
              placeholder={t("register-page.input.email")}
            />
          </View>
          {emailError ? (
            <Text
              style={{
                color: "red",
                marginBottom: 20,
                width: "80%",
                textAlign: "center",
              }}
            >
              {emailError}
            </Text>
          ) : null}
          <View
            style={{
              width: "80%",
              borderWidth: 1,
              height: 50,
              marginBottom: 20,
              justifyContent: "center",
              padding: 20,
            }}
          >
            <TextInput
              value={password}
              onChangeText={onChangePassword}
              secureTextEntry={!showPassword}
              style={{
                height: 50,
                color: "black",
                fontFamily: "Montserrat-Regular",
              }}
              placeholder={t("register-page.input.password")}
            />
            <TouchableOpacity
              onPress={toggleShowPassword}
              style={{ position: "absolute", right: 10 }}
            >
              <Icon
                name={showPassword ? "visibility-off" : "visibility"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          {passwordError ? (
            <Text
              style={{
                color: "red",
                marginBottom: 20,
                width: "80%",
                textAlign: "center",
              }}
            >
              {passwordError}
            </Text>
          ) : null}
          <View
            style={{
              width: "80%",
              borderWidth: 1,
              height: 50,
              marginBottom: 20,
              justifyContent: "center",
              padding: 20,
            }}
          >
            <TextInput
              value={ime}
              onChangeText={onChangeIme}
              style={{
                height: 50,
                color: "black",
                fontFamily: "Montserrat-Regular",
              }}
              placeholder={t("register-page.input.name")}
            />
          </View>
          <View
            style={{
              width: "80%",
              borderWidth: 1,
              height: 50,
              marginBottom: 20,
              justifyContent: "center",
              padding: 20,
            }}
          >
            <TextInput
              value={prezime}
              onChangeText={onChangePrezime}
              style={{
                height: 50,
                color: "black",
                fontFamily: "Montserrat-Regular",
              }}
              placeholder={t("register-page.input.surname")}
            />
          </View>
          <View
            style={{
              width: "80%",
              borderWidth: 1,
              height: 50,
              marginBottom: 20,
              justifyContent: "center",
              padding: 20,
            }}
          >
            <Dropdown
              itemTextStyle={{ fontFamily: "Montserrat-Regular" }}
              placeholderStyle={{ fontFamily: "Montserrat-Regular" }}
              data={data}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? t("register-page.input.gender") : "..."}
              // searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.value);
                setIsFocus(false);
                setRod(item.value);
              }}
            />
            {/* <TextInput style = {{height: 50, color: "black"}} placeholder="Rod" /> */}
          </View>
          <View
            style={{
              width: "80%",
              borderWidth: 1,
              height: 50,
              marginBottom: 20,
              justifyContent: "center",
              padding: 20,
            }}
          >
            <TextInput
              value={godine}
              onChangeText={onChangeGodine}
              style={{
                height: 50,
                color: "black",
                fontFamily: "Montserrat-Regular",
              }}
              keyboardType="numeric"
              placeholder={t("register-page.input.yearOfBirth")}
            />
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
          <View
            style={{
              width: "80%",
              borderWidth: 1,
              height: 50,
              marginBottom: 20,
              justifyContent: "center",
              padding: 20,
            }}
          >
            <TextInput
              value={mestoBoravista}
              onChangeText={onChangeMestoBoravista}
              style={{
                height: 50,
                color: "black",
                fontFamily: "Montserrat-Regular",
              }}
              placeholder={t("register-page.input.placeOfResidence")}
            />
          </View>
          <View style={{ flexDirection: "row", width: "80%" }}>
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                height: 50,
                justifyContent: "center",
                marginBottom: 20,
                padding: 20,
                marginRight: 5,
              }}
            >
              <TextInput
                value={phoneCode}
                onChangeText={onChanegePhoneCode}
                style={{
                  height: 50,
                  color: "black",
                  fontFamily: "Montserrat-Regular",
                }}
                keyboardType="numeric"
                placeholder="+381"
              />
            </View>
            <View
              style={{
                flex: 4,
                borderWidth: 1,
                height: 50,
                justifyContent: "center",
                marginBottom: 20,
                padding: 20,
              }}
            >
              <TextInput
                value={phoneNumber}
                onChangeText={onChangePhoneNumber}
                style={{
                  height: 50,
                  color: "black",
                  fontFamily: "Montserrat-Regular",
                }}
                keyboardType="numeric"
                placeholder="631234567"
              />
            </View>
          </View>
          <View style = {styles.container}>
            <View style={styles.checkboxContainer}>
              <Checkbox 
                value={isChecked}
                onValueChange={setIsChecked}
                tintColors={{ true: COLORS.blue, false: undefined }}
              />
              <TouchableOpacity onPress={() => navigation.navigate("Izjava")}>
                <Text style={styles.text}>{t("consentButton.button")}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ width: "50%", margin: 10 }}>
            {/* <Button title="Registracija"></Button> */}
            <TouchableOpacity
              onPress={registracija}
              style={{
                alignItems: "center",
                backgroundColor: "#61CDCD",
                padding: 13,
              }}
            >
              <Text style={{ fontFamily: "Montserrat-Regular" }}>
                {t("register-page.button.register")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center' // Aligns children vertically centered
  },
  text: {
    fontFamily: "Montserrat-Regular",
    marginLeft: 8, // Adjust spacing between checkbox and text
    color: '#0000FF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  }
});
