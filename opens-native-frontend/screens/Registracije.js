import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RFValue } from "react-native-responsive-fontsize";
import { scale, verticalScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../constants/colors";
import useAuth from "../hooks/useAuth";

export default function Registracija() {
  const { t } = useTranslation();
  const { register } = useAuth();
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

  const [error, setError] = useState({
    email: "",
    password: "",
    ime: "",
    prezime: "",
    rod: "",
    godine: "",
    mestoBoravista: "",
    brojTelefona: "",
    isChecked: "",
  });

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
    if (error.email) {
      setError({ ...error, email: "" });
    }
  };

  const onChangePassword = (password) => {
    setPassword(password);
    if (error.password) {
      setError({ ...error, password: "" });
    }
  };

  const onChangeIme = (ime) => {
    setIme(ime);
    if (error.ime) {
      setError({ ...error, ime: "" });
    }
  };

  const onChangePrezime = (prezime) => {
    setPrezime(prezime);
    if (error.prezime) {
      setError({ ...error, prezime: "" });
    }
  };

  const onChangeRod = (item) => {
    setRod(item.value);
    if (error.rod) {
      setError((prevError) => ({
        ...prevError,
        rod: "",
      }));
    }
  };

  const onChangeGodine = (godine) => {
    setGodine(godine);
    if (error.godine) {
      setError({ ...error, godine: "" });
    }
  };

  const onChangeMestoBoravista = (mestoBoravista) => {
    setMestoBoravista(mestoBoravista);
    if (error.mestoBoravista) {
      setError({ ...error, mestoBoravista: "" });
    }
  };

  onChangeBrojTelefona = (newPhoneCode, newPhoneNumber) => {
    const formattedPhoneCode = newPhoneCode.startsWith("+")
      ? newPhoneCode
      : "+" + newPhoneCode;

    setPhoneCode(formattedPhoneCode);

    const cleanedPhoneNumber = newPhoneNumber.startsWith("0")
      ? newPhoneNumber.slice(1)
      : newPhoneNumber;

    setPhoneNumber(cleanedPhoneNumber);

    const combinedPhoneNumber = formattedPhoneCode + cleanedPhoneNumber;
    setBrojTelefona(combinedPhoneNumber);

    if (error.brojTelefona) {
      setError((prevError) => ({
        ...prevError,
        brojTelefona: "",
      }));
    }
  };

  const onCheckBoxChange = (newValue) => {
    setIsChecked(newValue);
    if (error.isChecked) {
      setError({ ...error, isChecked: "" });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegistracija = async () => {
    let valid = true;
    const newError = {
      email: "",
      password: "",
      ime: "",
      prezime: "",
      rod: "",
      godine: "",
      mestoBoravista: "",
      brojTelefona: "",
    };

    if (!email) {
      newError.email = t("welcome-page.error.emailRequired");
      valid = false;
    } else if (!validateEmail(email)) {
      newError.email = t("welcome-page.error.invalidEmail");
      valid = false;
    }

    if (!password) {
      newError.password = t("welcome-page.error.passwordRequired");
      valid = false;
    } else if (!validatePassword(password)) {
      newError.password = t("register-page.error.invalidPassword");
      valid = false;
    }

    if (!ime) {
      newError.ime = t("register-page.error.nameRequired");
      valid = false;
    }

    if (!prezime) {
      newError.prezime = t("register-page.error.surnameRequired");
      valid = false;
    }

    if (!rod) {
      newError.rod = t("register-page.error.genderRequired");
      valid = false;
    }

    if (!godine) {
      newError.godine = t("register-page.error.yearOfBirthRequired");
      valid = false;
    }

    if (!mestoBoravista) {
      newError.mestoBoravista = t(
        "register-page.error.placeOfResidenceRequired"
      );
      valid = false;
    }

    if (
      !phoneCode ||
      !phoneNumber ||
      phoneCode.length < 1 ||
      phoneNumber.length < 1
    ) {
      newError.brojTelefona = t("register-page.error.phoneRequired");
      valid = false;
    } else {
      const phoneRegex = /^\+(\d{2,3})(\d{6,10})$/;
      if (!phoneRegex.test(phoneCode + phoneNumber)) {
        newError.brojTelefona = t("register-page.error.invalidPhone");
        valid = false;
      }
    }

    if (!isChecked) {
      newError.isChecked = t("register-page.error.termsRequired");
      valid = false;
    }

    setError(newError);

    if (valid) {
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
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: COLORS.white }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.form}>
            <View style={styles.formGroup}>
              <View
                style={[
                  styles.inputContainer,
                  {
                    borderColor: error.email ? COLORS.red : COLORS.black,
                    marginBottom: error.email ? 10 : 20,
                  },
                ]}
              >
                <TextInput
                  value={email}
                  onChangeText={onChangeEmail}
                  style={styles.input}
                  placeholder={t("register-page.input.email")}
                  placeholderTextColor="#999"
                />
              </View>
              {error.email ? (
                <Text style={styles.errorText}>{error.email}</Text>
              ) : null}
            </View>
            <View style={styles.formGroup}>
              <View
                style={[
                  styles.inputContainer,
                  {
                    borderColor: error.password ? COLORS.red : COLORS.black,
                    marginBottom: error.password ? 10 : 20,
                  },
                ]}
              >
                <TextInput
                  value={password}
                  onChangeText={onChangePassword}
                  secureTextEntry={!showPassword}
                  style={styles.input}
                  placeholder={t("register-page.input.password")}
                  placeholderTextColor="#999"
                />
                <TouchableOpacity
                  onPress={toggleShowPassword}
                  style={styles.visibilityToggle}
                >
                  <Icon
                    name={showPassword ? "visibility-off" : "visibility"}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              {error.password ? (
                <Text style={styles.errorText}>{error.password}</Text>
              ) : null}
            </View>
            <View style={styles.formGroup}>
              <View
                style={[
                  styles.inputContainer,
                  {
                    borderColor: error.ime ? COLORS.red : COLORS.black,
                    marginBottom: error.ime ? 10 : 20,
                  },
                ]}
              >
                <TextInput
                  value={ime}
                  onChangeText={onChangeIme}
                  style={styles.input}
                  placeholder={t("register-page.input.name")}
                  placeholderTextColor="#999"
                />
              </View>
              {error.ime ? (
                <Text style={styles.errorText}>{error.ime}</Text>
              ) : null}
            </View>
            <View style={styles.formGroup}>
              <View
                style={[
                  styles.inputContainer,
                  {
                    borderColor: error.prezime ? COLORS.red : COLORS.black,
                    marginBottom: error.prezime ? 10 : 20,
                  },
                ]}
              >
                <TextInput
                  value={prezime}
                  onChangeText={onChangePrezime}
                  style={styles.input}
                  placeholder={t("register-page.input.surname")}
                  placeholderTextColor="#999"
                />
              </View>
              {error.prezime ? (
                <Text style={styles.errorText}>{error.prezime}</Text>
              ) : null}
            </View>
            <View style={styles.formGroup}>
              <View
                style={[
                  styles.inputContainer,
                  {
                    borderColor: error.rod ? COLORS.red : COLORS.black,
                    marginBottom: error.rod ? 10 : 20,
                  },
                ]}
              >
                <Dropdown
                  itemTextStyle={styles.dropdownText}
                  placeholderStyle={styles.dropdownText}
                  data={data}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={
                    !isFocus ? t("register-page.input.gender") : "..."
                  }
                  placeholderTextColor="#999"
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setValue(item.value);
                    onChangeRod(item);
                  }}
                />
              </View>
              {error.rod ? (
                <Text style={styles.errorText}>{error.rod}</Text>
              ) : null}
            </View>
            <View style={styles.formGroup}>
              <View
                style={[
                  styles.inputContainer,
                  {
                    borderColor: error.godine ? COLORS.red : COLORS.black,
                    marginBottom: error.godine ? 10 : 20,
                  },
                ]}
              >
                <TextInput
                  value={godine}
                  onChangeText={onChangeGodine}
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder={t("register-page.input.yearOfBirth")}
                  placeholderTextColor="#999"
                />
              </View>
              {error.godine ? (
                <Text style={styles.errorText}>{error.godine}</Text>
              ) : null}
            </View>
            <View style={styles.formGroup}>
              <View
                style={[
                  styles.inputContainer,
                  {
                    borderColor: error.mestoBoravista
                      ? COLORS.red
                      : COLORS.black,
                    marginBottom: error.mestoBoravista ? 10 : 20,
                  },
                ]}
              >
                <TextInput
                  value={mestoBoravista}
                  onChangeText={onChangeMestoBoravista}
                  style={styles.input}
                  placeholder={t("register-page.input.placeOfResidence")}
                  placeholderTextColor="#999"
                />
              </View>
              {error.mestoBoravista ? (
                <Text style={styles.errorText}>{error.mestoBoravista}</Text>
              ) : null}
            </View>
            <View style={styles.formGroup}>
              <View
                style={[
                  styles.phoneContainer,
                  { marginBottom: error.brojTelefona ? 10 : 20 },
                ]}
              >
                <View
                  style={[
                    styles.phoneInputContainer,
                    {
                      flex: 1,
                      marginRight: 5,
                      borderColor: error.brojTelefona
                        ? COLORS.red
                        : COLORS.black,
                    },
                  ]}
                >
                  <TextInput
                    value={phoneCode}
                    onChangeText={(phoneCode) =>
                      onChangeBrojTelefona(phoneCode, phoneNumber)
                    }
                    style={styles.input}
                    keyboardType="default"
                    maxLength={4}
                    placeholder="+381"
                    placeholderTextColor="#999"
                  />
                </View>
                <View
                  style={[
                    styles.phoneInputContainer,
                    {
                      flex: 4,
                      borderColor: error.brojTelefona
                        ? COLORS.red
                        : COLORS.black,
                    },
                  ]}
                >
                  <TextInput
                    value={phoneNumber}
                    onChangeText={(phoneNumber) =>
                      onChangeBrojTelefona(phoneCode, phoneNumber)
                    }
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="631234567"
                    placeholderTextColor="#999"
                  />
                </View>
              </View>
              {error.brojTelefona ? (
                <Text style={styles.errorText}>{error.brojTelefona}</Text>
              ) : null}
            </View>
            <View style={styles.formGroup}>
              <View
                style={[
                  styles.checkboxContainer,
                  { marginBottom: error.brojTelefona ? 10 : 20 },
                ]}
              >
                <View style={styles.checkbox}>
                  <Checkbox
                    value={isChecked}
                    onValueChange={onCheckBoxChange}
                    tintColors={{ true: COLORS.blue, false: undefined }}
                  />
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Izjava")}
                  >
                    <Text style={styles.checkboxText}>
                      {t("consentButton.button")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {error.isChecked ? (
                <Text style={styles.errorText}>{error.isChecked}</Text>
              ) : null}
            </View>
            <View
              style={[
                styles.buttonContainer,
                { marginBottom: verticalScale(30) },
              ]}
            >
              <TouchableOpacity
                onPress={handleRegistracija}
                style={styles.registerButton}
              >
                <Text style={styles.registerText}>
                  {t("register-page.button.register")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  form: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(80),
  },
  inputContainer: {
    width: "100%",
    borderWidth: scale(1),
    height: verticalScale(45),
    justifyContent: "center",
    paddingHorizontal: scale(10),
    marginBottom: verticalScale(10),
    backgroundColor: COLORS.white,
  },
  input: {
    // height: verticalScale(50),
    height: "100%",
    color: COLORS.black,
    fontFamily: "Montserrat-Regular",
    fontSize: RFValue(13),
  },
  errorText: {
    width: "100%",
    color: COLORS.red,
    fontFamily: "Montserrat-SemiBold",
    marginBottom: verticalScale(10),
    fontSize: RFValue(12),
  },
  visibilityToggle: {
    position: "absolute",
    right: scale(10),
    top: verticalScale(13), // centrirano u odnosu na input
  },
  dropdownText: {
    fontFamily: "Montserrat-Regular",
    fontSize: RFValue(13),
  },
  phoneContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: verticalScale(10),
  },
  phoneInputContainer: {
    borderWidth: scale(1),
    height: verticalScale(45),
    justifyContent: "center",
    paddingHorizontal: scale(10),
    backgroundColor: COLORS.white,
  },
  checkboxContainer: {
    width: "90%",
    justifyContent: "center",
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(10),
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxText: {
    fontFamily: "Montserrat-Bold",
    marginLeft: scale(8),
    color: "#0000FF",
    textAlign: "justify",
    textDecorationLine: "underline",
    fontSize: RFValue(12),
  },
  buttonContainer: {
    width: "80%",
    marginVertical: verticalScale(10),
  },
  registerButton: {
    borderColor: COLORS.blue,
    borderWidth: scale(2),
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(13),
    borderRadius: 0, // pravougaono dugme
  },
  registerText: {
    fontSize: RFValue(15),
    fontFamily: "Montserrat-Bold",
    color: COLORS.white,
  },
  formGroup: {
    width: "80%",
  },
});
