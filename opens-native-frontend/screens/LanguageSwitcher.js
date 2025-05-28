import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import englishFlag from "../assets/flags/english.png";
import serbianFlag from "../assets/flags/serbian.png";
import i18next from "../services/i18next";
import { scaleSize } from "../utils/responsive";

export default function LanguageSwitcher() {
  // Funkcija za promenu jezika
  const changeLng = (lng) => {
    i18next.changeLanguage(lng);
  };

  return (
    <View style={styles.languageSwitcherContainer}>
      <TouchableOpacity onPress={() => changeLng("sr")}>
        <Image source={serbianFlag} style={styles.flag} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeLng("en")}>
        <Image source={englishFlag} style={styles.flag} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  languageSwitcherContainer: {
    position: "absolute",
    top: scaleSize(10),
    left: scaleSize(20),
    flexDirection: "row",
    backgroundColor: "rgba(236, 234, 234, 0.5)",
    padding: scaleSize(10),
    borderRadius: scaleSize(5),
  },
  flag: {
    width: scaleSize(30),
    height: scaleSize(20),
    marginLeft: scaleSize(5),
    marginRight: scaleSize(5),
  },
});
