import { useTranslation } from "react-i18next";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { scale, verticalScale } from "react-native-size-matters";
import COLORS from "../constants/colors";

export default function Izjava() {
  const { t } = useTranslation();

  return (
    <ScrollView style={{ backgroundColor: COLORS.white }}>
      <Image
        source={require("../assets/images/opens2.png")}
        style={styles.topImage}
      />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{t("consent.title")}</Text>
        <Text style={styles.paragraph}>
          {t("consent.firstParagraph")}
          {t("consent.secondParagraph")}
          {t("consent.thirdParagraph")}
          {t("consent.fourthParagraph")}
          {t("consent.fifthParagraph")}
          {t("consent.sixthParagraph")}
          {t("consent.seventhParagraph")}
          {t("consent.eighthParagraph")}
          {t("consent.ninethParagraph")}
          {t("consent.tenthParagraph")}
        </Text>
        <Text style={styles.title}>{t("statementOfConsent.title")}</Text>
        <Text style={styles.paragraph}>
          {t("statementOfConsent.firstParagraph")}
          {t("statementOfConsent.secondParagraph")}
          {t("statementOfConsent.thirdParagraph")}
          {t("statementOfConsent.fourthParagraph")}
          {t("statementOfConsent.fifthParagraph")}
          {t("statementOfConsent.sixthParagraph")}
        </Text>
        <Image
          source={require("../assets/footer.png")}
          style={styles.bottomImage}
        />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    marginLeft: scale(5),
    marginRight: scale(5),
  },
  topImage: {
    width: "100%",
    height: verticalScale(200),
    marginBottom: scale(20),
  },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: RFValue(20),
    color: COLORS.black,
    //marginVertical: scale(10),
  },
  paragraph: {
    fontFamily: "Montserrat-Regular",
    fontSize: RFValue(16),
    color: COLORS.black,
    marginLeft: scale(10),
    marginRight: scale(10),
    textAlign: "justify",
    textAlignLast: "left",
  },
  bottomImage: {
    width: "100%",
    height: verticalScale(100),
    marginTop: scale(20),
    resizeMode: "contain",
  },
});