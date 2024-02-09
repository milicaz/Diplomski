import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, Platform } from 'react-native';
import COLORS from '../constants/colors';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import QrCode from '../screens/QrCode';
import Dostupnost from '../screens/Dostupnost';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
                position: 'absolute',
                bottom: 0,
                right: 0,
                left: 0,
                elevation: 0,
                height: Platform.OS === "android" ? 70 : 60,
                backgroundColor: COLORS.white
            }
        }}>
            <Tab.Screen
                name='DrawerHome'
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image
                                source={focused ? require("../assets/icons/home.png") : require("../assets/icons/home-outline.png")}
                                resizeMode='contain'
                                style={{ height: 24, width: 24, tintColor: focused ? COLORS.primary : COLORS.black }} />
                        )
                    }
                }}
            />
            <Tab.Screen
                name='QrCode'
                component={QrCode}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image
                                source={focused ? require("../assets/icons/qr-code.png") : require("../assets/icons/qr-code.png")}
                                resizeMode='contain'
                                style={{ height: 24, width: 24, tintColor: focused ? COLORS.primary : COLORS.black }} />
                        )
                    }
                }}
            />
            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image
                                source={focused ? require("../assets/icons/user.png") : require("../assets/icons/user-outline.png")}
                                resizeMode='contain'
                                style={{ height: 24, width: 24, tintColor: focused ? COLORS.primary : COLORS.black }} />
                        )
                    }
                }}
            />
            <Tab.Screen
                name='Dostupnost'
                component={Dostupnost}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image
                                source={focused ? require("../assets/icons/search.png") : require("../assets/icons/search.png")}
                                resizeMode='contain'
                                style={{ height: 24, width: 24, tintColor: focused ? COLORS.primary : COLORS.black }} />
                        )
                    }
                }}
            />

        </Tab.Navigator>
    )
}