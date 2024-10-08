import { MaterialIcons } from '@expo/vector-icons';
import { Buffer } from 'buffer';
import * as FileSystem from 'expo-file-system';
import { useFonts } from "expo-font";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import httpCommon from '../http-common';
import eventEmitter from '../utils/EventEmitter';

const USER_KEY = 'user';

export default function ProfileEdit({ navigation }) {
  const { t } = useTranslation();

  const [user, setUser] = useState(null);
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [email, setEmail] = useState("");
  const [godine, setGodine] = useState(0);
  const [mestoBoravista, setMestoBoravista] = useState("");
  const [brojTelefona, setBrojTelefona] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const [fontsLoaded] = useFonts({
    'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
    const loggedIn = JSON.parse(SecureStore.getItem(USER_KEY));
    fetchUser(loggedIn.id);
  }, []);

  const fetchUser = async (id) => {
    await httpCommon.get(`posetioci/${id}`).then((response) => {
      setUser(response.data);
      setIme(response.data.ime);
      setPrezime(response.data.prezime);
      setEmail(response.data.email);
      setGodine(response.data.godine);
      setMestoBoravista(response.data.mestoBoravista);
      setBrojTelefona(response.data.brojTelefona);
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
      setProfileImage(`data:${contentType};base64, ${base64Image}`);
    }, (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 400)) {
        eventEmitter.emit('LOGOUT');
      }
    });
  }

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        const base64Image = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: FileSystem.EncodingType.Base64 });
        const mimeType = result.assets[0].mimeType;
        setProfileImage(`data:${mimeType};base64, ${base64Image}`);
      }
    }
  };

  const editProfile = async () => {
    try {
      const profileImageData = profileImage.substring("data:image/png;base64, ".length);
      const updatedProfile = { ime, prezime, email, godine: parseInt(godine), mestoBoravista, brojTelefona, profileImage: profileImageData };
      await httpCommon.put(`posetioci/${user.id}`, updatedProfile).then((response) => {
        console.log("Uspesno editovano");
      }, (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 400)) {
          eventEmitter.emit('LOGOUT');
        }
      });
      navigation.navigate("Profile");
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 22 }}>
      <View style={{ flexDirection: "row", marginHorizontal: 12, justifyContent: 'center', top: 15 }}>
        <Text style={{ fontSize: 18, fontFamily: 'Montserrat-Medium', color: COLORS.yellow }}>{t('profile-edit-page.text.edit-profile')}</Text>
      </View>
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            marginVertical: 42,
          }}
        >
          <TouchableOpacity onPress={handleImageSelection}>
            <Image
              source={{ uri: profileImage }}
              style={{
                height: 100,
                width: 100,
                borderWidth: 2,
                borderColor: COLORS.yellow,
              }}
            />

            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 5,
                zIndex: 9999,
              }}
            >
              <MaterialIcons
                name="photo-camera"
                size={32}
                color={COLORS.yellow}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "column",
            marginBottom: 6,
          }}
        >
          <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Medium' }}>{t('profile-edit-page.text.name')}</Text>
          <View
            style={{
              height: 44,
              width: "100%",
              borderColor: COLORS.black,
              borderWidth: 1,
              marginVertical: 6,
              justifyContent: "center",
              paddingLeft: 8,
            }}
          >
            <TextInput
              style={{ fontFamily: 'Montserrat-Regular' }}
              value={ime}
              onChangeText={(value) => setIme(value)}
              editable={true}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "column",
            marginBottom: 6,
          }}
        >
          <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Medium' }}>{t('profile-edit-page.text.surname')}</Text>
          <View
            style={{
              height: 44,
              width: "100%",
              borderColor: COLORS.black,
              borderWidth: 1,
              marginVertical: 6,
              justifyContent: "center",
              paddingLeft: 8,
            }}
          >
            <TextInput
              style={{ fontFamily: 'Montserrat-Regular' }}
              value={prezime}
              onChangeText={(value) => setPrezime(value)}
              editable={true}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "column",
            marginBottom: 6,
          }}
        >
          <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Medium' }}>{t('profile-edit-page.text.email')}</Text>
          <View
            style={{
              height: 44,
              width: "100%",
              borderColor: COLORS.black,
              borderWidth: 1,
              marginVertical: 6,
              justifyContent: "center",
              paddingLeft: 8,
            }}
          >
            <TextInput keyboardType='email-address'
              style={{ fontFamily: 'Montserrat-Regular' }}
              value={email}
              onChangeText={(value) => setEmail(value)}
              editable={false}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "column",
            marginBottom: 6,
          }}
        >
          <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Medium' }}>{t('profile-edit-page.text.placeOfResidence')}</Text>
          <View
            style={{
              height: 44,
              width: "100%",
              borderColor: COLORS.black,
              borderWidth: 1,
              marginVertical: 6,
              justifyContent: "center",
              paddingLeft: 8,
            }}
          >
            <TextInput
              style={{ fontFamily: 'Montserrat-Regular' }}
              value={mestoBoravista}
              onChangeText={(value) => setMestoBoravista(value)}
              editable={true}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "column",
            marginBottom: 6,
          }}
        >
          <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Medium' }}>{t('profile-edit-page.text.phone')}</Text>
          <View
            style={{
              height: 44,
              width: "100%",
              borderColor: COLORS.black,
              borderWidth: 1,
              marginVertical: 6,
              justifyContent: "center",
              paddingLeft: 8,
            }}
          >
            <TextInput keyboardType='numeric'
              style={{ fontFamily: 'Montserrat-Regular' }}
              value={brojTelefona}
              onChangeText={(value) => setBrojTelefona(value)}
              editable={true}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "column",
            marginBottom: 6,
          }}
        >
          <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Medium' }}>{t('profile-edit-page.text.yearOfBirth')}</Text>
          <View
            style={{
              height: 44,
              width: "100%",
              borderColor: COLORS.black,
              borderWidth: 1,
              marginVertical: 6,
              justifyContent: "center",
              paddingLeft: 8,
            }}
          >
            <TextInput keyboardType='numeric'
              style={{ fontFamily: 'Montserrat-Regular' }}
              value={godine.toString()}
              onChangeText={(value) => setGodine(value)}
              editable={true}
            />
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: COLORS.blue,
            height: 44,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={editProfile}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Montserrat-Bold',
              color: COLORS.white,
            }}
          >
            {t('profile-edit-page.text.save')}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView >
  )
}