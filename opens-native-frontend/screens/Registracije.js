import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../constants/colors";
import { AuthContext } from "../contexts/AuthContext";


export default function Registracija() {
  const { t } = useTranslation();
  const { register } = useContext(AuthContext);
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
  const [isChecked, setIsChecked] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
      Toast.show({
        type: 'error',
        text1: t("alertRegistrationFailedHeader"),
        text2: t("alertEmailPasswordError"),
        duration: 7000, // Display for 7 seconds
      });
      return;
    } else if (!isChecked) {
      Toast.show({
        type: 'error',
        text1: t("alertRegistrationFailedHeader"),
        text2: t("alertCheckbox"),
        duration: 7000, // Display for 7 seconds
      });
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

      const response = await register(posetilac);

      if (response) {
        navigation.navigate("Welcome");
      }
    } catch (error) {
      console.error(t("consoleRegistrationError"), error);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: "15%",
          }}
        >
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
                //marginBottom: 20,
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
                //marginBottom: 20,
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
          <View style={styles.container}>
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
          <View style={{ width: "80%", margin: 10 }}>
            <TouchableOpacity
              onPress={registracija}
              style={{
                alignItems: "center",
                borderColor: COLORS.blue, borderWidth: 2, alignItems: 'center',
                justifyContent: 'center', backgroundColor: COLORS.blue,
                padding: 13,
              }}
            >
              <Text style={{ fontSize: 18, fontFamily: "Montserrat-Bold", color: COLORS.white }}>
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
    width: "85%",
    //marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center' // Aligns children vertically centered
  },
  text: {
    fontFamily: "Montserrat-Bold",
    marginLeft: 8, // Adjust spacing between checkbox and text
    color: '#0000FF',
    textAlign: 'justify',
    textDecorationLine: 'underline',
  }
});
