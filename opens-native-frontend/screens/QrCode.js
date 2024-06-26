import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import COLORS from '../constants/colors';
import httpCommon from '../http-common';

export default function QrCode() {
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qrCodeColor, setQrCodeColor] = useState(COLORS.red);

  useEffect(() => {
    fetchQRCode(1);
    const colors = [COLORS.purple, COLORS.blue, COLORS.red, COLORS.yellow, COLORS.green];
    const randomIndex = Math.floor(Math.random() * colors.length);
    setQrCodeColor(colors[randomIndex]);
  }, []);

  const fetchQRCode = async (id) => {
    try {
      const {data} = await httpCommon.get(`posetioci/${id}`);
      if (data && data.email) {
        setQrCode(data.email);
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.white }}>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.red} />
      ) : (
        <QRCode
          value={qrCode}
          size={300}
          color={qrCodeColor}
          backgroundColor={COLORS.white}
        />
      )}
    </View>
  )
}