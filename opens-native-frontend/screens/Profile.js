import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../constants/colors'

export default function Profile({ navigation }) {
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
            borderRadius: 999,
            borderColor: COLORS.primary,
            borderWidth: 2,
            marginTop: -90
          }}
        />
        <Text style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.primary, }}>
          Jovana Jovanović
        </Text>
        <Text style={{ fontSize: 16, fontWeight: 400, color: COLORS.primary }}>
          jovana.jovanovic@mail.com
        </Text>
      </View>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ProfileEdit")}
          style={{
            width: 124,
            height: 36,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.primary,
            borderRadius: 10,
            marginHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: COLORS.white,
            }}
          >
            Izmenite profil
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginLeft: 20 }}>
        <View style={{ borderBottomColor: COLORS.black, borderBottomWidth: StyleSheet.hairlineWidth, width: "90%" }}>
          <Text style={{ fontSize: 25, color: COLORS.black, fontWeight: 'bold' }}>Informacije</Text>
        </View>
        <View style={{ flexDirection: "row", marginVertical: 6, alignItems: 'center' }}>
          <MaterialIcons name="location-on" size={16} color="black" />
          <Text style={{ fontSize: 16, color: COLORS.primary, fontWeight: 400, marginLeft: 4 }}>Novi Sad</Text>
        </View>

        <View style={{ flexDirection: "row", marginVertical: 6, alignItems: 'center' }}>
          <MaterialIcons name="smartphone" size={16} color="black" />
          <Text style={{ fontSize: 16, color: COLORS.primary, fontWeight: 400, marginLeft: 4 }}>+381 61 2345678</Text>
        </View>

        <View style={{ flexDirection: "row", marginVertical: 6, alignItems: 'center' }}>
          <MaterialIcons name="date-range" size={16} color="black" />
          <Text style={{ fontSize: 16, color: COLORS.primary, fontWeight: 400, marginLeft: 4 }}>2011</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}