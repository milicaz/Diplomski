import { MaterialIcons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import { Buffer } from 'buffer'
import * as SecureStore from 'expo-secure-store'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../constants/colors'
import useHttpProtected from '../hooks/useHttpProtected'
import useLogout from '../hooks/useLogout'
import eventEmitter from '../utils/EventEmitter'

const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_KEY = 'user';

export default function Profile({ navigation }) {

  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [refreshToken, setRefreshToken] = useState('');

  const { t } = useTranslation();
  const { height: windowHeight } = useWindowDimensions();
  //const { logOutUser } = useContext(AuthContext);
  const httpProtected = useHttpProtected();
  const logOutUser = useLogout();

  // useFocusEffect hook from @react-navigation/native to refetch the data whenever the screen is focused
  useFocusEffect(
    useCallback(() => {
      const loggedIn = JSON.parse(SecureStore.getItem(USER_KEY));
      fetchUser(loggedIn.id);
      //fetchToken();
    }, []));

  const fetchUser = async (id) => {
    try {
      const requests = [
        httpProtected.get(`posetioci/${id}`),
        httpProtected.get(`posetioci/${id}/profilna`, { responseType: 'arraybuffer' })
      ];

      const [userData, imageData] = await Promise.all(requests);

      setUser(userData.data);

      const contentType = imageData.headers['content-type'] || 'image/jpeg';
      const base64Image = Buffer.from(imageData.data, 'binary').toString('base64');
      setProfileImage(`data:${contentType};base64,${base64Image}`);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 400) {
          eventEmitter.emit('LOGOUT');
          Toast.show({
            type: 'error',
            text1: t('http-common.error.session.header'),
            text2: t('http-common.error.session.text'),
            duration: 7000
          });
        } else {
          Toast.show({
            type: 'error',
            text1: t('http-common.error.server.header'),
            text2: t('http-common.error.server.text'),
            duration: 7000
          });
        }
      } else {
        Toast.show({
          type: 'error',
          text1: t('http-common.error.network.header'),
          text2: t('http-common.error.network.text'),
          duration: 7000
        });
      }
    }
  };

  // const fetchToken = async () => {
  //   try {
  //     const token = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  //     if (token) {
  //       setRefreshToken(token);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching refresh token:', error);
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer(windowHeight)}>
        <Image source={require("../assets/bg.png")} resizeMode="cover" style={styles.backgroundImage} />
        {/* <TouchableOpacity style={styles.logoutButton} onPress={() => logOutUser(refreshToken)}> */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => logOutUser()}>
          <Text style={styles.logoutButtonText}> Log out </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Text>Loading image...</Text>
        )}
        <Text style={styles.profileName}> {user && user.ime} {user && user.prezime} </Text>
        <Text style={styles.profileEmail}> {user && user.email} </Text>
      </View>
      <View style={styles.editButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileEdit")} style={styles.editButton}>
          <Text style={styles.editButtonText}> {t('profile-page.text.edit-profile')} </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoTitleContainer}>
          <Text style={styles.infoTitle}>{t('profile-page.text.info')}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialIcons name="location-on" size={16} color={COLORS.black} />
          <Text style={styles.infoText}>{user && user.mestoBoravista}</Text>
        </View>

        <View style={styles.infoItem}>
          <MaterialIcons name="smartphone" size={16} color={COLORS.black} />
          <Text style={styles.infoText}>{user && user.brojTelefona}</Text>
        </View>

        <View style={styles.infoItem}>
          <MaterialIcons name="date-range" size={16} color={COLORS.black} />
          <Text style={styles.infoText}>{user && user.godine}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: (windowHeight) => ({
    width: '100%',
    height: windowHeight * 0.3,
    position: 'relative',
  }),
  backgroundImage: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    width: 130,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.red,
    marginHorizontal: 20,
  },
  logoutButtonText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    color: COLORS.white,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    height: 155,
    width: 155,
    borderColor: COLORS.yellow,
    borderWidth: 2,
    marginTop: -90,
  },
  profileName: {
    fontSize: 25,
    fontFamily: 'Montserrat-Bold',
    color: COLORS.yellow,
  },
  profileEmail: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: COLORS.yellow,
  },
  editButtonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  editButton: {
    width: 130,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.blue,
    marginHorizontal: 20,
  },
  editButtonText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    color: COLORS.white,
  },
  infoContainer: {
    marginLeft: 20,
  },
  infoTitleContainer: {
    borderBottomColor: COLORS.black,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '90%',
  },
  infoTitle: {
    fontSize: 25,
    color: COLORS.yellow,
    fontFamily: 'Montserrat-Bold',
  },
  infoItem: {
    flexDirection: 'row',
    marginVertical: 6,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: COLORS.yellow,
    fontFamily: 'Montserrat-Medium',
    marginLeft: 4,
  }
});