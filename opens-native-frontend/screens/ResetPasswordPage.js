import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { httpPublic } from '../apis/http';
import COLORS from '../constants/colors';
import { globalStyles } from '../utils/styles';

const ResetPasswordPage = () => {
  const { t } = useTranslation();
  const { height: windowHeight } = useWindowDimensions();
  const navigation = useNavigation();

  const [token, setToken] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState({
    token: '',
    password: '',
    confirmPassword: ''
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  useEffect(() => {
  }, [token]);

  const onChangeToken = (token) => {
    setToken(token);
    if (error.token) {
      setError({ ...error, token: '' });
    }
  }

  const onChangePassword = (password) => {
    setPassword(password);
    if (error.password) {
      setError({ ...error, password: '' });
    }
  }

  const onChangeConfirmPassword = (confirmPassword) => {
    setConfirmPassword(confirmPassword);
    if (error.confirmPassword) {
      setError({ ...error, confirmPassword: '' });
    }
  }

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password)
  };

  const handleResetPassword = async () => {
    let valid = true;
    const newError = {
      token: '',
      password: '',
      confirmPassword: ''
    }

    if (!token) {
      newError.token = t('reset-password-page.error.tokenRequired');
      valid = false;
    }

    if (!password) {
      newError.password = t('reset-password-page.error.passwordRequired');
      valid = false;
    } else if (!validatePassword(password)) {
      newError.password = t('register-page.error.invalidPassword');
      valid = false;
    }

    if (!confirmPassword) {
      newError.confirmPassword = t('reset-password-page.error.confirmPasswordRequired');
      valid = false;
    } else if (!validatePassword(confirmPassword)) {
      newError.confirmPassword = t('register-page.error.invalidPassword');
      valid = false;
    }

    setError(newError);

    if (valid) {
      if (password !== confirmPassword) {
        Toast.show({
          type: 'error',
          text1: t('reset-password-page.error.mismatchHeader'),
          text2: t('reset-password-page.error.mismatchText'),
          duration: 7000
        });
        return;
      }

      try {
        const response = await httpPublic.put(`/password-reset/reset?token=${encodeURIComponent(token)}&newPassword=${encodeURIComponent(password)}`);
        Toast.show({
          type: 'success',
          text1: t('reset-password-page.success.header'),
          text2: t('reset-password-page.success.text'),
          duration: 7000
        });
        if (response) {
          navigation.navigate('Welcome');
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401 && error.response.data === "Invalid or expired token.") {
            Toast.show({
              type: 'error',
              text1: t('reset-password-page.error.header'),
              text2: t('reset-password-page.error.invalidToken'),
              duration: 7000
            });
          }
        } else if (error.request) {
          Toast.show({
            type: 'error',
            text1: t('reset-password-page.error.header'),
            text2: t('auth-context.register.error.network'),
            duration: 7000
          });
        } else {
          Toast.show({
            type: 'error',
            text1: t('reset-password-page.error.header'),
            text2: t('reset-password-page.error.text'),
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
          <View style={[globalStyles.inputContainer, { borderColor: error.token ? COLORS.red : COLORS.black, marginBottom: error ? 10 : 20 }]}>
            <TextInput
              style={globalStyles.input}
              placeholder={t('reset-password-page.input.token')}
              value={token}
              onChangeText={onChangeToken}
            />
          </View>
          {/* {error.token ? <Text style={globalStyles.errorText}>{error.token}</Text> : null} */}
          {error.token ? (
              <Text style={[globalStyles.errorText, { marginLeft: 20, marginRight: 20 }]}>
                {error.token}
              </Text>
          ) : null}
          <View style={[globalStyles.inputContainer, { borderColor: error.password ? COLORS.red : COLORS.black, marginBottom: error ? 10 : 20 }]}>
            <TextInput
              style={globalStyles.input}
              placeholder={t('reset-password-page.input.newPassword')}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={onChangePassword}
            />
            <TouchableOpacity onPress={toggleShowPassword} style={globalStyles.visibilityToggle}>
              <Icon name={showPassword ? 'visibility-off' : 'visibility'} size={24} color={COLORS.grey} />
            </TouchableOpacity>
          </View>
          {/* {error.password ? <Text style={globalStyles.errorText}>{error.password}</Text> : null} */}
          {error.password ? (
              <Text style={[globalStyles.errorText, { marginLeft: 20, marginRight: 20 }]}>
                {error.password}
              </Text>
          ) : null}
          <View style={[globalStyles.inputContainer, { borderColor: error.confirmPassword ? COLORS.red : COLORS.black, marginBottom: error ? 10 : 20 }]}>
            <TextInput
              style={globalStyles.input}
              placeholder={t('reset-password-page.input.confirmPassword')}
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={onChangeConfirmPassword}
            />
            <TouchableOpacity onPress={toggleShowConfirmPassword} style={globalStyles.visibilityToggle}>
              <Icon name={showConfirmPassword ? 'visibility-off' : 'visibility'} size={24} color={COLORS.grey} />
            </TouchableOpacity>
          </View>
          {/* {error.confirmPassword ? <Text style={globalStyles.errorText}>{error.confirmPassword}</Text> : null} */}
          {error.confirmPassword ? (
              <Text style={[globalStyles.errorText, { marginLeft: 20, marginRight: 20 }]}>
                {error.confirmPassword}
              </Text>
          ) : null}
          <View style={globalStyles.buttonContainer}>
            <TouchableOpacity onPress={handleResetPassword} style={globalStyles.button}>
              <Text style={globalStyles.buttonText}>{t('reset-password-page.button.reset')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ResetPasswordPage;