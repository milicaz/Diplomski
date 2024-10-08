import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import COLORS from '../constants/colors';
import httpCommon from "../http-common";
import eventEmitter from "../utils/EventEmitter";

export default function Home() {
  const [obavestenja, setObavesetenja] = useState([]);
  const [pinovanaObavestenja, setPinovanaObavestenja] = useState([]);
  const [selectedObavestenje, setSelectedObavestenje] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { t } = useTranslation();

  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Thin': require('../assets/fonts/Montserrat-Thin.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
    fetchObavestenja();
  }, []);

  useEffect(() => {
    const sortirana = [...obavestenja].sort((a, b) => b.prioritet - a.prioritet); //sortira po prioritetu gde se veci prioritet pokazuje prvi
    setPinovanaObavestenja(sortirana)
  }, [obavestenja])

  const fetchObavestenja = async () => {
    await httpCommon.get("/obavestenja/validna").then((response) => {
      setObavesetenja(response.data);
    }, (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 400)) {
        eventEmitter.emit('LOGOUT');
      }
    });

  }

  const handleShowMore = (obavestenje) => {
    setSelectedObavestenje(obavestenje);
    setShowModal(true);
  }

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 20, paddingBottom: 70 }}>
        {pinovanaObavestenja.map((obavestenje, index) => (
          <View key={index} style={styles.card}>
            <Text style={{ fontSize: 20, fontFamily: 'Montserrat-SemiBold', marginBottom: 15, color: COLORS.purple }}>{obavestenje.naziv}</Text>
            <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Regular', color: COLORS.black, textAlign: 'justify' }}>
              {obavestenje.tekst.length > 250 ? obavestenje.tekst.substring(0, 100) + '...' : obavestenje.tekst}
            </Text>
            <View style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
              <TouchableOpacity onPress={() => handleShowMore(obavestenje)} style={{ width: 110, height: 35, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.blue, marginTop: 10 }}>
                <Text style={{ fontSize: 14, fontFamily: 'Montserrat-SemiBold', color: COLORS.white }}>{t('home-page.text.show-more')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {selectedObavestenje && (
              <>
                <Text style={styles.modalTitle}>{selectedObavestenje.naziv}</Text>
                <Markdown style={styles.markdown}>{selectedObavestenje.tekst}</Markdown>
              </>
            )}
            <View style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
              <TouchableOpacity onPress={() => setShowModal(false)} style={{ width: 90, height: 35, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.blue, marginTop: 20 }}>
                <Text style={{ fontSize: 14, fontFamily: 'Montserrat-SemiBold', color: COLORS.white }}>{t('home-page.text.close')}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white
  },
  card: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2, // For Android shadow
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 20
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 15,
    color: COLORS.purple
  },
  markdown: {
    text: {
      fontSize: 16,
      color: COLORS.black,
      fontFamily: 'Montserrat-Regular',
      textAlign: 'justify'
    },
    heading1: {
      fontSize: 24,
      fontFamily: 'Montserrat-Bold',
      marginBottom: 10,
    },
    heading2: {
      fontSize: 20,
      fontFamily: 'Montserrat-Bold',
      marginBottom: 8,
    },
    paragraph: {
      marginBottom: 10,
      textAlign: 'justify'
    },
    strong: {
      fontFamily: 'Montserrat-Bold',
    },
    em: {
      fontFamily: 'Montserrat-Italic',
    },
    list_item: {
      marginBottom: 5,
    },
  },
});