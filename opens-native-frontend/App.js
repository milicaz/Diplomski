import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WelcomePage from './screens/WelcomePage';
import Registracija from './screens/Registracije';
import Login from './screens/Login';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name = "Welcome" component={WelcomePage} />
        <Stack.Screen name = "Registracija" component={Registracija} />
        <Stack.Screen name = "Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
