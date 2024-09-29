import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import COLORS from '../constants/colors';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

  // State variable to track password visibility 
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Function to toggle the password visibility state 
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  } 


  useEffect( () => {

  }, [token])

  const resetPassword = async () => {
    if (password !== confirmPassword) {
      Alert.alert(t("alertResetPassword"));
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:8080/api/auth/password-reset/reset?token=' + encodeURIComponent(token) + '&newPassword=' + encodeURIComponent(password), {    
        method: 'PUT'
      });
      const result = await response.text();
      Alert.alert(t("alertResetPasswordSuccess"), result);
      navigation.navigate('Welcome');
    } catch (error) {
      Alert.alert(t("alertResetPasswordError"));
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
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={toggleShowPassword} style={{ position: 'absolute', right: 10 }}>
              <Icon name={showPassword ? 'visibility-off' : 'visibility'} size={24} color="gray" />
            </TouchableOpacity>
      </View>
      <View style={{ width: "80%", borderWidth: 1, height: 50, marginBottom: 20, justifyContent: "center", padding: 20 }}>
      <TextInput
        style={{ height: 50, color: "black", fontFamily: "Montserrat-Regular" }}
        placeholder={t('reset-password-page.input.confirmPassword')}
        secureTextEntry={!showConfirmPassword}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity onPress={toggleShowConfirmPassword} style={{ position: 'absolute', right: 10 }}>
              <Icon name={showConfirmPassword ? 'visibility-off' : 'visibility'} size={24} color="gray" />
            </TouchableOpacity>
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