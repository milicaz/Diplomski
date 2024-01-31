import React from 'react'
import { Image, View } from 'react-native'
import COLORS from '../constants/colors'

export default function QrCode() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.white }}>
      <Image source={require("../assets/qrcode.png")} style={{
        height: 300,
        width: 300,
        borderRadius: 20,
        position: "absolute"
      }} />
    </View>
  )
}