import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { I18nextProvider } from 'react-i18next';
import BottomTabNavigation from './navigations/BottomTabNavigation';
import Login from './screens/Login';
import ProfileEdit from './screens/ProfileEdit';
import Registracija from './screens/Registracije';
import WelcomePage from './screens/WelcomePage';
import { i18next } from './services/i18next';
import RequestPasswordResetPage from './screens/RequestPasswordResetPage';
import ResetPasswordPage from './screens/ResetPasswordPage';
import LogoutPage from './screens/LogoutPage';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <I18nextProvider i18n={i18next}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'>
          <Stack.Screen name="Welcome" component={WelcomePage} />
          <Stack.Screen name="Registracija" component={Registracija} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ForgotPassword" component={RequestPasswordResetPage} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordPage} />
          <Stack.Screen name="Main" component={BottomTabNavigation} options={{ headerShown: false }} />
          <Stack.Screen name="ProfileEdit" component={ProfileEdit} options={{ headerShown: false }} />
          <Stack.Screen name="Logout" component={LogoutPage} />
          {/* <Stack.Screen name="Home" component={Home} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </I18nextProvider>
  );
}
