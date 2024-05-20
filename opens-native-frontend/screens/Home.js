import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import COLORS from '../constants/colors';

export default function Home() {

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
  }, [])

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.white }}>
      <View style={{
        backgroundColor: COLORS.white,
        padding: 16,
        shadowColor: COLORS.black,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 14,
        width: 350,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8
      }}>
        <View style={{ marginBottom: 16, alignItems: 'center' }}>
          <Text style={{ fontSize: 22, fontFamily: 'Montserrat-SemiBold', color: COLORS.purple, marginTop: 10 }}>
            Lorem ipsum dolor sit amet
          </Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 17, fontFamily: 'Montserrat-Regular', color: '#444444', textAlign: 'justify' }}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
            Aenean commodo ligula eget dolor. Aenean massa.
            Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </Text>
        </View>

      </View>
      <View style={{
        backgroundColor: COLORS.white,
        padding: 16,
        shadowColor: COLORS.black,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 14,
        width: 350,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{ marginBottom: 16, alignItems: 'center' }}>
          <Text style={{ fontSize: 22, fontFamily: 'Montserrat-SemiBold', color: COLORS.purple, marginTop: 10 }}>
            Lorem ipsum dolor sit amet
          </Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 17, fontFamily: 'Montserrat-Regular', color: '#444444', textAlign: 'justify' }}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
            Aenean commodo ligula eget dolor. Aenean massa.
            Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </Text>
        </View>

      </View>
    </View>
  )
}