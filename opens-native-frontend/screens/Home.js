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
import COLORS from "../constants/colors";
import useHttpProtected from "../hooks/useHttpProtected";
import eventEmitter from "../utils/EventEmitter";
import { getFontSize, scaleSize } from "../utils/responsive";

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
    padding: scaleSize(20),
    backgroundColor: COLORS.white,
    position: "relative",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingTop: scaleSize(20),
    paddingBottom: scaleSize(70),
    justifyContent: "center",
  },
  card: {
    marginBottom: scaleSize(10),
    padding: scaleSize(15),
    backgroundColor: COLORS.white,
    borderRadius: scaleSize(5),
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: scaleSize(1),
    },
    shadowOpacity: 0.2,
    shadowRadius: scaleSize(1.41),
    elevation: 2, // For Android shadow
  },
  cardTitle: {
    fontSize: getFontSize(16),
    fontFamily: "Montserrat-SemiBold",
    marginBottom: scaleSize(15),
    color: COLORS.purple,
  },
  cardText: {
    fontSize: getFontSize(12),
    fontFamily: "Montserrat-Regular",
    color: COLORS.black,
    textAlign: "justify",
  },
  showMoreContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  showMoreButton: {
    width: scaleSize(110),
    height: scaleSize(35),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.blue,
    marginTop: scaleSize(10),
  },
  showMoreButtonText: {
    fontSize: getFontSize(12),
    fontFamily: "Montserrat-SemiBold",
    color: COLORS.white,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: scaleSize(20),
  },
  modalTitle: {
    fontSize: getFontSize(16),
    fontFamily: "Montserrat-SemiBold",
    marginBottom: scaleSize(15),
    color: COLORS.purple,
  },
  markdown: {
    text: {
      fontSize: getFontSize(12),
      color: COLORS.black,
      fontFamily: "Montserrat-Regular",
      textAlign: "justify",
    },
    heading1: {
      fontSize: getFontSize(24),
      fontFamily: "Montserrat-Bold",
      marginBottom: scaleSize(10),
    },
    heading2: {
      fontSize: getFontSize(20),
      fontFamily: "Montserrat-Bold",
      marginBottom: scaleSize(8),
    },
    paragraph: {
      marginBottom: scaleSize(10),
      textAlign: "justify",
    },
    strong: {
      fontFamily: "Montserrat-Bold",
    },
    em: {
      fontFamily: "Montserrat-Italic",
    },
    list_item: {
      marginBottom: scaleSize(5),
    },
  },
  modalCloseContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalCloseButton: {
    width: scaleSize(90),
    height: scaleSize(35),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.blue,
    marginTop: scaleSize(20),
  },
  modalCloseButtonText: {
    fontSize: getFontSize(12),
    fontFamily: "Montserrat-SemiBold",
    color: COLORS.white,
  },
});