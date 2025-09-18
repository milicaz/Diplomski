import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import COLORS from "./constants/colors";
import AuthContextProvider from "./contexts/AuthContext";
import FontContextProvider from "./contexts/FontContext";
import useAuth from "./hooks/useAuth";
import useLogout from "./hooks/useLogout";
import useSessionExpired from "./hooks/useSessionExpired";
import BottomTabNavigation from "./navigations/BottomTabNavigation";
import {
  Izjava,
  LanguageSwitcher,
  ProfileEdit,
  Registracije,
  RequestPasswordResetPage,
  ResetPasswordPage,
  WelcomePage,
} from "./screens";
import { i18next } from "./services/i18next";
import eventEmitter from "./utils/EventEmitter";
import LoadingWrapper from "./utils/LoadingWrapper";
import { PaperProvider } from "react-native-paper";

const Stack = createNativeStackNavigator();

const toastConfig = {
  success: ({ text1, text2 }) => (
    <View
      style={{
        width: "80%",
        backgroundColor: COLORS.green,
        padding: 10,
        borderRadius: 10,
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>{text1}</Text>
      <Text style={{ color: "white" }}>{text2}</Text>
    </View>
  ),
  error: ({ text1, text2 }) => (
    <View
      style={{
        width: "80%",
        backgroundColor: COLORS.red,
        padding: 10,
        borderRadius: 10,
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>{text1}</Text>
      <Text style={{ color: "white" }}>{text2}</Text>
    </View>
  ),
};

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();
  const logOutUser = useLogout();
  const sessionExpired = useSessionExpired();

  const handleLogout = () => {
    logOutUser();
  };

  const handleSessionExpired = () => {
    sessionExpired();
  }

  useEffect(() => {
    eventEmitter.on("LOGOUT", () => {
      handleLogout();
    });

    return () => {
      eventEmitter.off("LOGOUT", handleLogout);
    };
  }, []);

  useEffect(() => {
    eventEmitter.on('SESSION_EXPIRED', () => {
      handleSessionExpired();
    });

    return () => {
      eventEmitter.off('SESSION_EXPIRED', handleSessionExpired);
    };
  }, []);

  return (
    <Stack.Navigator initialRouteName={isAuthenticated ? "Main" : "Welcome"}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen
            name="Welcome"
            component={WelcomePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Registracija"
            component={Registracije}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={RequestPasswordResetPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPasswordPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Izjava"
            component={Izjava}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Main"
            component={BottomTabNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProfileEdit"
            component={ProfileEdit}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <I18nextProvider i18n={i18next}>
      <FontContextProvider>
        <AuthContextProvider>
          <LoadingWrapper>
            <NavigationContainer>
              <AppNavigator />
              <LanguageSwitcher />
            </NavigationContainer>
            <Toast config={toastConfig} position="bottom" bottomOffset={30} />
          </LoadingWrapper>
        </AuthContextProvider>
      </FontContextProvider>
    </I18nextProvider>
  );
}
