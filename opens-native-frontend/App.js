import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import COLORS from './constants/colors';
import AuthContextProvider, { AuthContext } from './contexts/AuthContext';
import FontContextProvider from './contexts/FontContext';
import BottomTabNavigation from './navigations/BottomTabNavigation';
import { Izjava, ProfileEdit, Registracije, RequestPasswordResetPage, ResetPasswordPage, WelcomePage } from './screens';
import { i18next } from './services/i18next';
import eventEmitter from './utils/EventEmitter';
import LoadingWrapper from './utils/LoadingWrapper';

const Stack = createNativeStackNavigator();

const toastConfig = {
  success: ({ text1, text2 }) => (
    <View style={{ width: '80%', backgroundColor: COLORS.green, padding: 10, borderRadius: 10 }}>
      <Text style={{ color: 'white', fontWeight: 'bold' }}>{text1}</Text>
      <Text style={{ color: 'white' }}>{text2}</Text>
    </View>
  ),
  error: ({ text1, text2 }) => (
    <View style={{ width: '80%', backgroundColor: COLORS.red, padding: 10, borderRadius: 10 }}>
      <Text style={{ color: 'white', fontWeight: 'bold' }}>{text1}</Text>
      <Text style={{ color: 'white' }}>{text2}</Text>
    </View>
  ),
};

const AppNavigator = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  }

  useEffect(() => {
    eventEmitter.on("LOGOUT", () => {
      handleLogout();
    });

    return () => {
      eventEmitter.off("LOGOUT", handleLogout);
    }
  }, []);

  return (
    <Stack.Navigator initialRouteName={isAuthenticated ? 'Main' : 'Welcome'}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Welcome" component={WelcomePage} options={{ headerShown: false }} />
          <Stack.Screen name="Registracija" component={Registracije} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword" component={RequestPasswordResetPage} options={{ headerShown: false }} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordPage} options={{ headerShown: false }} />
          <Stack.Screen name="Izjava" component={Izjava} options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Main" component={BottomTabNavigation} options={{ headerShown: false }} />
          <Stack.Screen name="ProfileEdit" component={ProfileEdit} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <I18nextProvider i18n={i18next}>
      <FontContextProvider>
        <AuthContextProvider>
          <LoadingWrapper>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
            <Toast config={toastConfig} position='bottom' bottomOffset={30} />
          </LoadingWrapper>
        </AuthContextProvider>
      </FontContextProvider>
    </I18nextProvider>
  );
}
