import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import COLORS from '../constants/colors';
import httpCommon from '../http-common';
import Toast from 'react-native-toast-message';

const RequestPasswordResetPage = () => {
  const { t } = useTranslation();
  const { height: windowHeight } = useWindowDimensions();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');

  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf')
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  const requestPasswordReset = async () => {
    try {
      const response = await httpCommon.post(`/auth/password-reset/request?email=` + encodeURIComponent(email), {});
      // const result = response.data;
      // Alert.alert(t("alertResetPasswordSuccess"), result);
      // navigation.navigate('ResetPassword')
      Toast.show({
        type: 'success',
        text1: t("alertRequestResetPasswordSuccessHeader"),
        text2: t("alertRequestPasswordSuccess"),
        duration: 7000,
        onPress: () => Toast.hide(),
      });
      if (response) {
        navigation.navigate('ResetPassword');
      }
    } catch (error) {
      //Alert.alert(t("alertRequestResetPasswordError"));
      Toast.show({
        type: 'error',
        text1: t("alertRequestResetPasswordErrorHeader"),
        text2: t("alertRequestPasswordError"),
        duration: 7000,
        onPress: () => Toast.hide(),
      });
    }
  };

  return (
    <ScrollView style={{ backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <View>
          <Image
            source={require("../assets/opens2.png")}
            style={{
              height: windowHeight * 0.47,
              width: "100%",
              position: "absolute",
            }}
          />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center", top: windowHeight * 0.20, width: "100%", height: windowHeight }}>
          <View style={{ width: "80%", borderWidth: 1, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
            <TextInput style={{ height: 50, color: "black", fontFamily: "Montserrat-Regular" }}
              placeholder={t('forgot-password-page.input.emailField')}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={{ width: "80%", margin: 10 }}>
            <TouchableOpacity onPress={requestPasswordReset} style={{
              alignItems: 'center', borderColor: COLORS.blue, borderWidth: 2, alignItems: 'center',
              justifyContent: 'center', backgroundColor: COLORS.blue, padding: 13
            }}>
              <Text style={{ fontSize: 18, fontFamily: "Montserrat-Bold", color: COLORS.white }}>{t('forgot-password-page.button.request')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default RequestPasswordResetPage;