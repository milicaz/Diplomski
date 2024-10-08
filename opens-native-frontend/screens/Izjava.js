import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useTranslation } from "react-i18next";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";

export default function Izjava() {

  const { t } = useTranslation();

  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Image source={require('../assets/header.png')} style={styles.topImage} />
        <Text style={{ fontFamily: "Montserrat-Regular", fontSize: 25, color: '#000', fontWeight: 'bold' }}>{t("consent.title")}</Text>
        <Text style={{ fontFamily: "Montserrat-Regular", fontSize: 20, color: '#000' }}>{t("consent.firstParagraph")}
          {t("consent.secondParagraph")}{t("consent.thirdParagraph")}{t("consent.fourthParagraph")}{t("consent.fifthParagraph")}{t("consent.sixthParagraph")}
          {t("consent.seventhParagraph")}{t("consent.eighthParagraph")}{t("consent.ninethParagraph")}{t("consent.tenthParagraph")}</Text>
        <Text style={{ fontFamily: "Montserrat-Regular", fontSize: 25, color: '#000', fontWeight: 'bold' }}>{t("statementOfConsent.title")}</Text>
        <Text style={{ fontFamily: "Montserrat-Regular", fontSize: 20, color: '#000' }}>{t("statementOfConsent.firstParagraph")}{t("statementOfConsent.secondParagraph")}
          {t("statementOfConsent.thirdParagraph")}{t("statementOfConsent.fourthParagraph")}{t("statementOfConsent.fifthParagraph")}{t("statementOfConsent.sixthParagraph")}
        </Text>
        <Image source={require('../assets/footer.png')} style={styles.bottomImage} />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginLeft: 5,
    marginRight: 5
  },
  text: {
    fontSize: 20,
    color: '#000'
  },
  topImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain'
  },
  bottomImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain'
  }
});