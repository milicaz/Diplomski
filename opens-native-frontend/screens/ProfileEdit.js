import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';

export default function ProfileEdit({ navigation }) {

  const [name, setName] = useState("Jovana Jovanović");
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
      <View style={{ flexDirection: "row", marginHorizontal: 12, justifyContent: 'center' }}>
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

        <Text style={{ fontSize: 18, fontFamily: 'Montserrat-Medium' }}>Izmena profila</Text>
      </View>
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            marginVertical: 22,
          }}
        >
          <TouchableOpacity>
            <Image
              source={require("../assets/profile.png")}
              style={{
                height: 100,
                width: 100,
                borderWidth: 2,
                borderColor: COLORS.primary,
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
          <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Medium' }}>Ime i prezime</Text>
          <View
            style={{
              height: 44,
              width: "100%",
              borderColor: COLORS.secondaryGrey,
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
          <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Medium' }}>Email</Text>
          <View
            style={{
              height: 44,
              width: "100%",
              borderColor: COLORS.secondaryGrey,
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
          <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Medium' }}>Mesto boravišta</Text>
          <View
            style={{
              height: 44,
              width: "100%",
              borderColor: COLORS.secondaryGrey,
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
          <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Medium' }}>Broj telefona</Text>
          <View
            style={{
              height: 44,
              width: "100%",
              borderColor: COLORS.secondaryGrey,
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
          <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Medium' }}>Godina rođenja</Text>
          <View
            style={{
              height: 44,
              width: "100%",
              borderColor: COLORS.secondaryGrey,
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
            backgroundColor: COLORS.primary,
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
            Sačuvaj izmene
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView >
  )
}