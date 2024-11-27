import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Toast from 'react-native-toast-message';
import COLORS from '../constants/colors';
import httpCommon from '../http-common';
import { globalStyles } from '../utils/styles';

const RequestPasswordResetPage = () => {
  const { t } = useTranslation();
  const { height: windowHeight } = useWindowDimensions();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  onChangeEmail = (email) => {
    setEmail(email);
    if (error) {
      setError('');
    }
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRequestPasswordReset = async () => {
    let valid = true;
    let newError = '';

    if (!email) {
      newError = t('welcome-page.error.emailRequired');
      valid = false;
    } else if (!validateEmail(email)) {
      newError = t('welcome-page.error.invalidEmail');
      valid = false;
    }

    setError(newError);

    if (valid) {
      try {
        const response = await httpCommon.post(`/auth/password-reset/request?email=` + encodeURIComponent(email), {});
        Toast.show({
          type: 'success',
          text1: t('forgot-password-page.success.header'),
          text2: t('forgot-password-page.success.text'),
          duration: 7000
        });
        if (response) {
          navigation.navigate('ResetPassword');
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            Toast.show({
              type: 'error',
              text1: t('forgot-password-page.error.header'),
              text2: t('forgot-password-page.error.user-not-found'),
              duration: 7000
            });
          } else if (error.response.status === 500) {
            Toast.show({
              type: 'error',
              text1: t('forgot-password-page.error.header'),
              text2: t('forgot-password-page.error.email'),
              duration: 7000
            });
          }
        } else if (error.request) {
          Toast.show({
            type: 'error',
            text1: t('forgot-password-page.error.header'),
            text2: t('auth-context.register.error.network'),
            duration: 7000
          });
        } else {
          Toast.show({
            type: 'error',
            text1: t('forgot-password-page.error.header'),
            text2: t('forgot-password-page.error.text'),
            duration: 7000
          });
        }
      }
    }
  };

  return (
    <ScrollView style={globalStyles.scrollView}>
      <View style={globalStyles.container}>
        <View>
          <Image
            source={require("../assets/images/opens2.png")}
            style={globalStyles.image(windowHeight)}
          />
        </View>
        <View style={globalStyles.form(windowHeight)}>
          <View style={[globalStyles.inputContainer, { borderColor: error ? COLORS.red : COLORS.black, marginBottom: error ? 10 : 20 }]}>
            <TextInput style={globalStyles.input}
              placeholder={t('forgot-password-page.input.emailField')}
              value={email}
              onChangeText={onChangeEmail}
            />
          </View>
          {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}
          <View style={globalStyles.buttonContainer}>
            <TouchableOpacity onPress={handleRequestPasswordReset} style={globalStyles.button}>
              <Text style={globalStyles.buttonText}>{t('forgot-password-page.button.request')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RequestPasswordResetPage;