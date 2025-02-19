import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import COLORS from '../constants/colors';
import useHttpProtected from '../hooks/useHttpProtected';
import eventEmitter from '../utils/EventEmitter';

const USER_KEY = 'user';

export default function QrCode() {
  const { t } = useTranslation();
  const httpProtected = useHttpProtected();

  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qrCodeColor, setQrCodeColor] = useState(COLORS.red);

  useEffect(() => {
    const loggedIn = JSON.parse(SecureStore.getItem(USER_KEY));
    fetchQRCode(loggedIn.id);
    const colors = [COLORS.purple, COLORS.blue, COLORS.red, COLORS.yellow, COLORS.green];
    const randomIndex = Math.floor(Math.random() * colors.length);
    setQrCodeColor(colors[randomIndex]);
  }, []);

  const fetchQRCode = async (id) => {
    try {
      const { data } = await httpProtected.get(`posetioci/${id}`);
      if (data && data.email) {
        setQrCode(data.email);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 400) {
          eventEmitter.emit('LOGOUT');
          Toast.show({
            type: 'error',
            text1: t('http-common.error.session.header'),
            text2: t('http-common.error.session.text'),
          });
        }
      } else if (error.request) {
        Toast.show({
          type: 'error',
          text1: t('http-common.error.network.header'),
          text2: t('http-common.error.network.text'),
        });
      } else {
        Toast.show({
          type: 'error',
          text1: t('http-common.error.server.header'),
          text2: t('http-common.error.server.text'),
          duration: 7000
        });
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.red} />
      ) : (
        <View style={styles.content}>
          <Text style={styles.explanationText}>
            {t('qr-page.text.explanation')}
          </Text>
          <QRCode
            value={qrCode}
            size={300}
            color={qrCodeColor}
            backgroundColor={COLORS.white}
          />
          <Text style={styles.instructionText}>{t('qr-page.text.instruction')}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  explanationText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '500',
    color: COLORS.black,
    lineHeight: 24,
  },
  instructionText: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
    color: COLORS.black,
    lineHeight: 26,
  }
});