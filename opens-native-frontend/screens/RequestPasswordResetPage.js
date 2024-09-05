import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import COLORS from '../constants/colors';
import { useFonts } from 'expo-font';

const RequestPasswordResetPage = () => {

    const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf')
  });

  const requestPasswordReset = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8080/api/auth/password-reset/request?email=' + encodeURIComponent(email), {
        method: 'POST',
      });
      const result = await response.text();
      Alert.alert('Success', result);
navigation.navigate('ResetPassword')
    } catch (error) {
      Alert.alert('Error', 'An error occurred while requesting the password reset.');
    }
  };

  return (
    <ScrollView style={{ backgroundColor: COLORS.white }}>
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
    <View>
        <Image
          source={require("../assets/opens2.png")}
          style={{
            height: 300,
            width: "100%",
            position: "absolute",
          }}
        />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", height: 950 }}>
      <View style={{ width: "80%", borderWidth: 1, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
      <TextInput style={{ height: 50, color: "black", fontFamily: "Montserrat-Regular" }}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      </View>
      {/* <Button title="Request Password Reset" onPress={requestPasswordReset} /> */}
      <View style={{ width: "50%", margin: 10 }}>
          <TouchableOpacity onPress={requestPasswordReset} style={{ alignItems: 'center', backgroundColor: '#61CDCD', padding: 13 }}>
            <Text style={{ fontFamily: "Montserrat-Bold" }}>Zahtev za resetovanje lozinke</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default RequestPasswordResetPage;