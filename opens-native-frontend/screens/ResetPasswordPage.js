import { useNavigation, useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../constants/colors';
import httpCommon from '../http-common';
import Toast from 'react-native-toast-message';

const ResetPasswordPage = () => {
  const { t } = useTranslation();
  const { height: windowHeight } = useWindowDimensions();
  const navigation = useNavigation();

  const route = useRoute();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [token, setToken] = useState('')

  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf')
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  useEffect(() => {

  }, [token]);

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

  // const resetPassword = async () => {
  //   if (password !== confirmPassword) {
  //     Alert.alert(t("alertResetPassword"));
  //     return;
  //   }

  //   try {
  //     // const response = await fetch('http://10.0.2.2:8080/api/auth/password-reset/reset?token=' + encodeURIComponent(token) + '&newPassword=' + encodeURIComponent(password), {
  //     //   method: 'PUT'
  //     // });
  //     // const result = await response.text();
  //     const response = await httpCommon.put(`/auth/password-reset/reset?token=${encodeURIComponent(token)}&newPassword=${encodeURIComponent(password)}`, {});
  //     const result = await response.data;
  //     Alert.alert(t("alertResetPasswordSuccess"), result);
  //     navigation.navigate('Welcome');
  //   } catch (error) {
  //     Alert.alert(t("alertResetPasswordError"));
  //   }
  // };

  const resetPassword = async () => {
    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: t("alertRequestResetPasswordErrorHeader"),
        text2: t("alertResetPassword"),
        duration: 7000, 
        onPress: () => Toast.hide(), 
      });
      return;
    }
  
    try {
      const response = await httpCommon.put(`/auth/password-reset/reset?token=${encodeURIComponent(token)}&newPassword=${encodeURIComponent(password)}`);
      Toast.show({
        type: 'success',
        text1: t("alertRequestResetPasswordSuccessHeader"),
        text2: t("alertResetPasswordSuccess"),
        duration: 7000, 
        onPress: () => Toast.hide(), 
      });
      if (response) {
        navigation.navigate('Welcome');
      } 
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t("alertRequestResetPasswordErrorHeader"),
        text2: t("alertResetPasswordError"),
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
            <TextInput
              style={{ height: 50, color: "black", fontFamily: "Montserrat-Regular" }}
              placeholder={t('reset-password-page.input.token')}
              value={token}
              onChangeText={setToken}
            />
          </View>
          <View style={{ width: "80%", borderWidth: 1, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
            <TextInput
              style={{ height: 50, color: "black", fontFamily: "Montserrat-Regular" }}
              placeholder={t('reset-password-page.input.newPassword')}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={toggleShowPassword} style={{ position: 'absolute', right: 10 }}>
              <Icon name={showPassword ? 'visibility-off' : 'visibility'} size={24} color="gray" />
            </TouchableOpacity>
          </View>
          <View style={{ width: "80%", borderWidth: 1, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
            <TextInput
              style={{ height: 50, color: "black", fontFamily: "Montserrat-Regular" }}
              placeholder={t('reset-password-page.input.confirmPassword')}
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={toggleShowConfirmPassword} style={{ position: 'absolute', right: 10 }}>
              <Icon name={showConfirmPassword ? 'visibility-off' : 'visibility'} size={24} color="gray" />
            </TouchableOpacity>
          </View>
          <View style={{ width: "80%", margin: 10 }}>
            <TouchableOpacity onPress={resetPassword} style={{
              alignItems: 'center', borderColor: COLORS.blue, borderWidth: 2, alignItems: 'center',
              justifyContent: 'center', backgroundColor: COLORS.blue, padding: 13
            }}>
              <Text style={{ fontSize: 18, fontFamily: "Montserrat-Bold", color: COLORS.white }}>{t('reset-password-page.button.reset')}</Text>
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

export default ResetPasswordPage;