import { MaterialIcons } from '@expo/vector-icons';
import { Buffer } from 'buffer';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import httpCommon from '../http-common';
import eventEmitter from '../utils/EventEmitter';
import { globalStyles } from '../utils/styles';

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

  const [error, setError] = useState({
    ime: '',
    prezime: '',
    godine: '',
    mestoBoravista: '',
    brojTelefona: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const loggedIn = JSON.parse(SecureStore.getItem(USER_KEY));
      if (loggedIn && loggedIn.id) {
        try {
          // Fetch user data
          const response = await httpCommon.get(`posetioci/${loggedIn.id}`);
          setUser(response.data);
          setIme(response.data.ime);
          setPrezime(response.data.prezime);
          setEmail(response.data.email);
          setGodine(response.data.godine);
          setMestoBoravista(response.data.mestoBoravista);
          setBrojTelefona(response.data.brojTelefona);

          // Fetch profile image
          const imageResponse = await httpCommon.get(`posetioci/${loggedIn.id}/profilna`, {
            responseType: 'arraybuffer',
          });
          const contentType = imageResponse.headers['content-type'] || 'image/jpeg';
          const base64Image = Buffer.from(imageResponse.data, 'binary').toString('base64');
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
      }
    };
    fetchUserData();
  }, []);

  const onChangeIme = (value) => {
    setIme(value);
    if (error.ime) {
      setError({ ...error, ime: '' });
    }
  };

  const onChangePrezime = (value) => {
    setPrezime(value);
    if (error.prezime) {
      setError({ ...error, prezime: '' });
    }
  };

  const onChangeMestoBoravista = (value) => {
    setMestoBoravista(value);
    if (error.mestoBoravista) {
      setError({ ...error, mestoBoravista: '' });
    }
  };

  const onChangeBrojTelefona = (value) => {
    setBrojTelefona(value);
    if (error.brojTelefona) {
      setError({ ...error, brojTelefona: '' });
    }
  };

  const onChangeGodine = (value) => {
    setGodine(value);
    if (error.godine) {
      setError({ ...error, godine: '' });
    }
  };

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
        console.log("tip slike: ");
        console.log(mimeType);
        //setProfileImage(`data:${mimeType}; base64, ${base64Image} `);
        setProfileImage(`data:${mimeType};base64,${base64Image}`);
        //setProfileImage(result.assets[0].uri);
      }
    }
  };

  const editProfile = async () => {
    let valid = true;
    const newError = { ime: '', prezime: '', godine: '', mestoBoravista: '', brojTelefona: '' };

    if (!ime) {
      newError.ime = t('register-page.error.nameRequired');
      valid = false;
    }

    if (!prezime) {
      newError.prezime = t('register-page.error.surnameRequired');
      valid = false;
    }

    if (!godine) {
      newError.godine = t('register-page.error.yearOfBirthRequired');
      valid = false;
    } else {
      const isValidYear = /^[1-9][0-9]{3}$/.test(godine); // 4-digit year
      if (!isValidYear) {
        newError.godine = t('register-page.error.invalidYear'); // Invalid year error
        valid = false;
      }
    }

    if (!mestoBoravista) {
      newError.mestoBoravista = t('register-page.error.placeOfResidenceRequired');
      valid = false;
    }

    if (!brojTelefona) {
      newError.brojTelefona = t('register-page.error.phoneRequired');
      valid = false;
    } else {
      const phoneRegex = /^\+?[0-9]{2,3}[0-9]{8,9}$/; // Adjust regex as needed
      if (!phoneRegex.test(brojTelefona)) {
        newError.brojTelefona = t('register-page.error.invalidPhone');
        valid = false;
      }
    }
    setError(newError);

    if (valid) {
      try {
        const profileImageData = profileImage.replace(/^data:image\/[a-z]+;base64,/, '');
        const updatedProfile = { ime, prezime, email, godine: parseInt(godine), mestoBoravista, brojTelefona, profileImage: profileImageData };
        await httpCommon.put(`posetioci/${user.id}`, updatedProfile);
        navigation.navigate("Profile");
      } catch (error) {
        console.error("Profile Edit error: ", error);
        if (error.response && (error.response.status === 401 || error.response.status === 400)) {
          eventEmitter.emit('LOGOUT');
        }
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{t('profile-edit-page.text.edit-profile')}</Text>
      </View>
      <ScrollView>
        <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={handleImageSelection}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
            <View style={styles.cameraIcon}>
              <MaterialIcons name="photo-camera" size={32} color={COLORS.yellow} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.labelText}>{t('profile-edit-page.text.name')}</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} value={ime} onChangeText={onChangeIme} editable={true} />
          </View>
        </View>
        {error.ime ? <Text style={globalStyles.errorText}>{error.ime}</Text> : null}

        <View style={styles.inputGroup}>
          <Text style={styles.labelText}>{t('profile-edit-page.text.surname')}</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} value={prezime} onChangeText={onChangePrezime} editable={true} />
          </View>
        </View>
        {error.prezime ? <Text style={globalStyles.errorText}>{error.prezime}</Text> : null}

        <View style={styles.inputGroup}>
          <Text style={styles.labelText}>{t('profile-edit-page.text.email')}</Text>
          <View style={styles.inputContainer}>
            <TextInput keyboardType='email-address' style={styles.input} value={email} onChangeText={(value) => setEmail(value)} editable={false} />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.labelText}>{t('profile-edit-page.text.placeOfResidence')}</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} value={mestoBoravista} onChangeText={onChangeMestoBoravista} editable={true} />
          </View>
        </View>
        {error.mestoBoravista ? <Text style={globalStyles.errorText}>{error.mestoBoravista}</Text> : null}

        <View style={styles.inputGroup}>
          <Text style={styles.labelText}>{t('profile-edit-page.text.phone')}</Text>
          <View style={styles.inputContainer}>
            <TextInput keyboardType='numeric' style={styles.input} value={brojTelefona} onChangeText={onChangeBrojTelefona} editable={true} />
          </View>
        </View>
        {error.brojTelefona ? <Text style={globalStyles.errorText}>{error.brojTelefona}</Text> : null}

        <View style={styles.inputGroup}>
          <Text style={styles.labelText}>{t('profile-edit-page.text.yearOfBirth')}</Text>
          <View style={styles.inputContainer}>
            <TextInput keyboardType='numeric' style={styles.input} value={godine.toString()} onChangeText={onChangeGodine} editable={true} />
          </View>
        </View>
        {error.godine ? <Text style={globalStyles.errorText}>{error.godine}</Text> : null}

        <TouchableOpacity style={styles.saveButton} onPress={editProfile}>
          <Text style={styles.saveButtonText}> {t('profile-edit-page.text.save')} </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 22
  },
  headerContainer: {
    flexDirection: 'row',
    marginHorizontal: 12,
    justifyContent: 'center',
    top: 15,
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    color: COLORS.yellow,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 42,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderWidth: 2,
    borderColor: COLORS.yellow,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 5,
    zIndex: 9999,
  },
  inputGroup: {
    flexDirection: 'column',
    marginBottom: 6,
  },
  labelText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
  inputContainer: {
    height: 44,
    width: '100%',
    borderColor: COLORS.black,
    borderWidth: 1,
    marginVertical: 6,
    justifyContent: 'center',
    paddingLeft: 8,
  },
  input: {
    fontFamily: 'Montserrat-Regular',
  },
  saveButton: {
    backgroundColor: COLORS.blue,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: COLORS.white,
  }
});