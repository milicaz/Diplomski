import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';

export default function ProfileEdit({ navigation }) {
  const { t } = useTranslation();

  const [name, setName] = useState("Jovana");
  const [surname, setSurname] = useState("Jovanović");
  const [email, setEmail] = useState("jovana.jovanovic@mail.com");
  const [city, setCity] = useState("Novi Sad");
  const [phone, setPhone] = useState("+381 61 2345678");
  const [yearBirth, setYearBirth] = useState("2011");

  const [fontsLoaded] = useFonts({
    'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
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
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 22 }}>
      <View style={{ flexDirection: "row", marginHorizontal: 12, justifyContent: 'center', top: 15  }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 0,
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity>

        <Text style={{ fontSize: 18, fontFamily: 'Montserrat-Medium', color: COLORS.yellow  }}>{t('profile-edit-page.text.edit-profile')}</Text>
      </View>
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            marginVertical: 42,
          }}
        >
          <TouchableOpacity>
            <Image
              source={require("../assets/profile.png")}
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
                color={COLORS.primary}
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
              value={name}
              onChangeText={(value) => setName(value)}
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
              value={surname}
              onChangeText={(value) => setSurname(value)}
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
              value={city}
              onChangeText={(value) => setCity(value)}
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
              value={phone}
              onChangeText={(value) => setPhone(value)}
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
              value={yearBirth}
              onChangeText={(value) => setYearBirth(value)}
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
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Montserrat-Regular',
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