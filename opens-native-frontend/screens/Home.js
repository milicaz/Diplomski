import React from 'react'
import { Text, View } from 'react-native'
import COLORS from '../constants/colors'

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.white }}>
      <View style={{
        backgroundColor: COLORS.white,
        borderRadius: 15,
        padding: 16,
        shadowColor: COLORS.black,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 14,
        width: 350,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8
      }}>
        <View style={{ marginBottom: 16, alignItems: 'center' }}>
          <Text style={{ fontSize: 24, color: COLORS.primary, marginTop: 10 }}>
            Lorem ipsum dolor sit amet
          </Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 17, color: '#444444', textAlign: 'justify' }}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
            Aenean commodo ligula eget dolor. Aenean massa.
            Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </Text>
        </View>

      </View>
      <View style={{
        backgroundColor: COLORS.white,
        borderRadius: 15,
        padding: 16,
        shadowColor: COLORS.black,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 14,
        width: 350,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{ marginBottom: 16, alignItems: 'center' }}>
          <Text style={{ fontSize: 24, color: COLORS.primary, marginTop: 10 }}>
            Lorem ipsum dolor sit amet
          </Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 17, color: '#444444', textAlign: 'justify' }}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
            Aenean commodo ligula eget dolor. Aenean massa.
            Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </Text>
        </View>

      </View>
    </View>
  )
}