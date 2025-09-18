import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Markdown from "react-native-markdown-display";
import { RFValue } from "react-native-responsive-fontsize";
import { moderateScale, scale } from "react-native-size-matters";
import COLORS from "../constants/colors";
import useHttpProtected from "../hooks/useHttpProtected";
import eventEmitter from "../utils/EventEmitter";

export default function Home() {
  const { t } = useTranslation();
  const httpProtected = useHttpProtected();

  const [obavestenja, setObavesetenja] = useState([]);
  const [selectedObavestenje, setSelectedObavestenje] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchObavestenja();
    const intervalId = setInterval(fetchObavestenja, 3600000); // 1 sat
    return () => clearInterval(intervalId);
  }, []);

  const sortiranaObavestenja = useMemo(() => {
    return [...obavestenja].sort((a, b) => b.prioritet - a.prioritet); //sortira po prioritetu gde se veci prioritet pokazuje prvi
  }, [obavestenja]);

  const fetchObavestenja = async () => {
    await httpProtected.get("/obavestenja/validna").then(
      (response) => {
        setObavesetenja(response.data);
      },
      (error) => {
        if (error.response) {
          if (error.response.status === 401 || error.response.status === 400) {
            eventEmitter.emit("LOGOUT");
            Toast.show({
              type: "error",
              text1: t("http-common.error.session.header"),
              text2: t("http-common.error.session.text"),
              duration: 7000,
            });
          } else {
            Toast.show({
              type: "error",
              text1: t("http-common.error.server.header"),
              text2: t("http-common.error.server.text"),
              duration: 7000,
            });
          }
        } else {
          Toast.show({
            type: "error",
            text1: t("http-common.error.network.header"),
            text2: t("http-common.error.network.text"),
            duration: 7000,
          });
        }
      }
    );
  };

  const handleShowMore = useCallback((obavestenje) => {
    setSelectedObavestenje(obavestenje);
    setShowModal(true);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={sortiranaObavestenja}
        keyExtractor={(item) => item.id.toString()} // Koristi id umesto indeksa kao ključeve
        contentContainerStyle={styles.scrollViewContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.naziv}</Text>
            <Text style={styles.cardText}>
              {item.tekst.length > 250
                ? item.tekst.substring(0, 100) + "..."
                : item.tekst}
            </Text>
            <View style={styles.showMoreContainer}>
              <TouchableOpacity
                onPress={() => handleShowMore(item)}
                style={styles.showMoreButton}
              >
                <Text style={styles.showMoreButtonText}>
                  {t("home-page.text.show-more")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {selectedObavestenje ? (
              <>
                <Text style={styles.modalTitle}>
                  {selectedObavestenje.naziv}
                </Text>
                <Markdown style={styles.markdown}>
                  {selectedObavestenje.tekst}
                </Markdown>
              </>
            ) : (
              <ActivityIndicator size="large" color={COLORS.purple} />
            )}
            <View style={styles.modalCloseContainer}>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={styles.modalCloseButton}
              >
                <Text style={styles.modalCloseButtonText}>
                  {t("home-page.text.close")}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(20),
    backgroundColor: COLORS.white,
    position: "relative",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingTop: scale(20),
    paddingBottom: scale(70),
    justifyContent: "center",
  },
  card: {
    marginBottom: scale(10),
    padding: scale(15),
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(5),
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: scale(1),
    },
    shadowOpacity: 0.2,
    shadowRadius: scale(1.41),
    elevation: 2, // For Android shadow
  },
  cardTitle: {
    fontSize: RFValue(18),
    fontFamily: "Montserrat-SemiBold",
    marginBottom: scale(15),
    color: COLORS.purple,
  },
  cardText: {
    fontSize: RFValue(14),
    fontFamily: "Montserrat-Regular",
    color: COLORS.black,
    textAlign: "justify",
  },
  showMoreContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  showMoreButton: {
    width: scale(110),
    height: scale(35),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.blue,
    marginTop: scale(10),
  },
  showMoreButtonText: {
    fontSize: RFValue(14),
    fontFamily: "Montserrat-SemiBold",
    color: COLORS.white,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: scale(20),
  },
  modalTitle: {
    fontSize: RFValue(20),
    fontFamily: "Montserrat-SemiBold",
    marginBottom: scale(15),
    color: COLORS.purple,
  },
  markdown: {
    text: {
      fontSize: RFValue(14),
      color: COLORS.black,
      fontFamily: "Montserrat-Regular",
      textAlign: "justify",
    },
    heading1: {
      fontSize: RFValue(24),
      fontFamily: "Montserrat-Bold",
      marginBottom: scale(10),
    },
    heading2: {
      fontSize: RFValue(20),
      fontFamily: "Montserrat-Bold",
      marginBottom: scale(8),
    },
    paragraph: {
      marginBottom: scale(10),
      textAlign: "justify",
    },
    strong: {
      fontFamily: "Montserrat-Bold",
    },
    em: {
      fontFamily: "Montserrat-Italic",
    },
    list_item: {
      marginBottom: scale(5),
    },
  },
  modalCloseContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalCloseButton: {
    width: scale(90),
    height: scale(35),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.blue,
    marginTop: scale(20),
  },
  modalCloseButtonText: {
    fontSize: RFValue(14),
    fontFamily: "Montserrat-SemiBold",
    color: COLORS.white,
  },
});