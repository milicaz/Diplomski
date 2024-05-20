import { MaterialIcons } from '@expo/vector-icons'
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../constants/colors'
import { useTranslation } from 'react-i18next'

export default function Profile({ navigation }) {

  const { t } = useTranslation();

  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf')
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, [])

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ width: "100%" }}>
        <Image source={require("../assets/bg.png")}
          resizeMode="cover"
          style={{
            height: 228,
            width: "100%"
          }} />
      </View>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Image
          source={require("../assets/profile.png")}
          resizeMode='contain'
          style={{
            height: 155,
            width: 155,
            borderColor: COLORS.yellow,
            borderWidth: 2,
            marginTop: -90
          }}
        />
        <Text style={{ fontSize: 25, fontFamily: 'Montserrat-Bold', color: COLORS.yellow, }}>
          Jovana Jovanović
        </Text>
        <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Medium', color: COLORS.yellow }}>
          jovana.jovanovic@mail.com
        </Text>
      </View>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ProfileEdit")}
          style={{
            width: 130,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.blue,
            marginHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Montserrat-Regular',
              color: COLORS.white,
            }}
          >
            {t('profile-page.text.edit-profile')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginLeft: 20 }}>
        <View style={{ borderBottomColor: COLORS.black, borderBottomWidth: StyleSheet.hairlineWidth, width: "90%" }}>
          <Text style={{ fontSize: 25, color: COLORS.yellow, fontFamily: 'Montserrat-Bold' }}>{t('profile-page.text.info')}</Text>
        </View>
        <View style={{ flexDirection: "row", marginVertical: 6, alignItems: 'center' }}>
          <MaterialIcons name="location-on" size={16} color="black" />
          <Text style={{ fontSize: 16, color: COLORS.yellow, fontFamily: 'Montserrat-Medium', marginLeft: 4 }}>Novi Sad</Text>
        </View>

        <View style={{ flexDirection: "row", marginVertical: 6, alignItems: 'center' }}>
          <MaterialIcons name="smartphone" size={16} color="black" />
          <Text style={{ fontSize: 16, color: COLORS.yellow, fontFamily: 'Montserrat-Medium', marginLeft: 4 }}>+381 61 2345678</Text>
        </View>

        <View style={{ flexDirection: "row", marginVertical: 6, alignItems: 'center' }}>
          <MaterialIcons name="date-range" size={16} color="black" />
          <Text style={{ fontSize: 16, color: COLORS.yellow, fontFamily: 'Montserrat-Medium', marginLeft: 4 }}>2011</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}