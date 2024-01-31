import { View, Text } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors'

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.white }}>
      <Text>Home</Text>
    </View>
  )
}