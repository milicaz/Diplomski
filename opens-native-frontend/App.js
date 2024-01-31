import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from './navigations/BottomTabNavigation';
import Login from './screens/Login';
import ProfileEdit from './screens/ProfileEdit';
import Registracija from './screens/Registracije';
import WelcomePage from './screens/WelcomePage';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Welcome" component={WelcomePage} />
        <Stack.Screen name="Registracija" component={Registracija} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={BottomTabNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
