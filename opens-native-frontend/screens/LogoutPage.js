import React, { useEffect, useState } from 'react';
import { Button, Alert, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LogoutPage = () => {

    const navigation = useNavigation();
  const [refreshToken, setRefreshToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('refreshToken');
        if (token) {
          setRefreshToken(token);
        }
      } catch (error) {
        console.error('Error fetching refresh token:', error);
      }
    };

    fetchToken();
  }, []);

  // const handleLogout = async () => {
  //   if (!refreshToken) {
  //     Alert.alert('Error', 'No refresh token found.');
  //     return;
  //   }

  //   try {
  //     const response = await fetch('http://10.0.2.2:8080/api/auth/logout', { 
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ refreshToken }),
  //     });

  //     const result = await response.json();

  //     if (response.ok) {
  //       // Clear tokens from storage
  //       await AsyncStorage.removeItem('accessToken');
  //       await AsyncStorage.removeItem('refreshToken');

  //       Alert.alert('Success', 'Successfully logged out.');
  //       navigation.navigate('Welcome')
  //     } else {
  //       Alert.alert('Error', result.message || 'Logout failed.');
  //     }
  //   } catch (error) {
  //     Alert.alert('Error', 'An error occurred while logging out.');
  //   }
  // };

  return (
    <View>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default LogoutPage;