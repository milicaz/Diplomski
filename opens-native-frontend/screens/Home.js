import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from 'react';
import { Modal, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../constants/colors';
import httpCommon from "../http-common";
import { useTranslation } from "react-i18next";

export default function Home() {

  const [obavestenja, setObavesetenja] = useState([]);
  const [pinovanaObavestenja, setPinovanaObavestenja] = useState([]);
  const now = new Date();
  const datumObavestenja = now.toISOString().split("T")[0]; // Formats the date as "YYYY-MM-DD"

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
    const { data } = await httpCommon.get("/obavestenja/validna", {
      params: { currentDate: datumObavestenja }
    });
    setObavesetenja(data);
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
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1,paddingTop: 20, paddingBottom: 70 }}>
          <View style={{ alignItems: "center", paddingVertical: 40, backgroundColor: COLORS.white }}>
            {pinovanaObavestenja.map((o) => (
              <View key={o.id} style={{ width: '90%', backgroundColor: COLORS.white, marginBottom: 10, padding: 16, shadowColor: COLORS.black, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 14, width: 350, }}>
                <Text style={{ fontSize: 20, fontFamily: 'Montserrat-SemiBold', marginBottom: 15, color: COLORS.purple }}>{o.naziv}</Text>
                <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Regular', color: COLORS.black, textAlign: 'justify' }}>
                  {o.tekst.length > 250 ? o.tekst.substring(0, 250) + '...' : o.tekst}
                </Text>
                {o.tekst.length > 250 && (
                  <View style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={() => handleShowMore(o)} style={{ width: 110, height: 35, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.blue, marginTop: 10 }}>
                      <Text style={{ fontSize: 14, fontFamily: 'Montserrat-SemiBold', color: COLORS.white }}>{t('home-page.text.show-more')}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      {/* Popup Modal */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: '#FFF', padding: 20, width: '80%', maxHeight: '80%' }}>
            <Text style={{ fontSize: 20, fontFamily: 'Montserrat-SemiBold', marginBottom: 15, color: COLORS.purple }}>{selectedObavestenje?.naziv}</Text>

            <ScrollView>
              <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Regular', color: COLORS.black, textAlign: 'justify' }}>{selectedObavestenje?.tekst}</Text>
            </ScrollView>

            <View style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
              <TouchableOpacity onPress={() => setShowModal(false)} style={{ width: 90, height: 35, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.blue, marginTop: 20 }}>
                <Text style={{ fontSize: 14, fontFamily: 'Montserrat-SemiBold', color: COLORS.white }}>{t('home-page.text.close')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>

  )
}