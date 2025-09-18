import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import englishFlag from "../assets/flags/english.png";
import serbianFlag from "../assets/flags/serbian.png";
import i18next from "../services/i18next";

export default function LanguageSwitcher() {
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
    position: 'absolute',
    top: verticalScale(30), // Podesiti visinu na kojoj želite da se nalazi
    left: scale(10), // Udaljenost od leve ivice ekrana
    flexDirection: 'row',
    backgroundColor: 'rgba(236, 234, 234, 0.5)',
    padding: scale(10),
    borderRadius: moderateScale(5),
  },
  flag: {
    width: scale(30),
    height: scale(20),
    marginLeft: scale(5),
    marginRight: scale(5),
  },
});