import React, { useState, useEffect } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const ResetPasswordPage = () => {
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');

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
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Reset Password" />
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
  title: {
    fontSize: 24,
    marginBottom: 16,
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