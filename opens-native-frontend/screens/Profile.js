import { MaterialIcons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import { Buffer } from 'buffer'
import { useFonts } from "expo-font"
import * as SecureStore from 'expo-secure-store'
import * as SplashScreen from "expo-splash-screen"
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../constants/colors'
import { AuthContext } from '../contexts/AuthContext'
import httpCommon from '../http-common'
import eventEmitter from '../utils/EventEmitter'

const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_KEY = 'user';

export default function Profile({ navigation }) {

  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [refreshToken, setRefreshToken] = useState('');

  const { t } = useTranslation();
  const { height: windowHeight } = useWindowDimensions();
  const { logOutUser } = useContext(AuthContext);

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
    const loggedIn = JSON.parse(SecureStore.getItem(USER_KEY));
    fetchUser(loggedIn.id);
  }, []);

  // useFocusEffect hook from @react-navigation/native to refetch the data whenever the screen is focused
  useFocusEffect(
    useCallback(() => {
      const loggedIn = JSON.parse(SecureStore.getItem(USER_KEY));
      fetchUser(loggedIn.id);
      fetchToken();
    }, []));

  const fetchUser = async (id) => {
    await httpCommon.get(`posetioci/${id}`).then((response) => {
      setUser(response.data);
    }, (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 400)) {
        eventEmitter.emit('LOGOUT');
      }
    });

    await httpCommon.get(`posetioci/${id}/profilna`, {
      responseType: 'arraybuffer'
    }).then((response) => {
      const contentType = response.headers['content-type'] || 'image/jpeg';
      const base64Image = Buffer.from(response.data, 'binary').toString('base64');
      setProfileImage(`data:${contentType};base64,${base64Image}`);
    }, (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 400)) {
        eventEmitter.emit('LOGOUT');
      }
    });
  }

  const fetchToken = async () => {
    try {
      const token = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
      if (token) {
        setRefreshToken(token);
      }
    } catch (error) {
      console.error('Error fetching refresh token:', error);
    }
  };

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ width: "100%", height: windowHeight * 0.3, position: 'relative' }}>
        <Image source={require("../assets/bg.png")}
          resizeMode="cover"
          style={{
            height: "100%",
            width: "100%",
            position: 'absolute',
            top: 0,
            left: 0
          }} />
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 20,
            right: 10,
            width: 130,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.red,
            marginHorizontal: 20,
          }}
          onPress={() => logOutUser(refreshToken)}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Montserrat-Bold',
              color: COLORS.white,
            }}
          >
            Log out
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            style={{
              height: 155,
              width: 155,
              borderColor: COLORS.yellow,
              borderWidth: 2,
              marginTop: -90
            }}
          />
        ) : (
          <Text>Loading image...</Text>
        )}
        <Text style={{ fontSize: 25, fontFamily: 'Montserrat-Bold', color: COLORS.yellow, }}>
          {user && user.ime} {user && user.prezime}
        </Text>
        <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Medium', color: COLORS.yellow }}>
          {user && user.email}
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
              fontFamily: 'Montserrat-Bold',
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
          <Text style={{ fontSize: 16, color: COLORS.yellow, fontFamily: 'Montserrat-Medium', marginLeft: 4 }}>{user && user.mestoBoravista}</Text>
        </View>

        <View style={{ flexDirection: "row", marginVertical: 6, alignItems: 'center' }}>
          <MaterialIcons name="smartphone" size={16} color="black" />
          <Text style={{ fontSize: 16, color: COLORS.yellow, fontFamily: 'Montserrat-Medium', marginLeft: 4 }}>{user && user.brojTelefona}</Text>
        </View>

        <View style={{ flexDirection: "row", marginVertical: 6, alignItems: 'center' }}>
          <MaterialIcons name="date-range" size={16} color="black" />
          <Text style={{ fontSize: 16, color: COLORS.yellow, fontFamily: 'Montserrat-Medium', marginLeft: 4 }}>{user && user.godine}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}