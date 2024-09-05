import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import COLORS from '../constants/colors';
import { useTranslation } from 'react-i18next';

const ResetPasswordPage = () => {

    const { t } = useTranslation();

    const navigation = useNavigation();
  const route = useRoute();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('')

  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf')
  });


  useEffect( () => {

  }, [token])

  const resetPassword = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:8080/api/auth/password-reset/reset?token=' + encodeURIComponent(token) + '&newPassword=' + encodeURIComponent(password), {    
        method: 'PUT'
      });
      const result = await response.text();
      Alert.alert('Success', result);
      navigation.navigate('Welcome');
    } catch (error) {
      Alert.alert('Error', 'An error occurred while resetting the password.');
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
        <TextInput
        style={{ height: 50, color: "black", fontFamily: "Montserrat-Regular" }}
        placeholder={t('reset-password-page.input.token')}
        // secureTextEntry
        value={token}
        onChangeText={setToken}
      />
      </View>
      <View style={{ width: "80%", borderWidth: 1, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
      <TextInput
        style={{ height: 50, color: "black", fontFamily: "Montserrat-Regular" }}
        placeholder={t('reset-password-page.input.newPassword')}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      </View>
      <View style={{ width: "80%", borderWidth: 1, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
      <TextInput
        style={{ height: 50, color: "black", fontFamily: "Montserrat-Regular" }}
        placeholder={t('reset-password-page.input.confirmPassword')}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      </View>
      {/* <Button title="Reset Password" onPress={resetPassword} /> */}
      <View style={{ width: "50%", margin: 10 }}>
          <TouchableOpacity onPress={resetPassword} style={{ alignItems: 'center', backgroundColor: '#61CDCD', padding: 13 }}>
            <Text style={{ fontFamily: "Montserrat-Bold" }}>{t('reset-password-page.button.reset')}</Text>
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

export default ResetPasswordPage;